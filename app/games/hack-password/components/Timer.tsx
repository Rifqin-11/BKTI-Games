"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Clock, AlertTriangle } from "lucide-react";

interface TimerProps {
  timeRemaining: number;
  totalTime: number;
  isActive: boolean;
}

export function Timer({ timeRemaining, totalTime, isActive }: TimerProps) {
  const percentage = (timeRemaining / totalTime) * 100;
  const isLowTime = percentage < 20;
  const isCriticalTime = percentage < 10;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getProgressColor = () => {
    if (isCriticalTime) return "bg-red-500";
    if (isLowTime) return "bg-orange-500";
    return "bg-emerald-500";
  };

  const getTextColor = () => {
    if (isCriticalTime) return "text-red-600";
    if (isLowTime) return "text-orange-600";
    return "text-emerald-600";
  };

  return (
    <Card className="bg-white border-emerald-200">
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Timer Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className={`w-4 h-4 ${getTextColor()}`} />
              <span className="text-emerald-600 font-mono text-sm font-medium">
                TIME REMAINING
              </span>
            </div>
            {isLowTime && (
              <div className="flex items-center gap-1">
                <AlertTriangle className="w-4 h-4 text-orange-500 animate-pulse" />
                <span className="text-orange-600 font-mono text-xs">
                  LOW TIME
                </span>
              </div>
            )}
          </div>

          {/* Time Display */}
          <div className={`text-center ${getTextColor()}`}>
            <div
              className={`font-mono text-3xl font-bold ${
                isCriticalTime ? "animate-pulse" : ""
              }`}
            >
              {formatTime(timeRemaining)}
            </div>
            <div className="text-xs text-emerald-500 font-mono">
              / {formatTime(totalTime)}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <Progress value={percentage} className="h-2 bg-slate-200" />
            <div className="flex justify-between text-xs font-mono text-emerald-500">
              <span>0:00</span>
              <span className={getTextColor()}>{percentage.toFixed(0)}%</span>
              <span>{formatTime(totalTime)}</span>
            </div>
          </div>

          {/* Status Indicator */}
          <div className="flex items-center justify-center gap-2 text-xs">
            <div
              className={`w-2 h-2 rounded-full ${
                isActive
                  ? `${getProgressColor().replace("bg-", "bg-")} animate-pulse`
                  : "bg-slate-400"
              }`}
            ></div>
            <span
              className={`font-mono ${
                isActive ? getTextColor() : "text-slate-500"
              }`}
            >
              {isActive ? "ACTIVE" : "PAUSED"}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
