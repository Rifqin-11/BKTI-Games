"use client";

import React, { createContext, useContext, useReducer, useEffect } from "react";
import { Puzzle } from "../puzzles";

export type Difficulty = "easy" | "medium" | "hard";

export interface GameScore {
  score: number;
  streak: number;
  puzzlesSolved: number;
  timeRemaining: number;
  difficulty: Difficulty;
  date: number;
}

export interface GameState {
  // Game settings
  difficulty: Difficulty;
  isPlaying: boolean;
  isPaused: boolean;
  gameId: string;

  // Current puzzle
  currentPuzzle: Puzzle | null;
  currentPuzzleIndex: number;
  puzzleQueue: Puzzle[];

  // Player input
  playerGuess: string;
  showHint: boolean;

  // Scoring
  score: number;
  streak: number;
  puzzlesSolved: number;
  lives: number;

  // Timer
  timeRemaining: number;
  totalTime: number;

  // UI state
  showAlphabet: boolean;
  showFrequencyChart: boolean;
  accessLogs: string[];

  // Game results
  finalScore: number;
  isGameComplete: boolean;
}

type GameAction =
  | { type: "SET_DIFFICULTY"; payload: Difficulty }
  | { type: "START_GAME"; payload: { puzzles: Puzzle[]; gameId: string } }
  | { type: "PAUSE_GAME" }
  | { type: "RESUME_GAME" }
  | { type: "END_GAME" }
  | { type: "NEXT_PUZZLE" }
  | { type: "SET_GUESS"; payload: string }
  | { type: "SHOW_HINT" }
  | { type: "SKIP_PUZZLE" }
  | { type: "CORRECT_ANSWER"; payload: { timeBonus: number } }
  | { type: "WRONG_ANSWER" }
  | { type: "TICK_TIMER" }
  | { type: "TOGGLE_ALPHABET" }
  | { type: "TOGGLE_FREQUENCY_CHART" }
  | { type: "ADD_ACCESS_LOG"; payload: string }
  | { type: "RESET_GAME" };

const initialState: GameState = {
  difficulty: "easy",
  isPlaying: false,
  isPaused: false,
  gameId: "",
  currentPuzzle: null,
  currentPuzzleIndex: 0,
  puzzleQueue: [],
  playerGuess: "",
  showHint: false,
  score: 0,
  streak: 0,
  puzzlesSolved: 0,
  lives: 3,
  timeRemaining: 0,
  totalTime: 0,
  showAlphabet: false,
  showFrequencyChart: false,
  accessLogs: [],
  finalScore: 0,
  isGameComplete: false,
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "SET_DIFFICULTY":
      return {
        ...state,
        difficulty: action.payload,
      };

    case "START_GAME":
      const firstPuzzle = action.payload.puzzles[0];
      console.log("Starting game with first puzzle:", firstPuzzle);
      return {
        ...state,
        isPlaying: true,
        isPaused: false,
        gameId: action.payload.gameId,
        puzzleQueue: action.payload.puzzles,
        currentPuzzle: firstPuzzle,
        currentPuzzleIndex: 0,
        timeRemaining: firstPuzzle?.timeLimit || 60,
        totalTime: firstPuzzle?.timeLimit || 60,
        score: 0,
        streak: 0,
        puzzlesSolved: 0,
        lives: 3,
        playerGuess: "",
        showHint: false,
        accessLogs: [
          "> System initialized",
          "> Intrusion detected",
          "> Analyzing cipher...",
        ],
        isGameComplete: false,
      };

    case "PAUSE_GAME":
      return {
        ...state,
        isPaused: true,
      };

    case "RESUME_GAME":
      return {
        ...state,
        isPaused: false,
      };

    case "END_GAME":
      return {
        ...state,
        isPlaying: false,
        isPaused: false,
        finalScore: state.score,
        isGameComplete: true,
      };

    case "NEXT_PUZZLE":
      const nextIndex = state.currentPuzzleIndex + 1;
      const nextPuzzle = state.puzzleQueue[nextIndex];

      if (!nextPuzzle) {
        return {
          ...state,
          isPlaying: false,
          isGameComplete: true,
          finalScore: state.score,
        };
      }

      return {
        ...state,
        currentPuzzle: nextPuzzle,
        currentPuzzleIndex: nextIndex,
        timeRemaining: nextPuzzle.timeLimit,
        totalTime: nextPuzzle.timeLimit,
        playerGuess: "",
        showHint: false,
        accessLogs: [
          ...state.accessLogs.slice(-2),
          `> Loading puzzle ${nextIndex + 1}...`,
          "> Cipher pattern detected",
        ],
      };

    case "SET_GUESS":
      return {
        ...state,
        playerGuess: action.payload,
      };

    case "SHOW_HINT":
      return {
        ...state,
        showHint: true,
        accessLogs: [
          ...state.accessLogs,
          "> Hint accessed (-25% score penalty)",
        ],
      };

    case "SKIP_PUZZLE":
      return {
        ...state,
        accessLogs: [
          ...state.accessLogs,
          "> Puzzle skipped (0 points awarded)",
        ],
      };

    case "CORRECT_ANSWER":
      const basePoints = {
        easy: 100,
        medium: 200,
        hard: 300,
      }[state.difficulty];

      const timeBonus = action.payload.timeBonus;
      const hintPenalty = state.showHint ? 0.75 : 1; // 25% reduction for hint
      const streakMultiplier = Math.floor(state.streak / 3) * 0.1 + 1; // 10% bonus per 3 streak

      const puzzleScore = Math.round(
        basePoints * timeBonus * hintPenalty * streakMultiplier
      );

      return {
        ...state,
        score: state.score + puzzleScore,
        streak: state.streak + 1,
        puzzlesSolved: state.puzzlesSolved + 1,
        accessLogs: [
          ...state.accessLogs,
          `> Access granted! +${puzzleScore} points`,
          `> Streak: ${state.streak + 1}`,
        ],
      };

    case "WRONG_ANSWER":
      const newLives = state.lives - 1;
      const penaltyTime = Math.max(0, state.timeRemaining - 5); // 5 second penalty

      return {
        ...state,
        lives: newLives,
        streak: 0, // Reset streak on wrong answer
        timeRemaining: penaltyTime,
        accessLogs: [
          ...state.accessLogs,
          "> Access denied (-5 seconds, -1 life)",
          "> Streak reset",
        ],
      };

    case "TICK_TIMER":
      const newTime = Math.max(0, state.timeRemaining - 1);
      const newLogs = [...state.accessLogs];

      // Add flavor logs occasionally
      if (newTime > 0 && Math.random() < 0.05) {
        const flavorLogs = [
          "> Brute force blocked",
          "> Salt detected",
          "> Scanning for vulnerabilities...",
          "> Encryption strength: HIGH",
          "> Attempting dictionary attack...",
          "> Firewall alert triggered",
        ];
        newLogs.push(flavorLogs[Math.floor(Math.random() * flavorLogs.length)]);
      }

      return {
        ...state,
        timeRemaining: newTime,
        accessLogs: newLogs.slice(-10), // Keep only last 10 logs
      };

    case "TOGGLE_ALPHABET":
      return {
        ...state,
        showAlphabet: !state.showAlphabet,
      };

    case "TOGGLE_FREQUENCY_CHART":
      return {
        ...state,
        showFrequencyChart: !state.showFrequencyChart,
      };

    case "ADD_ACCESS_LOG":
      return {
        ...state,
        accessLogs: [...state.accessLogs.slice(-9), action.payload],
      };

    case "RESET_GAME":
      return initialState;

    default:
      return state;
  }
}

const GameContext = createContext<{
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
} | null>(null);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // Load saved preferences
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedDifficulty = localStorage.getItem(
        "hack-password-difficulty"
      ) as Difficulty;
      if (savedDifficulty) {
        dispatch({ type: "SET_DIFFICULTY", payload: savedDifficulty });
      }
    }
  }, []);

  // Save preferences
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("hack-password-difficulty", state.difficulty);
    }
  }, [state.difficulty]);

  // Save high scores
  useEffect(() => {
    if (state.isGameComplete && state.finalScore > 0) {
      const gameScore: GameScore = {
        score: state.finalScore,
        streak: state.streak,
        puzzlesSolved: state.puzzlesSolved,
        timeRemaining: state.timeRemaining,
        difficulty: state.difficulty,
        date: Date.now(),
      };

      if (typeof window !== "undefined") {
        const existingScores = JSON.parse(
          localStorage.getItem("hack-password-scores") || "[]"
        ) as GameScore[];

        const updatedScores = [...existingScores, gameScore]
          .sort((a, b) => b.score - a.score)
          .slice(0, 10); // Keep top 10

        localStorage.setItem(
          "hack-password-scores",
          JSON.stringify(updatedScores)
        );
      }
    }
  }, [
    state.isGameComplete,
    state.finalScore,
    state.streak,
    state.puzzlesSolved,
    state.timeRemaining,
    state.difficulty,
  ]);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
}
