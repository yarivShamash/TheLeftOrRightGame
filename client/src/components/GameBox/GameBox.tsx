import { useEffect, useMemo, useRef, useState } from "react";
import { useTimeoutFn } from "react-use";

import { Puck } from "../Puck";
import { WaitingScreen } from "../WaitingScreen";
import { useUser } from "../../providers/UserProvider";

import { NoUser } from "../NoUser";

import {
  GAME_START_AFTER,
  INITIAL_PUCK_POSITION,
  KEY_TO_DIRECTION,
} from "./consts";
import { GameArea } from "./styles";
import { Coordinates, PuckDirection, UserInteractionResult } from "./types";
import { getPuckDirection, randomizeCoordinates } from "./utils";

export const GameBox = () => {
  const [playGame, setPlayGame] = useState(false);
  const [isFirstMatch, setIsFirstMatch] = useState(true);
  const [gameBoxDimensions, setGameBoxDimensions] = useState<DOMRect>();
  const [puckPosition, setPuckPosition] = useState<Coordinates>(
    INITIAL_PUCK_POSITION
  );
  const [puckDirection, setPuckDirection] =
    useState<PuckDirection>("unassigned");
  const [userInteractionResult, setUserInteractionResult] =
    useState<UserInteractionResult | null>(null);

  const { addPointToUser, user } = useUser();

  const gameBoxRef = useRef<HTMLDivElement>(null);

  const gameBoxCenterX = useMemo(() => {
    if (!gameBoxDimensions) return 0;
    return gameBoxDimensions.x + gameBoxDimensions.width / 2;
  }, [gameBoxDimensions]);

  const startGameIn =
    Math.floor(Math.random() * GAME_START_AFTER.max - GAME_START_AFTER.min) +
    GAME_START_AFTER.min;

  const setNewPuckPosition = () => {
    const newPuckPosition = randomizeCoordinates(gameBoxDimensions);
    setPuckPosition(newPuckPosition);
  };

  useTimeoutFn(() => {
    if (playGame) return;
    setUserInteractionResult(null);
    setPlayGame(true);
    setIsFirstMatch(false);
  }, startGameIn);

  useEffect(() => {
    if (!playGame) return;

    const gameEndTimeout = setTimeout(() => {
      setPlayGame(false);

      setNewPuckPosition();
    }, 1_000);

    return () => clearTimeout(gameEndTimeout);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playGame, gameBoxDimensions]);

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
      setNewPuckPosition();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameBoxDimensions, puckPosition.x, puckPosition.y]);

  useEffect(() => {
    const gameBoxRect = gameBoxRef.current?.getBoundingClientRect();
    setGameBoxDimensions(gameBoxRect);
  }, [gameBoxRef]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const keyDirection = KEY_TO_DIRECTION[event.key];
      const isCorrectKey = keyDirection === puckDirection;

      let result: UserInteractionResult;
      if (isCorrectKey) {
        result = { text: "Right Key", success: true };
        addPointToUser();
      } else {
        result = { text: "Wrong Key", success: false };
      }

      if (!playGame && isFirstMatch) {
        result = { text: "Too Soon", success: false };
      } else if (!playGame) {
        result = { text: "Too Late", success: false };
      }

      setUserInteractionResult(result);
      setNewPuckPosition();
      setPlayGame(false);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFirstMatch, puckDirection, playGame]);

  if (!user) return <NoUser />;

  return (
    <GameArea ref={gameBoxRef}>
      {playGame ? (
        <Puck puckLocation={puckPosition} />
      ) : (
        <WaitingScreen userInteractionResult={userInteractionResult} />
      )}
    </GameArea>
  );
};
