'use client';

import React, { createContext, useContext, useReducer, useCallback } from 'react';

export type Difficulty = 'beginner' | 'intermediate' | 'advanced';
export type PuzzleStatus = 'pending' | 'solved' | 'failed';

export interface GameStats {
  score: number;
  lives: number;
  streak: number;
  currentPuzzleIndex: number;
  puzzlesSolved: number;
  totalTime: number;
  fastestSolve: number | null;
  accuracy: number;
  hintsUsed: number;
}

export interface GameState {
  difficulty: Difficulty;
  isPlaying: boolean;
  isPaused: boolean;
  timeLeft: number;
  stats: GameStats;
  currentPuzzleId: string | null;
  gameStartTime: number | null;
  puzzleStartTime: number | null;
}

type GameAction = 
  | { type: 'SET_DIFFICULTY'; payload: Difficulty }
  | { type: 'START_GAME' }
  | { type: 'END_GAME' }
  | { type: 'PAUSE_GAME' }
  | { type: 'RESUME_GAME' }
  | { type: 'SET_TIME'; payload: number }
  | { type: 'START_PUZZLE'; payload: string }
  | { type: 'SOLVE_PUZZLE'; payload: { timeSpent: number; hintsUsed: boolean } }
  | { type: 'FAIL_PUZZLE' }
  | { type: 'USE_HINT' }
  | { type: 'RESET_GAME' };

const initialStats: GameStats = {
  score: 0,
  lives: 3,
  streak: 0,
  currentPuzzleIndex: 0,
  puzzlesSolved: 0,
  totalTime: 0,
  fastestSolve: null,
  accuracy: 100,
  hintsUsed: 0,
};

const initialState: GameState = {
  difficulty: 'beginner',
  isPlaying: false,
  isPaused: false,
  timeLeft: 90,
  stats: initialStats,
  currentPuzzleId: null,
  gameStartTime: null,
  puzzleStartTime: null,
};

const difficultySettings = {
  beginner: { timeLimit: 90, basePoints: 100, multiplier: 1 },
  intermediate: { timeLimit: 60, basePoints: 150, multiplier: 1.5 },
  advanced: { timeLimit: 45, basePoints: 200, multiplier: 2 },
};

function calculateScore(
  timeSpent: number, 
  timeLimit: number, 
  basePoints: number, 
  multiplier: number, 
  streak: number, 
  hintsUsed: boolean
): number {
  const timeBonus = Math.max(0, timeLimit - timeSpent) / timeLimit;
  const streakMultiplier = Math.min(2, 1 + (streak * 0.25));
  const hintPenalty = hintsUsed ? 0.7 : 1;
  
  return Math.round(basePoints * multiplier * (1 + timeBonus) * streakMultiplier * hintPenalty);
}

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'SET_DIFFICULTY':
      return {
        ...state,
        difficulty: action.payload,
        timeLeft: difficultySettings[action.payload].timeLimit,
      };
      
    case 'START_GAME':
      return {
        ...state,
        isPlaying: true,
        isPaused: false,
        gameStartTime: Date.now(),
        stats: { ...initialStats },
      };
      
    case 'END_GAME':
      return {
        ...state,
        isPlaying: false,
        isPaused: false,
      };
      
    case 'PAUSE_GAME':
      return {
        ...state,
        isPaused: true,
      };
      
    case 'RESUME_GAME':
      return {
        ...state,
        isPaused: false,
      };
      
    case 'SET_TIME':
      return {
        ...state,
        timeLeft: action.payload,
      };
      
    case 'START_PUZZLE':
      return {
        ...state,
        currentPuzzleId: action.payload,
        puzzleStartTime: Date.now(),
        timeLeft: difficultySettings[state.difficulty].timeLimit,
      };
      
    case 'SOLVE_PUZZLE':
      const settings = difficultySettings[state.difficulty];
      const timeSpent = action.payload.timeSpent;
      const points = calculateScore(
        timeSpent,
        settings.timeLimit,
        settings.basePoints,
        settings.multiplier,
        state.stats.streak,
        action.payload.hintsUsed
      );
      
      const newStreak = state.stats.streak + 1;
      const newFastest = state.stats.fastestSolve === null 
        ? timeSpent 
        : Math.min(state.stats.fastestSolve, timeSpent);
      
      return {
        ...state,
        stats: {
          ...state.stats,
          score: state.stats.score + points,
          streak: newStreak,
          currentPuzzleIndex: state.stats.currentPuzzleIndex + 1,
          puzzlesSolved: state.stats.puzzlesSolved + 1,
          totalTime: state.stats.totalTime + timeSpent,
          fastestSolve: newFastest,
          accuracy: Math.round((state.stats.puzzlesSolved + 1) / (state.stats.currentPuzzleIndex + 1) * 100),
        },
      };
      
    case 'FAIL_PUZZLE':
      return {
        ...state,
        stats: {
          ...state.stats,
          lives: Math.max(0, state.stats.lives - 1),
          streak: 0,
          currentPuzzleIndex: state.stats.currentPuzzleIndex + 1,
          accuracy: Math.round(state.stats.puzzlesSolved / (state.stats.currentPuzzleIndex + 1) * 100),
        },
      };
      
    case 'USE_HINT':
      return {
        ...state,
        stats: {
          ...state.stats,
          hintsUsed: state.stats.hintsUsed + 1,
        },
      };
      
    case 'RESET_GAME':
      return {
        ...initialState,
        difficulty: state.difficulty,
        timeLeft: difficultySettings[state.difficulty].timeLimit,
      };
      
    default:
      return state;
  }
}

interface GameContextType {
  state: GameState;
  setDifficulty: (difficulty: Difficulty) => void;
  startGame: () => void;
  endGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  setTime: (time: number) => void;
  startPuzzle: (puzzleId: string) => void;
  solvePuzzle: (timeSpent: number, hintsUsed: boolean) => void;
  failPuzzle: () => void;
  useHint: () => void;
  resetGame: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const setDifficulty = useCallback((difficulty: Difficulty) => {
    dispatch({ type: 'SET_DIFFICULTY', payload: difficulty });
  }, []);

  const startGame = useCallback(() => {
    dispatch({ type: 'START_GAME' });
  }, []);

  const endGame = useCallback(() => {
    dispatch({ type: 'END_GAME' });
  }, []);

  const pauseGame = useCallback(() => {
    dispatch({ type: 'PAUSE_GAME' });
  }, []);

  const resumeGame = useCallback(() => {
    dispatch({ type: 'RESUME_GAME' });
  }, []);

  const setTime = useCallback((time: number) => {
    dispatch({ type: 'SET_TIME', payload: time });
  }, []);

  const startPuzzle = useCallback((puzzleId: string) => {
    dispatch({ type: 'START_PUZZLE', payload: puzzleId });
  }, []);

  const solvePuzzle = useCallback((timeSpent: number, hintsUsed: boolean) => {
    dispatch({ type: 'SOLVE_PUZZLE', payload: { timeSpent, hintsUsed } });
  }, []);

  const failPuzzle = useCallback(() => {
    dispatch({ type: 'FAIL_PUZZLE' });
  }, []);

  const useHint = useCallback(() => {
    dispatch({ type: 'USE_HINT' });
  }, []);

  const resetGame = useCallback(() => {
    dispatch({ type: 'RESET_GAME' });
  }, []);

  return (
    <GameContext.Provider value={{
      state,
      setDifficulty,
      startGame,
      endGame,
      pauseGame,
      resumeGame,
      setTime,
      startPuzzle,
      solvePuzzle,
      failPuzzle,
      useHint,
      resetGame,
    }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}