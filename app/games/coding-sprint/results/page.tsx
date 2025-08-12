"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GameProvider, useGame } from "../context/GameContext";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

import {
  Trophy,
  Timer,
  Target,
  Zap,
  Home,
  RotateCcw,
  Share2,
  Star,
  TrendingUp,
  Award,
} from "lucide-react";

interface HighScore {
  score: number;
  difficulty: string;
  date: string;
  accuracy: number;
  puzzlesSolved: number;
}

function GameResults() {
  const { state, resetGame } = useGame();
  const router = useRouter();
  const [highScores, setHighScores] = useState<HighScore[]>([]);
  const [isNewHighScore, setIsNewHighScore] = useState(false);

  useEffect(() => {
    // Load high scores from localStorage
    const savedScores = localStorage.getItem("coding-sprint-scores");
    const scores = savedScores ? JSON.parse(savedScores) : [];

    // Add current game score
    const currentScore: HighScore = {
      score: state.stats.score,
      difficulty: state.difficulty,
      date: new Date().toISOString(),
      accuracy: state.stats.accuracy,
      puzzlesSolved: state.stats.puzzlesSolved,
    };

    const updatedScores = [...scores, currentScore]
      .sort((a, b) => b.score - a.score)
      .slice(0, 10); // Keep top 10

    // Check if this is a new high score
    const difficultyScores = scores.filter(
      (s: HighScore) => s.difficulty === state.difficulty
    );
    const previousBest =
      difficultyScores.length > 0
        ? Math.max(...difficultyScores.map((s: HighScore) => s.score))
        : 0;
    setIsNewHighScore(state.stats.score > previousBest);

    setHighScores(updatedScores);
    localStorage.setItem("coding-sprint-scores", JSON.stringify(updatedScores));
  }, [state.stats, state.difficulty]);

  const handleShare = async () => {
    const shareText =
      `🚀 I just scored ${state.stats.score.toLocaleString()} points in Coding Sprint (${
        state.difficulty
      } mode)!\n\n` +
      `📊 Stats:\n` +
      `• Puzzles solved: ${state.stats.puzzlesSolved}\n` +
      `• Accuracy: ${state.stats.accuracy}%\n` +
      `• Fastest solve: ${
        state.stats.fastestSolve ? Math.round(state.stats.fastestSolve) : "N/A"
      }s\n\n` +
      `Try it yourself! 🧩`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Coding Sprint Results",
          text: shareText,
          url: window.location.origin + "/games/coding-sprint",
        });
      } catch (error) {
        // Fallback to clipboard
        await navigator.clipboard.writeText(shareText);
        toast.success("Results copied to clipboard!");
      }
    } else {
      await navigator.clipboard.writeText(shareText);
      toast.success("Results copied to clipboard!");
    }
  };

  const handlePlayAgain = () => {
    resetGame();
    router.push("/games/coding-sprint/play");
  };

  const getScoreRank = (score: number) => {
    if (score >= 5000)
      return {
        rank: "Coding Master",
        color: "text-purple-600",
        icon: <Award className="w-5 h-5" />,
      };
    if (score >= 3000)
      return {
        rank: "Senior Developer",
        color: "text-blue-600",
        icon: <Star className="w-5 h-5" />,
      };
    if (score >= 1500)
      return {
        rank: "Developer",
        color: "text-green-600",
        icon: <TrendingUp className="w-5 h-5" />,
      };
    if (score >= 500)
      return {
        rank: "Junior Developer",
        color: "text-orange-600",
        icon: <Target className="w-5 h-5" />,
      };
    return {
      rank: "Beginner",
      color: "text-gray-600",
      icon: <Zap className="w-5 h-5" />,
    };
  };

  const scoreRank = getScoreRank(state.stats.score);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4">
      <div className="max-w-4xl mx-auto pt-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-blue-600 rounded-2xl">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold">Sprint Complete!</h1>
          </div>

          {isNewHighScore && (
            <Badge
              variant="default"
              className="bg-yellow-500 text-yellow-900 animate-pulse"
            >
              🎉 New High Score!
            </Badge>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Main Results */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">Final Results</CardTitle>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={`${scoreRank.color} border-current`}
                  >
                    {scoreRank.icon}
                    <span className="ml-1">{scoreRank.rank}</span>
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="text-lg font-mono px-3 py-1"
                  >
                    {state.stats.score.toLocaleString()} pts
                  </Badge>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full mx-auto mb-2">
                    <Target className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold">
                    {state.stats.puzzlesSolved}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Puzzles Solved
                  </div>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full mx-auto mb-2">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="text-2xl font-bold">
                    {state.stats.accuracy}%
                  </div>
                  <div className="text-sm text-muted-foreground">Accuracy</div>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full mx-auto mb-2">
                    <Timer className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="text-2xl font-bold">
                    {state.stats.fastestSolve
                      ? Math.round(state.stats.fastestSolve)
                      : "-"}
                    s
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Fastest Solve
                  </div>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full mx-auto mb-2">
                    <Zap className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="text-2xl font-bold">
                    {Math.max(state.stats.streak, 1)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Best Streak
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>What&aposs Next?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button onClick={handlePlayAgain} size="lg" className="w-full">
                <RotateCcw className="w-4 h-4 mr-2" />
                Play Again
              </Button>

              <Button
                onClick={handleShare}
                variant="outline"
                size="lg"
                className="w-full"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share Results
              </Button>

              <Button asChild variant="outline" size="lg" className="w-full">
                <Link href="/#games">
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* High Scores */}
          <Card>
            <CardHeader>
              <CardTitle>High Scores</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {highScores.slice(0, 5).map((score, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-2 rounded ${
                      score.score === state.stats.score &&
                      score.difficulty === state.difficulty
                        ? "bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-700"
                        : "bg-muted/50"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className="w-6 h-6 rounded-full p-0 flex items-center justify-center text-xs"
                      >
                        {index + 1}
                      </Badge>
                      <div>
                        <div className="font-mono font-semibold">
                          {score.score.toLocaleString()}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {score.difficulty} • {score.accuracy}% •{" "}
                          {new Date(score.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {highScores.length === 0 && (
                  <div className="text-center text-muted-foreground text-sm py-4">
                    No scores yet. Keep playing to build your record!
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Game Summary */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Game Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Difficulty:</span>
                <span className="ml-2 capitalize font-medium">
                  {state.difficulty}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Total Time:</span>
                <span className="ml-2 font-mono">
                  {Math.round(state.stats.totalTime / 60)}m{" "}
                  {state.stats.totalTime % 60}s
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Hints Used:</span>
                <span className="ml-2 font-mono">{state.stats.hintsUsed}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-8 py-4">
          <p className="text-muted-foreground text-sm">
            Thanks for playing Coding Sprint! Challenge yourself with harder
            difficulties.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function GameResultsPage() {
  return (
    <GameProvider>
      <GameResults />
    </GameProvider>
  );
}
