import type { attempt } from "./types";

const STORAGE_KEY = "puzzle_attempts";

export function saveAttempt(attempt: attempt) {
  const attempts = getPastAttempts();
  attempts.push(attempt);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(attempts));
}

export function getPastAttempts(): attempt[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function clearPastAttempts() {
  localStorage.removeItem(STORAGE_KEY);
}
