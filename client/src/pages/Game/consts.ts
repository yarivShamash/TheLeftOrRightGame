export const PUCK_DIMENSIONS = 200;

export const KEY_TO_DIRECTION: Record<string, "left" | "right"> = {
  a: "left",
  l: "right",
};

export const USER_INTERACTIONS: Record<string, "fail" | "success"> = {
  ["Too Soon"]: "fail",
  ["Wrong Key"]: "fail",
  ["Too Late"]: "fail",
  ["Right Key"]: "success",
};
