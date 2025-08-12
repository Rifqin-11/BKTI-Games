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
import {
  Play,
  HelpCircle,
  Shield,
  Timer,
  Target,
  Brain,
  Lock,
  Zap,
} from "lucide-react";
import { GameProvider, useGame, Difficulty } from "./context/GameContext";

const difficulties = [
  {
    id: "easy" as Difficulty,
    name: "Novice Hacker",
    description: "Basic ciphers and simple patterns",
    time: "30-60s per puzzle",
    icon: <Target className="w-5 h-5" />,
    color: "bg-green-500",
    ciphers: ["Caesar", "Base64", "Leetspeak", "Simple patterns"],
  },
  {
    id: "medium" as Difficulty,
    name: "Script Kiddie",
    description: "Vigenère, substitution ciphers",
    time: "60-90s per puzzle",
    icon: <Brain className="w-5 h-5" />,
    color: "bg-orange-500",
    ciphers: ["Vigenère", "Substitution", "Complex patterns"],
  },
  {
    id: "hard" as Difficulty,
    name: "Elite Hacker",
    description: "Advanced cryptography challenges",
    time: "75-120s per puzzle",
    icon: <Zap className="w-5 h-5" />,
    color: "bg-red-500",
    ciphers: ["Complex Vigenère", "Full substitution", "Matrix patterns"],
  },
];

function GameLanding() {
  const { dispatch } = useGame();
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<Difficulty>("easy");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-4xl mx-auto pt-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-emerald-600 rounded-2xl shadow-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
              Hack the Password
            </h1>
          </div>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Crack passwords through logic puzzles and cipher challenges. Test
            your cryptographic knowledge and pattern recognition skills!
          </p>
        </div>

        {/* Game Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Timer className="w-8 h-8 mx-auto text-emerald-600 mb-2" />
              <CardTitle className="text-lg">Timed Challenges</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">
                Race against time with variable difficulty-based time limits
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Lock className="w-8 h-8 mx-auto text-cyan-600 mb-2" />
              <CardTitle className="text-lg">Real Ciphers</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">
                Learn actual cryptographic techniques like Caesar, Vigenère, and
                Base64
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Brain className="w-8 h-8 mx-auto text-purple-600 mb-2" />
              <CardTitle className="text-lg">Smart Hints</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">
                Get contextual hints and frequency analysis tools when stuck
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Difficulty Selection */}
        <Card className="max-w-2xl mx-auto shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Choose Your Skill Level</CardTitle>
            <CardDescription>
              Select difficulty to begin your hacking challenge
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {difficulties.map((diff) => (
              <div
                key={diff.id}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all hover:shadow-lg ${
                  selectedDifficulty === diff.id
                    ? "border-emerald-500 bg-emerald-50 shadow-md"
                    : "border-slate-200 hover:border-emerald-300"
                }`}
                onClick={() => setSelectedDifficulty(diff.id)}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 ${diff.color} rounded-lg text-white`}
                      >
                        {diff.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{diff.name}</h3>
                        <p className="text-slate-600 text-sm">
                          {diff.description}
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="font-mono text-xs">
                      {diff.time}
                    </Badge>
                  </div>
                  <div className="pl-11">
                    <div className="flex flex-wrap gap-1">
                      {diff.ciphers.map((cipher) => (
                        <Badge
                          key={cipher}
                          variant="outline"
                          className="text-xs"
                        >
                          {cipher}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex gap-3 pt-4">
              <Link href="/games/hack-password/play" className="flex-1">
                <Button
                  size="lg"
                  className="w-full text-lg py-6 bg-emerald-600 hover:bg-emerald-700"
                  onClick={() =>
                    dispatch({
                      type: "SET_DIFFICULTY",
                      payload: selectedDifficulty,
                    })
                  }
                >
                  <Play className="w-5 h-5 mr-2" />
                  Start Hacking
                </Button>
              </Link>

              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" variant="outline" className="py-6">
                    <HelpCircle className="w-5 h-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      How to Hack
                    </DialogTitle>
                    <DialogDescription asChild>
                      <div className="space-y-4 text-sm">
                        <div>
                          <h4 className="font-medium mb-2 text-emerald-600">
                            🎯 Objective
                          </h4>
                          <p>
                            Decipher encrypted passwords using various
                            cryptographic techniques before time runs out.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2 text-emerald-600">
                            🔐 Cipher Types
                          </h4>
                          <ul className="space-y-1 ml-2">
                            <li>
                              • <strong>Caesar:</strong> Each letter shifted by
                              same amount
                            </li>
                            <li>
                              • <strong>Vigenère:</strong> Key-based
                              polyalphabetic cipher
                            </li>
                            <li>
                              • <strong>Base64:</strong> Binary-to-text encoding
                            </li>
                            <li>
                              • <strong>Leetspeak:</strong> Letters replaced
                              with numbers/symbols
                            </li>
                            <li>
                              • <strong>Substitution:</strong> Each letter maps
                              to another
                            </li>
                            <li>
                              • <strong>Patterns:</strong> Geometric or
                              mathematical rearrangement
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2 text-emerald-600">
                            🛠️ Tools
                          </h4>
                          <p>
                            • <strong>Hint (H):</strong> Get a clue (-25% score)
                          </p>
                          <p>
                            • <strong>Skip (S):</strong> Move to next puzzle (0
                            points)
                          </p>
                          <p>
                            • <strong>Alphabet:</strong> View reference alphabet
                          </p>
                          <p>
                            • <strong>Frequency:</strong> Analyze letter
                            distribution
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2 text-emerald-600">
                            💯 Scoring
                          </h4>
                          <p>• Base points × time bonus × streak multiplier</p>
                          <p>
                            • Wrong answers: -5 seconds, -1 life, reset streak
                          </p>
                          <p>• Streak bonus: +10% per 3 consecutive solves</p>
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

export default function HackPasswordPage() {
  return (
    <GameProvider>
      <GameLanding />
    </GameProvider>
  );
}
