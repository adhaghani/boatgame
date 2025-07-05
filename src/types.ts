export type ShipAttribute = {
  position: number;
  nationality: string;
  departureTime: string;
  cargo: string;
  chimneyColor: string;
  destination: string;
};

export type AttributeSet = {
  nationality: string[];
  departureTime: string[];
  cargo: string[];
  chimneyColor: string[];
  destination: string[];
};

export const ATTRIBUTE: AttributeSet = {
  nationality: ["Greek", "English", "French", "Brazilian", "Spanish"],
  departureTime: ["5", "6", "7", "8", "9"],
  cargo: ["Coffee", "Cocoa", "Rice", "Corn", "Tea"],
  chimneyColor: ["Black", "Blue", "Green", "Red", "White"],
  destination: ["Marseille", "Manila", "Genoa", "Hamburg", "Port Said"]
};

export type Difficulty = "easy" | "medium" | "hard";

export interface attempt {
  username: string;
  timestamp: string;
  difficulty: Difficulty;
  timeTaken: number;
  success: boolean;
  solution: ShipAttribute[];
  userAnswer: ShipAttribute[];
  incorrectAttributes: IncorrectAttribute[];
}

export interface IncorrectAttribute {
  position: number;
  attribute: keyof ShipAttribute;
  expected: string;
  actual: string;
}

export type SubmitResult = {
  success: boolean;
  incorrectAttributes: IncorrectAttribute[];
};

export type GameStatus = "not_started" | "in_progress" | "completed";

export interface GameState {
  username: string;
  difficulty: Difficulty;
  gameStatus: GameStatus;
  timeTaken: number;
  startTime: string;
  userAnswer: ShipAttribute[];
  solution: ShipAttribute[];
  clues: string[];
}
