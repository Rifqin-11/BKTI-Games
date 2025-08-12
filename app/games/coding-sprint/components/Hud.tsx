'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Heart, Timer, Trophy, Zap } from 'lucide-react';
import { Difficulty } from '../context/GameContext';

interface HudProps {
  lives: number;
  score: number;
  streak: number;
  timeLeft: number;
  difficulty: Difficulty;
}

export function Hud({ lives, score, streak, timeLeft, difficulty }: HudProps) {
  const maxTime = {
    beginner: 90,
    intermediate: 60,
    advanced: 45,
  }[difficulty];

  const timePercentage = (timeLeft / maxTime) * 100;
  const timeColor = timePercentage > 50 ? 'text-green-600' : timePercentage > 25 ? 'text-orange-600' : 'text-red-600';

  return (
    <div className="flex items-center gap-4">
      {/* Lives */}
      <div className="flex items-center gap-1">
        <Heart className="w-4 h-4 text-red-500" />
        <span className="font-mono text-sm">{lives}</span>
      </div>

      {/* Timer */}
      <div className="flex items-center gap-2">
        <Timer className={`w-4 h-4 ${timeColor}`} />
        <div className="flex flex-col items-end">
          <span className={`font-mono text-sm ${timeColor}`}>
            {Math.ceil(timeLeft)}s
          </span>
          <Progress 
            value={timePercentage} 
            className="w-12 h-1"
          />
        </div>
      </div>

      {/* Streak */}
      {streak > 0 && (
        <div className="flex items-center gap-1">
          <Zap className="w-4 h-4 text-yellow-500" />
          <span className="font-mono text-sm text-yellow-600">
            {streak}x
          </span>
        </div>
      )}

      {/* Score */}
      <div className="flex items-center gap-1">
        <Trophy className="w-4 h-4 text-blue-500" />
        <span className="font-mono text-sm font-medium">
          {score.toLocaleString()}
        </span>
      </div>

      {/* Difficulty Badge */}
      <Badge 
        variant="outline"
        className={`text-xs font-medium ${
          difficulty === 'beginner' ? 'text-green-700 border-green-300' :
          difficulty === 'intermediate' ? 'text-orange-700 border-orange-300' :
          'text-red-700 border-red-300'
        }`}
      >
        {difficulty}
      </Badge>
    </div>
  );
}