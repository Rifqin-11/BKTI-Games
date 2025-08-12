"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Play, HelpCircle, Code2, Timer, Target, Zap } from "lucide-react";
import { GameProvider, useGame } from "./context/GameContext";

const difficulties = [
  {
    id: "beginner",
    name: "Beginner",
    description: "Simple HTML & CSS blocks",
    time: "90s",
    icon: <Target className="w-5 h-5" />,
    color: "bg-green-500",
  },
  {
    id: "intermediate",
    name: "Intermediate",
    description: "JavaScript functions & logic",
    time: "60s",
    icon: <Code2 className="w-5 h-5" />,
    color: "bg-orange-500",
  },
  {
    id: "advanced",
    name: "Advanced",
    description: "TypeScript & complex patterns",
    time: "45s",
    icon: <Zap className="w-5 h-5" />,
    color: "bg-red-500",
  },
];

function GameLanding() {
  const { setDifficulty } = useGame();
  const [selectedDifficulty, setSelectedDifficulty] = useState<
    "beginner" | "intermediate" | "advanced"
  >("beginner");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-4xl mx-auto pt-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-blue-600 rounded-2xl">
              <Code2 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Coding Sprint
            </h1>
          </div>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Race against time to arrange jumbled code blocks into working
            solutions. Test your programming logic and pattern recognition
            skills!
          </p>
        </div>

        {/* Game Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardHeader>
              <Timer className="w-8 h-8 mx-auto text-blue-600 mb-2" />
              <CardTitle className="text-lg">Time Challenge</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">
                Beat the clock with varying time limits based on difficulty
                level
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Target className="w-8 h-8 mx-auto text-green-600 mb-2" />
              <CardTitle className="text-lg">Smart Scoring</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">
                Earn points for speed, accuracy, and maintaining solving streaks
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Code2 className="w-8 h-8 mx-auto text-purple-600 mb-2" />
              <CardTitle className="text-lg">Real Code</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">
                Work with actual HTML, JavaScript, and TypeScript snippets
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Difficulty Selection */}
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Choose Your Challenge</CardTitle>
            <CardDescription>
              Select difficulty level to start your coding sprint
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {difficulties.map((diff) => (
              <div
                key={diff.id}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all hover:shadow-lg ${
                  selectedDifficulty === diff.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-slate-200 hover:border-blue-300"
                }`}
                onClick={() => setSelectedDifficulty(diff.id as any)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 ${diff.color} rounded-lg`}>
                      {diff.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{diff.name}</h3>
                      <p className="text-slate-600">{diff.description}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="font-mono">
                    {diff.time}
                  </Badge>
                </div>
              </div>
            ))}

            <div className="flex gap-3 pt-4">
              <Link href="/games/coding-sprint/play" className="flex-1">
                <Button
                  size="lg"
                  className="w-full text-lg py-6"
                  onClick={() => setDifficulty(selectedDifficulty)}
                >
                  <Play className="w-5 h-5 mr-2" />
                  Start Sprint
                </Button>
              </Link>

              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" variant="outline" className="py-6">
                    <HelpCircle className="w-5 h-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>How to Play</DialogTitle>
                    <DialogDescription asChild>
                      <div className="space-y-4 text-sm">
                        <div>
                          <h4 className="font-medium mb-2">🎯 Objective</h4>
                          <p>
                            Drag and drop code blocks to arrange them in the
                            correct order before time runs out.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">⌨️ Controls</h4>
                          <p>• Drag blocks with mouse/touch</p>
                          <p>• Use J/K keys to move focused blocks</p>
                          <p>• Tab to navigate between blocks</p>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">💯 Scoring</h4>
                          <p>• Faster solutions = more points</p>
                          <p>• Consecutive solves build multipliers</p>
                          <p>• Hints reduce points by 30%</p>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">💔 Lives</h4>
                          <p>
                            You have 3 lives per game. Wrong answers cost 1
                            life.
                          </p>
                        </div>
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-12 py-8">
          <p className="text-slate-500 text-sm">
            BKTI Teknik Elektro Undip 2025
          </p>
        </div>
      </div>
    </div>
  );
}

export default function CodingSprintPage() {
  return (
    <GameProvider>
      <GameLanding />
    </GameProvider>
  );
}
