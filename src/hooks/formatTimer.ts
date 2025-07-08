export function formatTime(seconds: number): { min: number; sec: number } {
  const min = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const sec = (seconds % 60).toString().padStart(2, "0");
  const minNum = Number(min);
  const secNum = Number(sec);
  return { min: minNum, sec: secNum };
}
