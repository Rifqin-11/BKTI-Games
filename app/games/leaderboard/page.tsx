"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Trophy,
  Medal,
  Code2,
  Shield,
  Home,
  Calendar,
  Target,
  Zap,
} from "lucide-react";

interface CodingSprintScore {
  score: number;
  difficulty: "beginner" | "intermediate" | "advanced";
  puzzlesSolved: number;
  streak: number;
  date: number;
  gameType: "coding-sprint";
}

interface HackPasswordScore {
  score: number;
  difficulty: "easy" | "medium" | "hard";
  puzzlesSolved: number;
  streak: number;
  timeRemaining: number;
  date: number;
  gameType: "hack-password";
}

type AllScores = CodingSprintScore | HackPasswordScore;

export default function LeaderboardPage() {
  const [codingSprintScores, setCodingSprintScores] = useState<
    CodingSprintScore[]
  >([]);
  const [hackPasswordScores, setHackPasswordScores] = useState<
    HackPasswordScore[]
  >([]);
  const [combinedScores, setCombinedScores] = useState<AllScores[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Load Coding Sprint scores
      const codingScores = JSON.parse(
        localStorage.getItem("coding-sprint-scores") || "[]"
      ).map((score: any) => ({ ...score, gameType: "coding-sprint" as const }));

      // Load Hack Password scores
      const hackScores = JSON.parse(
        localStorage.getItem("hack-password-scores") || "[]"
      ).map((score: any) => ({ ...score, gameType: "hack-password" as const }));

      setCodingSprintScores(codingScores);
      setHackPasswordScores(hackScores);

      // Combine and sort all scores
      const combined = [...codingScores, ...hackScores]
        .sort((a, b) => b.score - a.score)
        .slice(0, 20);
      setCombinedScores(combined);
    }
  }, []);

  const getGameIcon = (gameType: string) => {
    switch (gameType) {
      case "coding-sprint":
        return <Code2 className="w-4 h-4 text-blue-400" />;
      case "hack-password":
        return <Shield className="w-4 h-4 text-emerald-400" />;
      default:
        return <Trophy className="w-4 h-4" />;
    }
  };

  const getGameName = (gameType: string) => {
    switch (gameType) {
      case "coding-sprint":
        return "Coding Sprint";
      case "hack-password":
        return "Hack the Password";
      default:
        return "Unknown";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
      case "easy":
        return "bg-green-500";
      case "intermediate":
      case "medium":
        return "bg-orange-500";
      case "advanced":
      case "hard":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return "🥇";
      case 1:
        return "🥈";
      case 2:
        return "🥉";
      default:
        return `#${index + 1}`;
    }
  };

  const ScoreCard = ({
    scores,
    title,
    emptyText,
  }: {
    scores: AllScores[];
    title: string;
    emptyText: string;
  }) => (
    <Card className="bg-white border-slate-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl text-slate-800">
          <Trophy className="w-5 h-5 text-yellow-400" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {scores.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            <Trophy className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p>{emptyText}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {scores.map((score, index) => (
              <div
                key={`${score.gameType}-${score.date}-${index}`}
                className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
                  index < 3
                    ? "border-yellow-300 bg-yellow-50"
                    : "border-slate-200 bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Rank */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      index === 0
                        ? "bg-yellow-600 text-white"
                        : index === 1
                        ? "bg-gray-400 text-white"
                        : index === 2
                        ? "bg-orange-600 text-white"
                        : "bg-slate-600 text-white"
                    }`}
                  >
                    {typeof getRankIcon(index) === "string" &&
                    getRankIcon(index).startsWith("#")
                      ? getRankIcon(index).slice(1)
                      : getRankIcon(index)}
                  </div>

                  {/* Game Info */}
                  <div className="flex items-center gap-2">
                    {getGameIcon(score.gameType)}
                    <span className="font-medium">
                      {getGameName(score.gameType)}
                    </span>
                  </div>

                  {/* Score */}
                  <div className="font-mono text-lg font-bold text-blue-400">
                    {score.score.toLocaleString()}
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  {/* Difficulty */}
                  <Badge
                    className={`${getDifficultyColor(
                      score.difficulty
                    )} text-white text-xs`}
                  >
                    {score.difficulty.toUpperCase()}
                  </Badge>

                  {/* Stats */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Target className="w-3 h-3" />
                      <span>{score.puzzlesSolved}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Zap className="w-3 h-3" />
                      <span>{score.streak}</span>
                    </div>
                  </div>

                  {/* Date */}
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(score.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-6xl mx-auto pt-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-2xl shadow-lg">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
              Leaderboard
            </h1>
          </div>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Top scores across all puzzle games. Compete with yourself and track
            your progress!
          </p>
        </div>

        {/* Navigation */}
        <div className="flex justify-center mb-8">
          <Link href="/#games">
            <Button variant="outline" className="gap-2">
              <Home className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Leaderboard Tabs */}
        <Tabs defaultValue="combined" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="combined" className="flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              Combined
            </TabsTrigger>
            <TabsTrigger
              value="coding-sprint"
              className="flex items-center gap-2"
            >
              <Code2 className="w-4 h-4" />
              Coding Sprint
            </TabsTrigger>
            <TabsTrigger
              value="hack-password"
              className="flex items-center gap-2"
            >
              <Shield className="w-4 h-4" />
              Hack the Password
            </TabsTrigger>
          </TabsList>

          <TabsContent value="combined">
            <ScoreCard
              scores={combinedScores}
              title="All Games - Top Scores"
              emptyText="No scores yet! Play some games to see your results here."
            />
          </TabsContent>

          <TabsContent value="coding-sprint">
            <ScoreCard
              scores={codingSprintScores}
              title="Coding Sprint - High Scores"
              emptyText="No Coding Sprint scores yet! Start arranging code blocks to set your first record."
            />
          </TabsContent>

          <TabsContent value="hack-password">
            <ScoreCard
              scores={hackPasswordScores}
              title="Hack the Password - High Scores"
              emptyText="No hacking scores yet! Start cracking ciphers to build your hacker reputation."
            />
          </TabsContent>
        </Tabs>

        {/* Stats Summary */}
        {(codingSprintScores.length > 0 || hackPasswordScores.length > 0) && (
          <Card className="mt-8 bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Medal className="w-5 h-5 text-blue-400" />
                Your Gaming Stats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">
                    {combinedScores.length}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Total Games
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-400">
                    {Math.max(
                      ...combinedScores.map((s) => s.score),
                      0
                    ).toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Best Score
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-400">
                    {Math.max(...combinedScores.map((s) => s.streak), 0)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Best Streak
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">
                    {combinedScores.reduce(
                      (sum, score) => sum + score.puzzlesSolved,
                      0
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Puzzles Solved
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
