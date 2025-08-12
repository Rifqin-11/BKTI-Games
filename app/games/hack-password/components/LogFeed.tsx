"use client";

import React, { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Terminal } from "lucide-react";

interface LogFeedProps {
  logs: string[];
}

export function LogFeed({ logs }: LogFeedProps) {
  const logsEndRef = useRef<HTMLDivElement>(null);
  const logsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll only within the logs container, not the entire page
    if (logsContainerRef.current && logsEndRef.current) {
      logsContainerRef.current.scrollTop =
        logsContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const getLogColor = (log: string) => {
    if (
      log.includes("granted") ||
      log.includes("SUCCESS") ||
      log.includes("+")
    ) {
      return "text-green-600";
    }
    if (
      log.includes("denied") ||
      log.includes("ERROR") ||
      log.includes("FAILED") ||
      log.includes("-")
    ) {
      return "text-red-600";
    }
    if (
      log.includes("WARNING") ||
      log.includes("alert") ||
      log.includes("blocked")
    ) {
      return "text-yellow-600";
    }
    if (log.includes("Hint") || log.includes("skipped")) {
      return "text-orange-600";
    }
    return "text-emerald-600";
  };

  const getLogPrefix = () => {
    const timestamp = new Date().toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    return `[${timestamp}]`;
  };

  return (
    <Card className="bg-white border-emerald-200 h-64">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-emerald-600 font-mono text-sm">
          <Terminal className="w-4 h-4" />
          ACCESS LOG
        </CardTitle>
      </CardHeader>

      <CardContent className="pb-4">
        <div
          ref={logsContainerRef}
          className="bg-slate-50 rounded p-3 h-48 overflow-y-auto font-mono text-xs border border-slate-200"
        >
          {logs.length === 0 ? (
            <div className="text-slate-500 italic">
              {getLogPrefix()} System ready...
            </div>
          ) : (
            logs.map((log, index) => (
              <div
                key={index}
                className={`${getLogColor(
                  log
                )} leading-relaxed opacity-90 hover:opacity-100 transition-opacity`}
              >
                <span className="text-slate-500">{getLogPrefix()}</span> {log}
              </div>
            ))
          )}
          <div ref={logsEndRef} />
        </div>

        {/* Status Bar */}
        <div className="flex justify-between items-center mt-2 text-xs font-mono">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-emerald-600">MONITORING ACTIVE</span>
          </div>
          <div className="text-emerald-500">{logs.length} EVENTS</div>
        </div>
      </CardContent>
    </Card>
  );
}
