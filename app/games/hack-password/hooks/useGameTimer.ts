"use client";

import { useEffect, useRef } from "react";

interface UseGameTimerProps {
  isActive: boolean;
  timeRemaining: number;
  onTick: () => void;
  onTimeUp?: () => void;
}

export function useGameTimer({
  isActive,
  timeRemaining,
  onTick,
  onTimeUp,
}: UseGameTimerProps) {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive && timeRemaining > 0) {
      intervalRef.current = setInterval(() => {
        onTick();
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      if (timeRemaining <= 0 && onTimeUp) {
        onTimeUp();
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, timeRemaining, onTick, onTimeUp]);

  const pause = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const resume = () => {
    if (isActive && timeRemaining > 0 && !intervalRef.current) {
      intervalRef.current = setInterval(() => {
        onTick();
      }, 1000);
    }
  };

  return { pause, resume };
}
