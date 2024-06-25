export type Coordinates = { x: number; y: number };
export type PuckDirection = "left" | "right" | "unassigned";
export type UserInteractionResult =
  | { text: "Right Key"; success: true }
  | { text: "Too Soon"; success: false }
  | { text: "Wrong Key"; success: false }
  | { text: "Too Late"; success: false };
