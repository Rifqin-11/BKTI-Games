"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lock, Eye, EyeOff } from "lucide-react";
import { Puzzle } from "../puzzles";

interface CipherPanelProps {
  puzzle: Puzzle | null;
  showHint: boolean;
}

export function CipherPanel({ puzzle, showHint }: CipherPanelProps) {
  if (!puzzle) return null;

  const getCipherIcon = (type: string) => {
    switch (type) {
      case "caesar":
        return "🔄";
      case "vigenere":
        return "🔑";
      case "substitution":
        return "🔀";
      case "base64":
        return "📊";
      case "leet":
        return "🔢";
      case "pattern":
        return "🧩";
      default:
        return "🔐";
    }
  };

  const getCipherName = (type: string) => {
    switch (type) {
      case "caesar":
        return "Caesar Cipher";
      case "vigenere":
        return "Vigenère Cipher";
      case "substitution":
        return "Substitution Cipher";
      case "base64":
        return "Base64 Encoding";
      case "leet":
        return "Leetspeak";
      case "pattern":
        return "Pattern Cipher";
      default:
        return "Unknown Cipher";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-500";
      case "medium":
        return "bg-orange-500";
      case "hard":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Card className="w-full bg-white text-emerald-600 border-emerald-200 shadow-xl">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-emerald-600 font-mono">
            <Lock className="w-5 h-5" />
            ENCRYPTED TARGET
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge
              className={`${getDifficultyColor(puzzle.difficulty)} text-white`}
            >
              {puzzle.difficulty.toUpperCase()}
            </Badge>
            <Badge
              variant="outline"
              className="font-mono text-emerald-600 border-emerald-300"
            >
              {getCipherIcon(puzzle.cipher)} {getCipherName(puzzle.cipher)}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Encrypted Text Display */}
        <div className="bg-slate-50 rounded-lg p-4 border border-emerald-200">
          <div className="text-emerald-600 text-xs font-mono mb-2 opacity-70">
            &gt; INTERCEPTED_DATA.enc
          </div>
          <div className="font-mono text-lg tracking-wider text-emerald-700 break-all">
            {puzzle.ciphertext}
          </div>
        </div>

        {/* Cipher Info */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-slate-50 rounded p-3 border border-emerald-200">
            <div className="text-emerald-600 font-mono text-xs">
              CIPHER TYPE
            </div>
            <div className="text-emerald-700 font-mono">
              {getCipherName(puzzle.cipher)}
            </div>
          </div>
          <div className="bg-slate-50 rounded p-3 border border-emerald-200">
            <div className="text-emerald-600 font-mono text-xs">DIFFICULTY</div>
            <div className="text-emerald-700 font-mono">
              {puzzle.difficulty.toUpperCase()}
            </div>
          </div>
        </div>

        {/* Hint Section */}
        <div className="bg-slate-50 rounded-lg p-4 border border-emerald-200">
          <div className="flex items-center gap-2 mb-2">
            {showHint ? (
              <Eye className="w-4 h-4 text-yellow-500" />
            ) : (
              <EyeOff className="w-4 h-4 text-slate-400" />
            )}
            <span className="text-emerald-600 font-mono text-xs">
              INTELLIGENCE BRIEF
            </span>
          </div>
          {showHint ? (
            <div className="text-yellow-600 font-mono text-sm">
              {puzzle.hint}
            </div>
          ) : (
            <div className="text-slate-500 font-mono text-sm italic">
              Hint available (H key) - WARNING: -25% score penalty
            </div>
          )}
        </div>

        {/* Status Indicators */}
        <div className="flex justify-between items-center text-xs font-mono">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-emerald-600">DECRYPTION ACTIVE</span>
          </div>
          <div className="text-emerald-600">
            LENGTH: {puzzle.ciphertext.length}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
