export const PUCK_DIMENSIONS = 200;
export const INITIAL_PUCK_POSITION = { x: 0, y: 0 };

export const GAME_START_AFTER = { min: 2_000, max: 5_000 };

export const KEY_TO_DIRECTION: Record<string, "left" | "right"> = {
  a: "left",
  l: "right",
};
