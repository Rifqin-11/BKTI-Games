"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  XCircle,
  HelpCircle,
  SkipForward,
  Keyboard,
} from "lucide-react";

interface GuessFormProps {
  guess: string;
  onGuessChange: (guess: string) => void;
  onSubmit: () => void;
  onHint: () => void;
  onSkip: () => void;
  disabled?: boolean;
  showResult?: "correct" | "incorrect" | null;
}

export function GuessForm({
  guess,
  onGuessChange,
  onSubmit,
  onHint,
  onSkip,
  disabled = false,
  showResult = null,
}: GuessFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (disabled) return;

      switch (e.key.toLowerCase()) {
        case "enter":
          e.preventDefault();
          if (!guess.trim() || disabled || isSubmitting) return;
          setIsSubmitting(true);
          onSubmit();
          setTimeout(() => setIsSubmitting(false), 1000);
          break;
        case "h":
          if (e.target === document.body) {
            e.preventDefault();
            onHint();
          }
          break;
        case "s":
          if (e.target === document.body) {
            e.preventDefault();
            onSkip();
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [disabled, onHint, onSkip, onSubmit, guess, isSubmitting]);

  const handleSubmit = async () => {
    if (!guess.trim() || disabled || isSubmitting) return;

    setIsSubmitting(true);
    onSubmit();

    // Reset after animation
    setTimeout(() => {
      setIsSubmitting(false);
    }, 1000);
  };

  const getResultIcon = () => {
    switch (showResult) {
      case "correct":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "incorrect":
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getButtonColor = () => {
    switch (showResult) {
      case "correct":
        return "bg-green-600 hover:bg-green-700";
      case "incorrect":
        return "bg-red-600 hover:bg-red-700";
      default:
        return "bg-emerald-600 hover:bg-emerald-700";
    }
  };

  return (
    <Card className="w-full bg-white border-emerald-200">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Input Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-emerald-600 font-mono text-sm font-medium">
                DECRYPTION INPUT
              </label>
              {showResult && (
                <div className="flex items-center gap-2">
                  {getResultIcon()}
                  <span
                    className={`text-sm font-mono ${
                      showResult === "correct"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {showResult === "correct"
                      ? "ACCESS GRANTED"
                      : "ACCESS DENIED"}
                  </span>
                </div>
              )}
            </div>

            <div className="relative">
              <Input
                value={guess}
                onChange={(e) => onGuessChange(e.target.value.toUpperCase())}
                placeholder="Enter decrypted password..."
                className="font-mono text-lg bg-slate-50 border-emerald-300 text-emerald-700 placeholder-emerald-400 focus:border-emerald-500 focus:ring-emerald-200"
                disabled={disabled}
                autoFocus
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <Keyboard className="w-4 h-4 text-emerald-400" />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={handleSubmit}
              disabled={!guess.trim() || disabled || isSubmitting}
              className={`flex-1 font-mono ${getButtonColor()} text-white`}
              size="lg"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  CHECKING...
                </div>
              ) : (
                <>
                  {getResultIcon() || <CheckCircle className="w-5 h-5" />}
                  DECRYPT
                </>
              )}
            </Button>

            <Button
              onClick={onHint}
              disabled={disabled}
              variant="outline"
              size="lg"
              className="border-yellow-400 text-yellow-600 hover:bg-yellow-50"
            >
              <HelpCircle className="w-5 h-5" />
            </Button>

            <Button
              onClick={onSkip}
              disabled={disabled}
              variant="outline"
              size="lg"
              className="border-slate-300 text-slate-600 hover:bg-slate-50"
            >
              <SkipForward className="w-5 h-5" />
            </Button>
          </div>

          {/* Keyboard Shortcuts */}
          <div className="flex justify-center gap-6 text-xs text-emerald-500 font-mono">
            <div className="flex items-center gap-1">
              <Badge
                variant="outline"
                className="text-xs px-1 py-0 border-emerald-300"
              >
                ENTER
              </Badge>
              <span>Submit</span>
            </div>
            <div className="flex items-center gap-1">
              <Badge
                variant="outline"
                className="text-xs px-1 py-0 border-yellow-300"
              >
                H
              </Badge>
              <span>Hint</span>
            </div>
            <div className="flex items-center gap-1">
              <Badge
                variant="outline"
                className="text-xs px-1 py-0 border-slate-300"
              >
                S
              </Badge>
              <span>Skip</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
