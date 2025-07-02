import type { ShipAttribute } from "./types";
import { ATTRIBUTE } from "./types";
import { shuffleArray } from "./util";

export function generateShips(): ShipAttribute[] {
  const ships: ShipAttribute[] = [];
  const positions = [1, 2, 3, 4, 5];

  const shuffledAttributes: Record<keyof typeof ATTRIBUTE, string[]> = {
    nationality: shuffleArray(ATTRIBUTE.nationality),
    departureTime: shuffleArray(ATTRIBUTE.departureTime),
    cargo: shuffleArray(ATTRIBUTE.cargo),
    chimneyColor: shuffleArray(ATTRIBUTE.chimneyColor),
    destination: shuffleArray(ATTRIBUTE.destination)
  };

  for (let i = 0; i < 5; i++) {
    ships.push({
      position: positions[i],
      nationality: shuffledAttributes.nationality[i],
      departureTime: shuffledAttributes.departureTime[i],
      cargo: shuffledAttributes.cargo[i],
      chimneyColor: shuffledAttributes.chimneyColor[i],
      destination: shuffledAttributes.destination[i]
    });
  }

  return ships;
}
