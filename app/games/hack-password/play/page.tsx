"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Home, RefreshCw } from "lucide-react";

import { GameProvider, useGame } from "../context/GameContext";
import { getPuzzlesByDifficulty } from "../puzzles";
import { CipherUtils } from "../utils/cipherUtils";
import { CipherPanel } from "../components/CipherPanel";
import { GuessForm } from "../components/GuessForm";
import { Timer } from "../components/Timer";
import { Hud } from "../components/Hud";
import { LogFeed } from "../components/LogFeed";
import { FrequencyChart } from "../components/FrequencyChart";
import { AlphabetReference } from "../components/AlphabetReference";

function GamePlay() {
  const { state, dispatch } = useGame();
  const router = useRouter();
  const [showResult, setShowResult] = useState<"correct" | "incorrect" | null>(
    null
  );
  const [showGameOverDialog, setShowGameOverDialog] = useState(false);

  // Initialize game
  useEffect(() => {
    console.log("Game initialization check:", {
      isPlaying: state.isPlaying,
      isGameComplete: state.isGameComplete,
      difficulty: state.difficulty,
      currentPuzzle: !!state.currentPuzzle,
    });

    if (!state.isPlaying && !state.isGameComplete) {
      const puzzles = getPuzzlesByDifficulty(state.difficulty);
      console.log(
        "Available puzzles for difficulty:",
        state.difficulty,
        puzzles.length
      );

      if (puzzles.length === 0) {
        console.error("No puzzles found for difficulty:", state.difficulty);
        return;
      }

      const shuffledPuzzles = [...puzzles]
        .sort(() => Math.random() - 0.5)
        .slice(0, 8); // Random 8 puzzles

      console.log(
        "Initializing game with puzzles:",
        shuffledPuzzles.length,
        shuffledPuzzles[0]
      );

      dispatch({
        type: "START_GAME",
        payload: {
          puzzles: shuffledPuzzles,
          gameId: Date.now().toString(),
        },
      });
    }
  }, [
    state.difficulty,
    state.isPlaying,
    state.isGameComplete,
    state.currentPuzzle,
    dispatch,
  ]);

  // Timer effect
  useEffect(() => {
    if (!state.isPlaying || state.isPaused || state.timeRemaining <= 0) return;

    const timer = setInterval(() => {
      dispatch({ type: "TICK_TIMER" });
    }, 1000);

    return () => clearInterval(timer);
  }, [state.isPlaying, state.isPaused, state.timeRemaining, dispatch]);

  // Game over conditions
  useEffect(() => {
    // Only trigger game over if we're actually playing and have a valid reason
    if (state.isPlaying && state.currentPuzzle) {
      if (state.timeRemaining <= 0) {
        console.log("Game over: Time expired");
        dispatch({ type: "END_GAME" });
        setShowGameOverDialog(true);
      } else if (state.lives <= 0) {
        console.log("Game over: No lives remaining");
        dispatch({ type: "END_GAME" });
        setShowGameOverDialog(true);
      }
    }
  }, [
    state.timeRemaining,
    state.lives,
    state.isPlaying,
    state.currentPuzzle,
    dispatch,
  ]);

  // Auto-advance after completing all puzzles
  useEffect(() => {
    if (state.isGameComplete && !showGameOverDialog) {
      router.push("/games/hack-password/results");
    }
  }, [state.isGameComplete, showGameOverDialog, router]);

  const handleSubmitGuess = () => {
    if (!state.currentPuzzle) return;

    const normalizedGuess = CipherUtils.normalizeAnswer(state.playerGuess);
    const normalizedAnswer = CipherUtils.normalizeAnswer(
      state.currentPuzzle.plaintext
    );

    if (normalizedGuess === normalizedAnswer) {
      // Correct answer
      const timeBonus = state.timeRemaining / state.totalTime;
      dispatch({ type: "CORRECT_ANSWER", payload: { timeBonus } });
      setShowResult("correct");

      setTimeout(() => {
        setShowResult(null);
        dispatch({ type: "NEXT_PUZZLE" });
      }, 1500);
    } else {
      // Wrong answer
      dispatch({ type: "WRONG_ANSWER" });
      setShowResult("incorrect");

      setTimeout(() => {
        setShowResult(null);
      }, 1000);
    }
  };

  const handleHint = () => {
    dispatch({ type: "SHOW_HINT" });
  };

  const handleSkip = () => {
    dispatch({ type: "SKIP_PUZZLE" });
    setTimeout(() => {
      dispatch({ type: "NEXT_PUZZLE" });
    }, 500);
  };

  const handleTogglePause = () => {
    if (state.isPaused) {
      dispatch({ type: "RESUME_GAME" });
    } else {
      dispatch({ type: "PAUSE_GAME" });
    }
  };

  const handleRestart = () => {
    dispatch({ type: "RESET_GAME" });
    setShowGameOverDialog(false);
  };

  if (!state.currentPuzzle && !state.isGameComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <div className="text-emerald-600 font-mono">
            Loading encryption challenge...
          </div>
          <div className="text-slate-500 font-mono text-sm mt-2">
            Game State: {state.isPlaying ? "Playing" : "Not Playing"} | Puzzles:{" "}
            {state.puzzleQueue.length} | Difficulty: {state.difficulty}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => router.push("/games/hack-password")}
              variant="outline"
              size="sm"
              className="border-slate-300 text-slate-600"
            >
              <Home className="w-4 h-4 mr-2" />
              Exit
            </Button>
            <Badge className="bg-emerald-600 text-white font-mono">
              PUZZLE {state.currentPuzzleIndex + 1} / {state.puzzleQueue.length}
            </Badge>
            <Badge
              variant="outline"
              className="font-mono text-emerald-600 border-emerald-300"
            >
              {state.difficulty.toUpperCase()}
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            {state.isPaused && (
              <Badge variant="secondary" className="font-mono">
                PAUSED
              </Badge>
            )}
          </div>
        </div>

        {/* Main Game Grid */}
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Left Column - Main Game */}
          <div className="lg:col-span-8 space-y-6">
            {/* Cipher Panel */}
            <CipherPanel
              puzzle={state.currentPuzzle}
              showHint={state.showHint}
            />

            {/* Guess Form */}
            <GuessForm
              guess={state.playerGuess}
              onGuessChange={(guess) =>
                dispatch({ type: "SET_GUESS", payload: guess })
              }
              onSubmit={handleSubmitGuess}
              onHint={handleHint}
              onSkip={handleSkip}
              disabled={state.isPaused || state.timeRemaining <= 0}
              showResult={showResult}
            />

            {/* Tools Row */}
            <div className="grid md:grid-cols-2 gap-4">
              <AlphabetReference
                isVisible={state.showAlphabet}
                cipherType={state.currentPuzzle?.cipher}
              />
              <FrequencyChart
                text={state.currentPuzzle?.ciphertext || ""}
                isVisible={state.showFrequencyChart}
              />
            </div>
          </div>

          {/* Right Column - HUD and Logs */}
          <div className="lg:col-span-4 space-y-6">
            {/* Timer */}
            <Timer
              timeRemaining={state.timeRemaining}
              totalTime={state.totalTime}
              isActive={state.isPlaying && !state.isPaused}
            />

            {/* HUD */}
            <Hud
              score={state.score}
              streak={state.streak}
              puzzlesSolved={state.puzzlesSolved}
              lives={state.lives}
              currentPuzzle={state.currentPuzzleIndex + 1}
              totalPuzzles={state.puzzleQueue.length}
              isPaused={state.isPaused}
              showAlphabet={state.showAlphabet}
              showFrequencyChart={state.showFrequencyChart}
              onToggleAlphabet={() => dispatch({ type: "TOGGLE_ALPHABET" })}
              onToggleFrequency={() =>
                dispatch({ type: "TOGGLE_FREQUENCY_CHART" })
              }
              onTogglePause={handleTogglePause}
            />

            {/* Log Feed */}
            <LogFeed logs={state.accessLogs} />
          </div>
        </div>

        {/* Game Over Dialog */}
        <Dialog open={showGameOverDialog} onOpenChange={setShowGameOverDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center text-red-500 font-mono">
                SYSTEM COMPROMISED
              </DialogTitle>
              <DialogDescription asChild>
                <div className="text-center space-y-4">
                  <div className="text-slate-600">
                    {state.timeRemaining <= 0
                      ? "Time expired!"
                      : "Security breach detected!"}
                  </div>

                  <div className="space-y-2 font-mono text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Final Score:</span>
                      <span className="text-emerald-600">
                        {state.score.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Puzzles Solved:</span>
                      <span className="text-emerald-600">
                        {state.puzzlesSolved}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Best Streak:</span>
                      <span className="text-emerald-600">{state.streak}</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={handleRestart}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Try Again
                    </Button>
                    <Button
                      onClick={() =>
                        router.push("/games/hack-password/results")
                      }
                      variant="outline"
                      className="flex-1"
                    >
                      View Results
                    </Button>
                  </div>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default function PlayPage() {
  return (
    <GameProvider>
      <GamePlay />
    </GameProvider>
  );
}
