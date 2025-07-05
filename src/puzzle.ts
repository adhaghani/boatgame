import { generateShips } from "./generator";
import { generateClues } from "./clues";
import type {
  ShipAttribute,
  Difficulty,
  SubmitResult,
  IncorrectAttribute,
  attempt
} from "./types";
import { shuffleArray } from "./util";
import { saveAttempt } from "./constants";

export interface Puzzle {
  solution: ShipAttribute[];
  clues: string[];
  difficulty: string;
}

export function generatePuzzle(difficulty: Difficulty): Puzzle {
  const solution = generateShips();
  const rawClues = generateClues(solution);

  const clueCount = {
    easy: 20,
    medium: 10,
    hard: 8
  }[difficulty];

  const clues = shuffleArray(rawClues).slice(0, clueCount);

  return { solution, clues, difficulty };
}

export function submitAnswer(params: {
  userAnswer: ShipAttribute[];
  solution: ShipAttribute[];
  difficulty: Difficulty;
  username: string;
  timeTaken: number;
}): SubmitResult {
  const { userAnswer, solution, difficulty, timeTaken, username } = params;

  const incorrectAttributes: IncorrectAttribute[] = [];

  for (let i = 0; i < 5; i++) {
    const userShip = userAnswer.find((s) => s.position === i + 1);
    const solutionShip = solution.find((s) => s.position === i + 1);

    if (!userShip || !solutionShip) continue;

    (
      [
        "nationality",
        "departureTime",
        "cargo",
        "chimneyColor",
        "destination"
      ] as const
    ).forEach((attr) => {
      if (userShip[attr] !== solutionShip[attr]) {
        incorrectAttributes.push({
          position: i + 1,
          attribute: attr,
          expected: solutionShip[attr],
          actual: userShip[attr]
        });
      }
    });
  }

  const success = incorrectAttributes.length === 0;

  // Save to localStorage
  const attempt: attempt = {
    username,
    timestamp: new Date().toISOString(),
    difficulty,
    timeTaken,
    success,
    solution,
    userAnswer,
    incorrectAttributes
  };

  if (timeTaken < 60) {
  } else {
    saveAttempt(attempt);
  }

  return { success, incorrectAttributes };
}
