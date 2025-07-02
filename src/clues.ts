import type { ShipAttribute } from "./types";

export function generateClues(ships: ShipAttribute[]): string[] {
  const clues: string[] = [];

  const find = (key: keyof ShipAttribute, value: string) =>
    ships.find((ship) => ship[key] === value);

  const shipAt = (pos: number) => ships.find((s) => s.position === pos);

  // Clue: Greek ship info
  const greek = find("nationality", "Greek");
  if (greek)
    clues.push(
      `The Greek ship leaves at ${
        greek.departureTime
      } and carries ${greek.cargo.toLowerCase()}.`
    );

  // Clue: Middle ship chimney
  const middle = shipAt(3);
  if (middle)
    clues.push(
      `The ship in the middle has a ${middle.chimneyColor.toLowerCase()} chimney.`
    );

  // Clue: English ship departure
  const english = find("nationality", "English");
  if (english)
    clues.push(`The English ship leaves at ${english.departureTime}.`);

  // Clue: Red chimney destination
  const red = find("chimneyColor", "Red");
  if (red)
    clues.push(`The ship with a red chimney goes to ${red.destination}.`);

  // Clue: Cocoa right of Marseille
  const cocoa = find("cargo", "Cocoa");
  const marseille = find("destination", "Marseille");
  if (
    cocoa &&
    marseille &&
    cocoa.position < 5 &&
    marseille.position === cocoa.position + 1
  )
    clues.push(
      `To the right of the ship carrying cocoa is a ship going to Marseille.`
    );

  // Clue: French is to the left of coffee
  const french = find("nationality", "French");
  const coffee = find("cargo", "Coffee");
  if (french && coffee && french.position === coffee.position - 1)
    clues.push(
      `The French ship with ${french.chimneyColor.toLowerCase()} chimney is to the left of a ship that carries coffee.`
    );

  // Clue: Brazilian ship destination
  const brazilian = find("nationality", "Brazilian");
  if (brazilian)
    clues.push(`The Brazilian ship is heading for ${brazilian.destination}.`);

  // Clue: Genoa leaves at X
  const genoa = find("destination", "Genoa");
  if (genoa)
    clues.push(`A ship going to Genoa leaves at ${genoa.departureTime}.`);

  // Clue: Spanish after Marseille
  const spanish = find("nationality", "Spanish");
  if (spanish && marseille && spanish.position > marseille.position)
    clues.push(
      `The Spanish ship leaves at ${spanish.departureTime} and is to the right of the ship going to Marseille.`
    );

  // Clue: Next to ship carrying rice is ship with green chimney
  const rice = find("cargo", "Rice");
  const green = find("chimneyColor", "Green");
  if (rice && green && Math.abs(rice.position - green.position) === 1)
    clues.push(
      `Next to the ship carrying rice is a ship with a green chimney.`
    );

  // Clue: Ship on the border carries corn
  const border = ships.find((s) => s.position === 1 || s.position === 5);
  if (border)
    clues.push(`The ship on the border carries ${border.cargo.toLowerCase()}.`);

  // Clue: Black chimney leaves at X
  const black = find("chimneyColor", "Black");
  if (black)
    clues.push(
      `The ship with a black chimney leaves at ${black.departureTime}.`
    );

  // Clue: Hamburg leaves at X
  const hamburg = find("destination", "Hamburg");
  if (hamburg)
    clues.push(`The ship to Hamburg leaves at ${hamburg.departureTime}.`);

  // Clue: Corn and rice next to each other
  const corn = find("cargo", "Corn");
  if (corn && rice && Math.abs(corn.position - rice.position) === 1)
    clues.push(
      `The ship carrying corn is anchored next to the ship carrying rice.`
    );

  // Clue: Next to ship leaving at 7 is a white chimney
  const dep7 = find("departureTime", "7");
  const white = find("chimneyColor", "White");
  if (dep7 && white && Math.abs(dep7.position - white.position) === 1)
    clues.push(
      `Next to the ship leaving at seven is a ship with a white chimney.`
    );

  return clues.slice(0, 15); // Limit to 15
}
