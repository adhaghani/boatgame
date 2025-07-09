import { useGameState } from "@/context/gameStateContext";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";

export function VisualModeToggle() {
  const { gameState, setVisualMode } = useGameState();
  const mode = gameState.visualMode || "visual";

  return (
    <Select value={mode} onValueChange={setVisualMode}>
      <SelectTrigger className="w-[160px]" aria-label="Visual Mode">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="visual">Visual – High Quality</SelectItem>
        <SelectItem value="performance">Performance – High Speed</SelectItem>
      </SelectContent>
    </Select>
  );
}
