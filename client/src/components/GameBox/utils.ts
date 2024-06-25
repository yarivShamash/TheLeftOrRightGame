import { PUCK_DIMENSIONS } from "../../components/GameBox/consts";
import { Coordinates, PuckDirection } from "./types";

export const randomizeCoordinates = (
  gameBoxDimensions?: DOMRect
): Coordinates => {
  if (!gameBoxDimensions) return { x: 0, y: 0 };

  const maxX = gameBoxDimensions.width - PUCK_DIMENSIONS;
  const maxY = gameBoxDimensions.height - PUCK_DIMENSIONS;

  return {
    x: Math.random() * maxX,
    y: Math.random() * maxY,
  };
};

export const getPuckDirection = (
  puckLocation: Coordinates,
  gameBoxCenterX: number
): PuckDirection => {
  const puckCenterX = puckLocation.x + PUCK_DIMENSIONS / 2;

  if (puckCenterX <= gameBoxCenterX) return "left";
  if (puckCenterX > gameBoxCenterX) return "right";
  return "unassigned";
};
