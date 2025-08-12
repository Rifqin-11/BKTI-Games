"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Target, Zap, Eye, BarChart3, Pause, Play } from "lucide-react";

interface HudProps {
  score: number;
  streak: number;
  puzzlesSolved: number;
  lives: number;
  currentPuzzle: number;
  totalPuzzles: number;
  isPaused: boolean;
  showAlphabet: boolean;
  showFrequencyChart: boolean;
  onToggleAlphabet: () => void;
  onToggleFrequency: () => void;
  onTogglePause: () => void;
}

export function Hud({
  score,
  streak,
  puzzlesSolved,
  lives,
  currentPuzzle,
  totalPuzzles,
  isPaused,
  showAlphabet,
  showFrequencyChart,
  onToggleAlphabet,
  onToggleFrequency,
  onTogglePause,
}: HudProps) {
  return (
    <Card className="bg-white border-emerald-200">
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Main Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Score */}
            <div className="text-center">
              <div className="text-emerald-600 font-mono text-sm font-medium">
                SCORE
              </div>
              <div className="text-2xl font-bold text-emerald-600 font-mono">
                {score.toLocaleString()}
              </div>
            </div>

            {/* Streak */}
            <div className="text-center">
              <div className="text-orange-600 font-mono text-sm font-medium">
                STREAK
              </div>
              <div className="flex items-center justify-center gap-1">
                <Zap className="w-5 h-5 text-orange-500" />
                <div className="text-2xl font-bold text-orange-600 font-mono">
                  {streak}
                </div>
              </div>
            </div>

            {/* Puzzles Solved */}
            <div className="text-center">
              <div className="text-blue-600 font-mono text-sm font-medium">
                SOLVED
              </div>
              <div className="flex items-center justify-center gap-1">
                <Target className="w-5 h-5 text-blue-500" />
                <div className="text-2xl font-bold text-blue-600 font-mono">
                  {puzzlesSolved}
                </div>
              </div>
            </div>

            {/* Lives */}
            <div className="text-center">
              <div className="text-red-600 font-mono text-sm font-medium">
                LIVES
              </div>
              <div className="flex items-center justify-center gap-1">
                {Array.from({ length: 3 }, (_, i) => (
                  <Heart
                    key={i}
                    className={`w-5 h-5 ${
                      i < lives ? "text-red-500 fill-red-500" : "text-slate-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-emerald-600 font-mono text-sm">
                PROGRESS
              </span>
              <Badge
                variant="outline"
                className="font-mono text-emerald-600 border-emerald-300"
              >
                {currentPuzzle} / {totalPuzzles}
              </Badge>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div
                className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentPuzzle / totalPuzzles) * 100}%` }}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button
              onClick={onToggleAlphabet}
              variant="outline"
              size="sm"
              className={`flex-1 font-mono ${
                showAlphabet
                  ? "border-emerald-400 bg-emerald-50 text-emerald-600"
                  : "border-slate-300 text-slate-600"
              }`}
            >
              <Eye className="w-4 h-4 mr-1" />
              ALPHABET
            </Button>

            <Button
              onClick={onToggleFrequency}
              variant="outline"
              size="sm"
              className={`flex-1 font-mono ${
                showFrequencyChart
                  ? "border-blue-400 bg-blue-50 text-blue-600"
                  : "border-slate-300 text-slate-600"
              }`}
            >
              <BarChart3 className="w-4 h-4 mr-1" />
              FREQUENCY
            </Button>

            <Button
              onClick={onTogglePause}
              variant="outline"
              size="sm"
              className="font-mono border-yellow-400 text-yellow-600 hover:bg-yellow-50"
            >
              {isPaused ? (
                <Play className="w-4 h-4" />
              ) : (
                <Pause className="w-4 h-4" />
              )}
            </Button>
          </div>

          {/* Streak Bonus Info */}
          {streak > 0 && (
            <div className="text-center">
              <div className="text-xs text-orange-500 font-mono">
                NEXT BONUS: {3 - (streak % 3)} MORE SOLVES
              </div>
              {Math.floor(streak / 3) > 0 && (
                <Badge variant="secondary" className="text-xs font-mono mt-1">
                  +{Math.floor(streak / 3) * 10}% MULTIPLIER ACTIVE
                </Badge>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
