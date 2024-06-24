import { useEffect, useMemo, useRef, useState } from "react";

import { GameBox } from "../../components/GameBox";

import { getPuckDirection, randomizeCoordinates } from "./utils";
import { KEY_TO_DIRECTION, USER_INTERACTIONS } from "./consts";

export const Game = () => {
  const [gameBoxDimensions, setGameBoxDimensions] = useState<DOMRect>();

  const gameBoxCenterX = useMemo(() => {
    if (!gameBoxDimensions) return 0;
    return gameBoxDimensions.x + gameBoxDimensions.width / 2;
  }, [gameBoxDimensions]);

  const puckLocation = useMemo(() => {
    return randomizeCoordinates(gameBoxDimensions);
  }, [gameBoxDimensions]);

  const puckDirection = getPuckDirection(puckLocation, gameBoxCenterX);

  const gameBoxRef = useRef<HTMLDivElement>(null);

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
  }, []);

  return (
    <>
      <h3>Left or Right?</h3>
      <GameBox ref={gameBoxRef} puckLocation={puckLocation} />
      {/* TODO:  <Toast here /> */}
    </>
  );
};
