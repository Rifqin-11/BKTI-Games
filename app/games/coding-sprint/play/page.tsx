'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { GameProvider, useGame } from '../context/GameContext';
import { getPuzzlesByDifficulty } from '../puzzles';
import { useCountdown } from '../hooks/useCountdown';
import { useDnDOrder } from '../hooks/useDnDOrder';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

import { 
  Play, 
  Pause, 
  SkipForward, 
  Lightbulb, 
  Heart, 
  Timer, 
  Trophy,
  Home,
  Zap,
  CheckCircle,
  XCircle,
  RotateCcw
} from 'lucide-react';

import { BlockCard } from '../components/BlockCard';
import { PreviewPanel } from '../components/PreviewPanel';
import { Hud } from '../components/Hud';

function GamePlay() {
  const { state, startGame, endGame, pauseGame, resumeGame, startPuzzle, solvePuzzle, failPuzzle, useHint, resetGame } = useGame();
  const router = useRouter();
  
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [hintsUsedThisPuzzle, setHintsUsedThisPuzzle] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  
  const puzzles = getPuzzlesByDifficulty(state.difficulty);
  const currentPuzzle = puzzles[currentPuzzleIndex];
  
  const { blocks, moveBlock, reorderBlocks, getCurrentOrder, resetOrder } = useDnDOrder(
    currentPuzzle?.blocks || []
  );
  
  const { timeLeft, isActive, isPaused, start, pause, resume, reset } = useCountdown({
    initialTime: state.timeLeft,
    onComplete: handleTimeUp,
  });

  function handleTimeUp() {
    failPuzzle();
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 600);
    toast.error("Time's up! Try the next puzzle.");
    
    if (state.stats.lives <= 1) {
      endGame();
      router.push('/games/coding-sprint/results');
    } else {
      nextPuzzle();
    }
  }

  const startNewGame = useCallback(() => {
    startGame();
    setCurrentPuzzleIndex(0);
    setShowHint(false);
    setHintsUsedThisPuzzle(false);
    
    if (currentPuzzle) {
      startPuzzle(currentPuzzle.id);
      resetOrder();
      reset(state.timeLeft);
      start();
    }
  }, [startGame, startPuzzle, currentPuzzle, resetOrder, reset, start, state.timeLeft]);

  const nextPuzzle = useCallback(() => {
    const nextIndex = currentPuzzleIndex + 1;
    
    if (nextIndex >= puzzles.length) {
      endGame();
      router.push('/games/coding-sprint/results');
      return;
    }
    
    setCurrentPuzzleIndex(nextIndex);
    setShowHint(false);
    setHintsUsedThisPuzzle(false);
    
    const nextPuzzle = puzzles[nextIndex];
    startPuzzle(nextPuzzle.id);
    resetOrder();
    reset(state.timeLeft);
    start();
  }, [currentPuzzleIndex, puzzles, endGame, router, startPuzzle, resetOrder, reset, start, state.timeLeft]);

  const handleSubmit = useCallback(() => {
    if (!currentPuzzle) return;
    
    const currentOrder = getCurrentOrder();
    const isCorrect = JSON.stringify(currentOrder) === JSON.stringify(currentPuzzle.solutionOrder);
    
    if (isCorrect) {
      const timeSpent = state.timeLeft - timeLeft;
      solvePuzzle(timeSpent, hintsUsedThisPuzzle);
      
      toast.success("Perfect! Moving to next puzzle.", {
        icon: <CheckCircle className="w-4 h-4" />,
      });
      
      setTimeout(() => {
        nextPuzzle();
      }, 1500);
    } else {
      failPuzzle();
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 600);
      
      toast.error("Not quite right. Try again!", {
        icon: <XCircle className="w-4 h-4" />,
      });
      
      if (state.stats.lives <= 1) {
        setTimeout(() => {
          endGame();
          router.push('/games/coding-sprint/results');
        }, 2000);
      }
    }
  }, [currentPuzzle, getCurrentOrder, timeLeft, state.timeLeft, hintsUsedThisPuzzle, solvePuzzle, failPuzzle, nextPuzzle, endGame, router, state.stats.lives]);

  const handleHint = useCallback(() => {
    if (!showHint && !hintsUsedThisPuzzle) {
      useHint();
      setHintsUsedThisPuzzle(true);
    }
    setShowHint(!showHint);
  }, [showHint, hintsUsedThisPuzzle, useHint]);

  const handlePause = useCallback(() => {
    if (isPaused) {
      resumeGame();
      resume();
    } else {
      pauseGame();
      pause();
    }
  }, [isPaused, pauseGame, resumeGame, pause, resume]);

  // Initialize game on mount
  useEffect(() => {
    if (!state.isPlaying && puzzles.length > 0) {
      startNewGame();
    }
  }, [state.isPlaying, puzzles.length, startNewGame]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;
      
      switch (e.key.toLowerCase()) {
        case ' ':
          e.preventDefault();
          if (state.isPlaying) handlePause();
          break;
        case 'enter':
          e.preventDefault();
          if (state.isPlaying && !isPaused) handleSubmit();
          break;
        case 'h':
          e.preventDefault();
          if (state.isPlaying && !isPaused) handleHint();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [state.isPlaying, isPaused, handlePause, handleSubmit, handleHint]);

  if (!currentPuzzle) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <h2 className="text-xl font-semibold mb-4">No puzzles available</h2>
          <Link href="/games/coding-sprint">
            <Button>
              <Home className="w-4 h-4 mr-2" />
              Back to Menu
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  const progress = ((currentPuzzleIndex) / puzzles.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <div className="border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/games/coding-sprint" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Menu</span>
            </Link>
            
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="font-mono">
                {currentPuzzleIndex + 1} / {puzzles.length}
              </Badge>
              <Progress value={progress} className="w-24 hidden sm:block" />
            </div>
            
            <Hud 
              lives={state.stats.lives}
              score={state.stats.score}
              streak={state.stats.streak}
              timeLeft={timeLeft}
              difficulty={state.difficulty}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 grid lg:grid-cols-2 gap-6">
        {/* Left Panel - Puzzle */}
        <div className="space-y-4">
          {/* Puzzle Header */}
          <Card className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold mb-2">{currentPuzzle.title}</h2>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Badge variant="secondary">{currentPuzzle.language.toUpperCase()}</Badge>
                  <span>•</span>
                  <span>{currentPuzzle.difficulty}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleHint}
                  className={showHint ? 'bg-yellow-100 dark:bg-yellow-900' : ''}
                >
                  <Lightbulb className="w-4 h-4 mr-1" />
                  Hint
                </Button>
                
                <Button
                  variant="outline" 
                  size="sm"
                  onClick={handlePause}
                >
                  {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                </Button>
              </div>
            </div>
            
            {showHint && (
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4">
                <div className="flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-1">Hint</p>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300">{currentPuzzle.hint}</p>
                    {hintsUsedThisPuzzle && (
                      <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-2">
                        💡 Using hints reduces your score by 30% for this puzzle
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </Card>

          {/* Drag & Drop Area */}
          <Card className={`p-6 transition-all duration-300 ${isShaking ? 'animate-pulse border-red-500' : ''}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Arrange the code blocks:</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  resetOrder();
                  toast.info("Blocks shuffled!");
                }}
              >
                <RotateCcw className="w-4 h-4 mr-1" />
                Shuffle
              </Button>
            </div>
            
            <div className="space-y-2 mb-6">
              {blocks.map((block, index) => (
                <BlockCard
                  key={`block-${index}`}
                  block={block}
                  index={index}
                  language={currentPuzzle.language}
                  onMove={moveBlock}
                  isPaused={isPaused}
                />
              ))}
            </div>
            
            <Separator className="my-4" />
            
            <div className="flex gap-2">
              <Button 
                onClick={handleSubmit}
                disabled={isPaused}
                className="flex-1"
                size="lg"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Submit Solution
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => nextPuzzle()}
                disabled={isPaused}
                size="lg"
              >
                <SkipForward className="w-4 h-4" />
              </Button>
            </div>
          </Card>

          {/* Keyboard Shortcuts */}
          <Card className="p-4">
            <div className="text-sm text-muted-foreground space-y-1">
              <p><kbd className="px-2 py-1 bg-muted rounded text-xs">Space</kbd> Pause/Resume</p>
              <p><kbd className="px-2 py-1 bg-muted rounded text-xs">Enter</kbd> Submit</p>
              <p><kbd className="px-2 py-1 bg-muted rounded text-xs">H</kbd> Toggle Hint</p>
              <p><kbd className="px-2 py-1 bg-muted rounded text-xs">J/K</kbd> Move focused block</p>
            </div>
          </Card>
        </div>

        {/* Right Panel - Preview */}
        <div>
          <PreviewPanel 
            blocks={blocks}
            language={currentPuzzle.language}
            previewType={currentPuzzle.previewType}
            isPaused={isPaused}
          />
        </div>
      </div>
    </div>
  );
}

export default function GamePlayPage() {
  return (
    <GameProvider>
      <GamePlay />
    </GameProvider>
  );
}