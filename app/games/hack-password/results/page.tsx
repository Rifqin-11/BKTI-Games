"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Trophy,
  Target,
  Zap,
  Clock,
  Share2,
  RefreshCw,
  Home,
  Medal,
  TrendingUp,
  Shield,
} from "lucide-react";
import { GameProvider, useGame, GameScore } from "../context/GameContext";

function ResultsView() {
  const { state } = useGame();
  const [highScores, setHighScores] = useState<GameScore[]>([]);
  const [shareText, setShareText] = useState("");

  useEffect(() => {
    // Load high scores
    if (typeof window !== "undefined") {
      const scores = JSON.parse(
        localStorage.getItem("hack-password-scores") || "[]"
      ) as GameScore[];
      setHighScores(scores);
    }

    // Generate share text
    const text = `🔐 Hack the Password Results:\n📊 Score: ${state.finalScore.toLocaleString()}\n🎯 Solved: ${
      state.puzzlesSolved
    } puzzles\n⚡ Streak: ${state.streak}\n🏆 Difficulty: ${
      state.difficulty
    }\n\nThink you can beat me? Play at [your-domain]`;
    setShareText(text);
  }, [state.finalScore, state.puzzlesSolved, state.streak, state.difficulty]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Hack the Password - My Results",
          text: shareText,
        });
      } catch (err) {
        // Fallback to clipboard
        navigator.clipboard.writeText(shareText);
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(shareText);
    }
  };

  const getPerformanceRating = () => {
    const baseScore = {
      easy: 800,
      medium: 1600,
      hard: 2400,
    }[state.difficulty];

    const percentage = (state.finalScore / baseScore) * 100;

    if (percentage >= 150)
      return { rating: "Elite Hacker", color: "text-purple-400", icon: "🔥" };
    if (percentage >= 120)
      return { rating: "Expert", color: "text-gold-400", icon: "⭐" };
    if (percentage >= 100)
      return { rating: "Advanced", color: "text-blue-400", icon: "💎" };
    if (percentage >= 75)
      return { rating: "Intermediate", color: "text-green-400", icon: "🎯" };
    if (percentage >= 50)
      return { rating: "Novice", color: "text-orange-400", icon: "🌟" };
    return { rating: "Beginner", color: "text-gray-400", icon: "🔰" };
  };

  const performance = getPerformanceRating();
  const isPersonalBest =
    highScores.length === 0 ||
    state.finalScore > Math.max(...highScores.map((s) => s.score));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-4xl mx-auto pt-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-emerald-600 rounded-2xl shadow-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-emerald-600 font-mono">
              MISSION COMPLETE
            </h1>
          </div>
          {isPersonalBest && (
            <Badge className="bg-yellow-500 text-white font-mono animate-pulse">
              🏆 NEW PERSONAL BEST!
            </Badge>
          )}
        </div>

        {/* Main Results Card */}
        <Card className="mb-8 bg-white border-emerald-200 shadow-2xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="flex items-center justify-center gap-2 text-2xl text-emerald-600 font-mono">
              <Trophy className="w-6 h-6" />
              FINAL SCORE
            </CardTitle>
            <div className="text-5xl font-bold text-emerald-500 font-mono">
              {state.finalScore.toLocaleString()}
            </div>
            <div className={`text-lg font-mono ${performance.color}`}>
              {performance.icon} {performance.rating}
            </div>
          </CardHeader>{" "}
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6 mb-6">
              {/* Puzzles Solved */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Target className="w-5 h-5 text-blue-500" />
                  <span className="text-blue-600 font-mono text-sm">
                    SOLVED
                  </span>
                </div>
                <div className="text-2xl font-bold text-blue-600 font-mono">
                  {state.puzzlesSolved}
                </div>
                <div className="text-sm text-slate-600">
                  / {state.puzzleQueue.length} puzzles
                </div>
              </div>

              {/* Best Streak */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Zap className="w-5 h-5 text-orange-500" />
                  <span className="text-orange-600 font-mono text-sm">
                    STREAK
                  </span>
                </div>
                <div className="text-2xl font-bold text-orange-600 font-mono">
                  {state.streak}
                </div>
                <div className="text-sm text-slate-600">consecutive</div>
              </div>

              {/* Time Bonus */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-purple-500" />
                  <span className="text-purple-600 font-mono text-sm">
                    TIME
                  </span>
                </div>
                <div className="text-2xl font-bold text-purple-600 font-mono">
                  {Math.floor(state.timeRemaining / 60)}:
                  {(state.timeRemaining % 60).toString().padStart(2, "0")}
                </div>
                <div className="text-sm text-slate-600">remaining</div>
              </div>

              {/* Difficulty */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Medal className="w-5 h-5 text-emerald-500" />
                  <span className="text-emerald-600 font-mono text-sm">
                    LEVEL
                  </span>
                </div>
                <div className="text-lg font-bold text-emerald-600 font-mono capitalize">
                  {state.difficulty}
                </div>
                <div className="text-sm text-slate-600">difficulty</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-mono">
                <span className="text-emerald-600">Completion Rate</span>
                <span className="text-emerald-600">
                  {Math.round(
                    (state.puzzlesSolved / state.puzzleQueue.length) * 100
                  )}
                  %
                </span>
              </div>
              <Progress
                value={(state.puzzlesSolved / state.puzzleQueue.length) * 100}
                className="h-3"
              />
            </div>
          </CardContent>
        </Card>

        {/* High Scores */}
        {highScores.length > 0 && (
          <Card className="mb-8 bg-white border-emerald-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-emerald-600 font-mono">
                <TrendingUp className="w-5 h-5" />
                HIGH SCORES
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {highScores.slice(0, 5).map((score, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-3 rounded border ${
                      score.score === state.finalScore
                        ? "border-emerald-300 bg-emerald-50"
                        : "border-slate-200 bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          index === 0
                            ? "bg-yellow-500 text-white"
                            : index === 1
                            ? "bg-slate-400 text-white"
                            : index === 2
                            ? "bg-orange-500 text-white"
                            : "bg-slate-300 text-white"
                        }`}
                      >
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-mono text-emerald-600">
                          {score.score.toLocaleString()}
                        </div>
                        <div className="text-xs text-slate-600">
                          {score.puzzlesSolved} solved • {score.difficulty}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-mono text-slate-600">
                        {new Date(score.date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Link href="/games/hack-password/play">
            <Button
              className="w-full bg-emerald-600 hover:bg-emerald-700 font-mono"
              size="lg"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Play Again
            </Button>
          </Link>

          <Button
            onClick={handleShare}
            variant="outline"
            className="w-full border-blue-300 text-blue-600 hover:bg-blue-50 font-mono"
            size="lg"
          >
            <Share2 className="w-5 h-5 mr-2" />
            Share Results
          </Button>

          <Link href="/#games">
            <Button
              variant="outline"
              className="w-full border-slate-300 text-slate-600 hover:bg-slate-50 font-mono"
              size="lg"
            >
              <Home className="w-5 h-5 mr-2" />
              Home
            </Button>
          </Link>
        </div>

        {/* Footer */}
        <div className="text-center text-slate-600 text-sm font-mono">
          <p>Keep hacking and improving your cryptographic skills!</p>
        </div>
      </div>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <GameProvider>
      <ResultsView />
    </GameProvider>
  );
}
