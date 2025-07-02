import React, { createContext, useContext, useEffect, useState } from "react";

import type { Difficulty, ShipAttribute, GameState, GameStatus } from "@/types";

const LOCAL_STORAGE_KEY = "game_state";

const defaultState: GameState = {
  username: "",
  difficulty: "easy",
  gameStatus: "not_started",
  timeTaken: 0,
  userAnswer: [],
  solution: [],
  clues: []
};

interface GameStateContextType {
  gameState: GameState;
  updateState: (updates: Partial<GameState>) => void;
  resetGame: () => void;
}

const GameStateContext = createContext<GameStateContextType | undefined>(
  undefined
);

export const GameStateProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [gameState, setGameState] = useState<GameState>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved) : defaultState;
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(gameState));
  }, [gameState]);

  const updateState = (updates: Partial<GameState>) => {
    setGameState((prev) => ({ ...prev, ...updates }));
  };

  const resetGame = () => {
    setGameState(defaultState);
  };

  return (
    <GameStateContext.Provider value={{ gameState, updateState, resetGame }}>
      {children}
    </GameStateContext.Provider>
  );
};

export const useGameState = (): GameStateContextType => {
  const context = useContext(GameStateContext);
  if (!context) {
    throw new Error("useGameState must be used within GameStateProvider");
  }
  return context;
};
