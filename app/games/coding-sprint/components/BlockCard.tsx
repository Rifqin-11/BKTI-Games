'use client';

import React, { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GripVertical } from 'lucide-react';

interface BlockCardProps {
  block: string;
  index: number;
  language: string;
  onMove: (fromIndex: number, toIndex: number) => void;
  isPaused?: boolean;
}

export function BlockCard({ block, index, language, onMove, isPaused }: BlockCardProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (e: React.DragEvent) => {
    if (isPaused) return;
    
    setIsDragging(true);
    e.dataTransfer.setData('text/plain', index.toString());
    e.dataTransfer.effectAllowed = 'move';
    
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      e.dataTransfer.setDragImage(cardRef.current, rect.width / 2, rect.height / 2);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    if (isPaused) return;
    
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    if (isPaused) return;
    
    e.preventDefault();
    setDragOver(false);
    
    const fromIndex = parseInt(e.dataTransfer.getData('text/plain'));
    if (fromIndex !== index) {
      onMove(fromIndex, index);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isPaused || !isFocused) return;
    
    switch (e.key.toLowerCase()) {
      case 'j':
      case 'arrowdown':
        e.preventDefault();
        onMove(index, index + 1);
        break;
      case 'k':
      case 'arrowup':
        e.preventDefault();
        onMove(index, index - 1);
        break;
    }
  };

  const getLanguageColor = (lang: string) => {
    switch (lang) {
      case 'html': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
      case 'js': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'ts': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  return (
    <Card
      ref={cardRef}
      draggable={!isPaused}
      tabIndex={0}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onKeyDown={handleKeyDown}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      className={`
        group relative cursor-move transition-all duration-200 select-none
        ${isDragging ? 'opacity-50 scale-95 rotate-2' : ''}
        ${dragOver ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20 scale-102' : ''}
        ${isFocused ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
        ${isPaused ? 'cursor-default opacity-60' : 'hover:shadow-md hover:scale-[1.02]'}
      `}
    >
      <div className="p-4 flex items-center gap-3">
        <div className="flex items-center gap-2 flex-shrink-0">
          <GripVertical className={`w-4 h-4 ${isPaused ? 'text-muted-foreground' : 'text-gray-400 group-hover:text-gray-600'}`} />
          <Badge variant="outline" className={`text-xs font-mono ${getLanguageColor(language)}`}>
            {index + 1}
          </Badge>
        </div>
        
        <div className="flex-1 min-w-0">
          <code className="text-sm font-mono whitespace-pre-wrap break-all">
            {block}
          </code>
        </div>
        
        {isFocused && (
          <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
            Use J/K or arrows
          </div>
        )}
      </div>
    </Card>
  );
}