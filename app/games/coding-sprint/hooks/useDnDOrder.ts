'use client';

import { useState, useCallback, useEffect } from 'react';

export function useDnDOrder(initialBlocks: string[]) {
  const [blocks, setBlocks] = useState<string[]>([]);
  const [originalOrder, setOriginalOrder] = useState<number[]>([]);

  // Initialize blocks when props change
  useEffect(() => {
    const shuffled = shuffleArray([...initialBlocks]);
    setBlocks(shuffled);
    
    // Keep track of original indices for solution checking
    const indices = shuffled.map(block => initialBlocks.indexOf(block));
    setOriginalOrder(indices);
  }, [initialBlocks]);

  const moveBlock = useCallback((fromIndex: number, toIndex: number) => {
    if (fromIndex < 0 || toIndex < 0 || fromIndex >= blocks.length || toIndex >= blocks.length) {
      return;
    }

    setBlocks(prevBlocks => {
      const newBlocks = [...prevBlocks];
      const [movedBlock] = newBlocks.splice(fromIndex, 1);
      newBlocks.splice(toIndex, 0, movedBlock);
      return newBlocks;
    });

    setOriginalOrder(prevOrder => {
      const newOrder = [...prevOrder];
      const [movedIndex] = newOrder.splice(fromIndex, 1);
      newOrder.splice(toIndex, 0, movedIndex);
      return newOrder;
    });
  }, [blocks.length]);

  const reorderBlocks = useCallback((newOrder: number[]) => {
    if (newOrder.length !== blocks.length) return;

    const newBlocks = newOrder.map(index => blocks[index]);
    const newOriginalOrder = newOrder.map(index => originalOrder[index]);

    setBlocks(newBlocks);
    setOriginalOrder(newOriginalOrder);
  }, [blocks, originalOrder]);

  const resetOrder = useCallback(() => {
    if (initialBlocks.length === 0) return;
    
    const shuffled = shuffleArray([...initialBlocks]);
    setBlocks(shuffled);
    
    const indices = shuffled.map(block => initialBlocks.indexOf(block));
    setOriginalOrder(indices);
  }, [initialBlocks]);

  const getCurrentOrder = useCallback(() => {
    return originalOrder;
  }, [originalOrder]);

  return {
    blocks,
    moveBlock,
    reorderBlocks,
    resetOrder,
    getCurrentOrder,
  };
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}