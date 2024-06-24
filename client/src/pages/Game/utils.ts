import { PUCK_DIMENSIONS } from "./consts";

export const randomizeCoordinates = (gameBoxDimensions?: DOMRect) => {
  if (!gameBoxDimensions) return { x: 0, y: 0 };

  const maxX = gameBoxDimensions.width - PUCK_DIMENSIONS;
  const maxY = gameBoxDimensions.height - PUCK_DIMENSIONS;

  return {
    x: Math.random() * maxX,
    y: Math.random() * maxY,
  };
};

export const getObjectDirection = (
  gameObjectLocation: { x: number; y: number },
  gameBoxCenterX: number
) => {
  if (gameObjectLocation.x < gameBoxCenterX) return "left";
  if (gameObjectLocation.x > gameBoxCenterX) return "right";
};
