'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Eye, Code, Play, Pause, RefreshCw } from 'lucide-react';

interface PreviewPanelProps {
  blocks: string[];
  language: string;
  previewType: 'render' | 'console';
  isPaused?: boolean;
}

export function PreviewPanel({ blocks, language, previewType, isPaused }: PreviewPanelProps) {
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [lastExecution, setLastExecution] = useState<string>('');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const combinedCode = blocks.join('\n');

  // Auto-refresh when code changes
  useEffect(() => {
    if (!isPaused && combinedCode !== lastExecution) {
      handleRefresh();
      setLastExecution(combinedCode);
    }
  }, [combinedCode, isPaused, lastExecution]);

  const handleRefresh = async () => {
    if (isPaused) return;

    if (previewType === 'render' && language === 'html') {
      renderHTML();
    } else if (previewType === 'console' && (language === 'js' || language === 'ts')) {
      await executeJavaScript();
    }
  };

  const renderHTML = () => {
    if (!iframeRef.current) return;

    const iframe = iframeRef.current;
    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    
    if (!doc) return;

    // Create a complete HTML document
    const htmlContent = combinedCode.includes('<!DOCTYPE html>') 
      ? combinedCode 
      : `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; 
              margin: 16px; 
              line-height: 1.5; 
            }
            * { box-sizing: border-box; }
          </style>
        </head>
        <body>
          ${combinedCode}
        </body>
        </html>
      `;

    try {
      doc.open();
      doc.write(htmlContent);
      doc.close();
    } catch (error) {
      console.error('Error rendering HTML:', error);
    }
  };

  const executeJavaScript = async () => {
    if (isExecuting) return;
    
    setIsExecuting(true);
    setConsoleOutput([]);

    try {
      // Create a sandboxed execution environment
      const worker = new Worker(
        URL.createObjectURL(
          new Blob([
            `
            const console = {
              log: (...args) => {
                self.postMessage({ type: 'log', args: args.map(arg => 
                  typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
                )});
              },
              error: (...args) => {
                self.postMessage({ type: 'error', args: args.map(arg => 
                  typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
                )});
              },
              warn: (...args) => {
                self.postMessage({ type: 'warn', args: args.map(arg => 
                  typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
                )});
              }
            };
            
            try {
              ${combinedCode}
            } catch (error) {
              console.error('Execution Error:', error.message);
            }
            
            self.postMessage({ type: 'complete' });
            `
            ],
            { type: 'application/javascript' }
          )
        )
      );

      const outputs: string[] = [];

      worker.onmessage = (e) => {
        const { type, args } = e.data;
        
        if (type === 'complete') {
          worker.terminate();
          setConsoleOutput(outputs);
          setIsExecuting(false);
        } else if (type === 'log') {
          outputs.push(`> ${args.join(' ')}`);
        } else if (type === 'error') {
          outputs.push(`❌ ${args.join(' ')}`);
        } else if (type === 'warn') {
          outputs.push(`⚠️ ${args.join(' ')}`);
        }
      };

      worker.onerror = (error) => {
        outputs.push(`❌ Worker Error: ${error.message}`);
        worker.terminate();
        setConsoleOutput(outputs);
        setIsExecuting(false);
      };

      // Timeout after 3 seconds
      setTimeout(() => {
        if (isExecuting) {
          worker.terminate();
          outputs.push(`⏱️ Execution timed out`);
          setConsoleOutput(outputs);
          setIsExecuting(false);
        }
      }, 3000);

    } catch (error) {
      setConsoleOutput([`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`]);
      setIsExecuting(false);
    }
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {previewType === 'render' ? (
              <Eye className="w-4 h-4" />
            ) : (
              <Code className="w-4 h-4" />
            )}
            <CardTitle className="text-lg">
              {previewType === 'render' ? 'Live Preview' : 'Console Output'}
            </CardTitle>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant={isPaused ? 'secondary' : 'default'} className="text-xs">
              {isPaused ? 'Paused' : 'Live'}
            </Badge>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isPaused || isExecuting}
            >
              <RefreshCw className={`w-3 h-3 ${isExecuting ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        {previewType === 'render' ? (
          <div className="border-t">
            <iframe
              ref={iframeRef}
              className="w-full h-96 border-0"
              sandbox="allow-same-origin allow-scripts"
              title="Preview"
            />
          </div>
        ) : (
          <div className="border-t">
            <div className="bg-gray-900 text-green-400 font-mono text-sm p-4 h-96 overflow-auto">
              <div className="text-gray-500 text-xs mb-2">
                Console Output:
              </div>
              
              {isExecuting && (
                <div className="flex items-center gap-2 text-yellow-400 mb-2">
                  <div className="animate-spin w-3 h-3 border border-current border-t-transparent rounded-full"></div>
                  Executing...
                </div>
              )}
              
              {consoleOutput.length === 0 && !isExecuting ? (
                <div className="text-gray-500 italic">
                  No output yet. Run the code to see results.
                </div>
              ) : (
                <div className="space-y-1">
                  {consoleOutput.map((output, index) => (
                    <div key={index} className="whitespace-pre-wrap break-words">
                      {output}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
        
        <div className="p-4 border-t bg-muted/30">
          <div className="text-xs text-muted-foreground space-y-1">
            <p>
              <strong>Current blocks:</strong> {blocks.length}
            </p>
            <p>
              <strong>Language:</strong> {language.toUpperCase()}
            </p>
            <p>
              <strong>Type:</strong> {previewType === 'render' ? 'HTML Rendering' : 'JavaScript Execution'}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}