import { useEffect, useMemo, useRef, useState } from "react";
import { useTimeoutFn } from "react-use";

import { GameBox } from "../../components/GameBox";
import { WaitingScreen } from "../../components/WaitingScreen";

import {
  GAME_START_AFTER,
  INITIAL_PUCK_POSITION,
  KEY_TO_DIRECTION,
} from "./consts";
import { GameArea, GameContainer, GameTitle } from "./styles";
import { Coordinates, PuckDirection, UserInteractionResult } from "./types";
import { getPuckDirection, randomizeCoordinates } from "./utils";

export const Game = () => {
  const [startGame, setStartGame] = useState(false);
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [gameBoxDimensions, setGameBoxDimensions] = useState<DOMRect>();
  const [puckPosition, setPuckPosition] = useState<Coordinates>(
    INITIAL_PUCK_POSITION
  );
  const [puckDirection, setPuckDirection] =
    useState<PuckDirection>("unassigned");
  const [userInteractionResult, setUserInteractionResult] =
    useState<UserInteractionResult | null>(null);

  const gameBoxRef = useRef<HTMLDivElement>(null);

  const gameBoxCenterX = useMemo(() => {
    if (!gameBoxDimensions) return 0;
    return gameBoxDimensions.x + gameBoxDimensions.width / 2;
  }, [gameBoxDimensions]);

  const startGameIn =
    Math.floor(Math.random() * GAME_START_AFTER.max - GAME_START_AFTER.min) +
    GAME_START_AFTER.min;

  useTimeoutFn(() => {
    if (startGame) return;
    setUserInteractionResult(null);
    setStartGame(true);
    setGamesPlayed(gamesPlayed + 1);
  }, startGameIn);

  useEffect(() => {
    if (!startGame) return;

    const gameEndTimeout = setTimeout(() => {
      setStartGame(false);
      setPuckPosition(randomizeCoordinates(gameBoxDimensions));
    }, 1_000);

    return () => clearTimeout(gameEndTimeout);
  }, [startGame, gameBoxDimensions]);

  useEffect(() => {
    if (!puckPosition.x || !gameBoxCenterX) return;
    const calculatedPuckDirection = getPuckDirection(
      puckPosition,
      gameBoxCenterX
    );

    setPuckDirection(calculatedPuckDirection);
  }, [puckPosition, gameBoxCenterX]);

  useEffect(() => {
    if (!gameBoxDimensions) setPuckPosition(INITIAL_PUCK_POSITION);
    if (puckPosition.x && puckPosition.y) {
      setPuckPosition({ x: puckPosition.x, y: puckPosition.y });
    } else {
      setPuckPosition(randomizeCoordinates(gameBoxDimensions));
    }
  }, [gameBoxDimensions, puckPosition.x, puckPosition.y]);

  useEffect(() => {
    setGameBoxDimensions(gameBoxRef.current?.getBoundingClientRect());
  }, [gameBoxRef]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const keyDirection = KEY_TO_DIRECTION[event.key];
      const isCorrectKey = keyDirection === puckDirection;

      let result: UserInteractionResult = isCorrectKey
        ? { text: "Right Key", success: true }
        : { text: "Wrong Key", success: false };

      if (!startGame && !gamesPlayed) {
        result = { text: "Too Soon", success: false };
      } else if (!startGame) {
        result = { text: "Too Late", success: false };
      }

      setUserInteractionResult(result);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [gamesPlayed, puckDirection, startGame]);

  return (
    <GameContainer>
      <GameTitle>Left or Right?</GameTitle>
      <GameArea ref={gameBoxRef}>
        {startGame ? (
          <GameBox puckLocation={puckPosition} />
        ) : (
          <WaitingScreen userInteractionResult={userInteractionResult} />
        )}
      </GameArea>
    </GameContainer>
  );
};
