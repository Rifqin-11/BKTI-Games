'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

interface UseCountdownOptions {
  initialTime: number;
  onComplete?: () => void;
  onTick?: (time: number) => void;
}

export function useCountdown({ initialTime, onComplete, onTick }: UseCountdownOptions) {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const start = useCallback(() => {
    setIsActive(true);
    setIsPaused(false);
  }, []);

  const pause = useCallback(() => {
    setIsPaused(true);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const resume = useCallback(() => {
    setIsPaused(false);
  }, []);

  const stop = useCallback(() => {
    setIsActive(false);
    setIsPaused(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const reset = useCallback((newTime?: number) => {
    const resetTime = newTime ?? initialTime;
    setTimeLeft(resetTime);
    setIsActive(false);
    setIsPaused(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [initialTime]);

  // Main countdown effect
  useEffect(() => {
    if (isActive && !isPaused) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          const newTime = Math.max(0, prevTime - 1);
          
          onTick?.(newTime);
          
          if (newTime === 0) {
            setIsActive(false);
            onComplete?.();
          }
          
          return newTime;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isActive, isPaused, onComplete, onTick]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    timeLeft,
    isActive,
    isPaused,
    start,
    pause,
    resume,
    stop,
    reset,
  };
}