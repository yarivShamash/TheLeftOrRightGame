import { useEffect, useMemo, useRef, useState } from "react";

import { GameBox } from "../../components/GameBox";

import { getObjectDirection, randomizeCoordinates } from "./utils";

export const Game = () => {
  const [gameBoxDimensions, setGameBoxDimensions] = useState<DOMRect>();

  const gameBoxCenterX = useMemo(() => {
    if (!gameBoxDimensions) return 0;
    return gameBoxDimensions.x + gameBoxDimensions.width / 2;
  }, [gameBoxDimensions]);

  const puckLocation = useMemo(
    () => randomizeCoordinates(gameBoxDimensions),
    [gameBoxDimensions]
  );

  const puckDirection = getObjectDirection(puckLocation, gameBoxCenterX);
  console.log("🚀 > Game >objectDirection:", puckDirection);

  const gameBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setGameBoxDimensions(gameBoxRef.current?.getBoundingClientRect());
  }, [gameBoxRef]);

  return (
    <>
      <h3>Left or Right?</h3>
      <GameBox ref={gameBoxRef} puckLocation={puckLocation} />
      {/* TODO:  <Toast here /> */}
    </>
  );
};
