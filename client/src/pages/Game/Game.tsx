import { useEffect, useMemo, useRef, useState } from "react";

import { GameBox } from "../../components/GameBox";

import { getPuckDirection, randomizeCoordinates } from "./utils";
import { KEY_TO_DIRECTION, USER_INTERACTIONS } from "./consts";
import { PuckDirection, Coordinates } from "./types";

const initialPuckLocation = { x: 0, y: 0 };

export const Game = () => {
  const [gameBoxDimensions, setGameBoxDimensions] = useState<DOMRect>();
  const [puckLocation, setPuckLocation] =
    useState<Coordinates>(initialPuckLocation);

  const [puckDirection, setPuckDirection] =
    useState<PuckDirection>("unassigned");

  const gameBoxRef = useRef<HTMLDivElement>(null);

  const gameBoxCenterX = useMemo(() => {
    if (!gameBoxDimensions) return 0;
    return gameBoxDimensions.x + gameBoxDimensions.width / 2;
  }, [gameBoxDimensions]);

  useEffect(() => {
    if (!puckLocation.x || !gameBoxCenterX) return;
    const calculatedPuckDirection = getPuckDirection(
      puckLocation,
      gameBoxCenterX
    );

    setPuckDirection(calculatedPuckDirection);
  }, [puckLocation, gameBoxCenterX]);

  useEffect(() => {
    if (!gameBoxDimensions) setPuckLocation(initialPuckLocation);
    if (puckLocation.x && puckLocation.y) {
      setPuckLocation({ x: puckLocation.x, y: puckLocation.y });
    } else {
      setPuckLocation(randomizeCoordinates(gameBoxDimensions));
    }
  }, [gameBoxDimensions, puckLocation.x, puckLocation.y]);

  useEffect(() => {
    setGameBoxDimensions(gameBoxRef.current?.getBoundingClientRect());
  }, [gameBoxRef]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (KEY_TO_DIRECTION[event.key] === puckDirection) {
        console.log(USER_INTERACTIONS["Right Key"]);
      }
      if (KEY_TO_DIRECTION[event.key] !== puckDirection) {
        console.log(USER_INTERACTIONS["Wrong Key"]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [puckDirection]);

  return (
    <>
      <h3>Left or Right?</h3>
      <GameBox ref={gameBoxRef} puckLocation={puckLocation} />
      {/* TODO:  <Toast here /> */}
    </>
  );
};

/**
 * Understand why the puck direction doesn't work :/
 *
 *
 * UI:
 * Toast
 */
