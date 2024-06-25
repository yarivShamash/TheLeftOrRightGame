import { useEffect, useMemo, useRef, useState } from "react";
import { useTimeoutFn } from "react-use";

import { Puck } from "../../components/Puck";
import { WaitingScreen } from "../../components/WaitingScreen";
import { useUser } from "../../providers/UserProvider";

import {
  GAME_START_AFTER,
  INITIAL_PUCK_POSITION,
  KEY_TO_DIRECTION,
} from "./consts";
import { GameArea, GameContainer, GameTitle } from "./styles";
import { Coordinates, PuckDirection, UserInteractionResult } from "./types";
import { getPuckDirection, randomizeCoordinates } from "./utils";
import { NoUser } from "../../components/NoUser";

export const Game = () => {
  const [playGame, setPlayGame] = useState(false);
  const [gamesPlayed, setGamesPlayed] = useState(0);
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

  useTimeoutFn(() => {
    if (playGame) return;
    setUserInteractionResult(null);
    setPlayGame(true);
    setGamesPlayed(gamesPlayed + 1);
  }, startGameIn);

  useEffect(() => {
    if (!playGame) return;

    const gameEndTimeout = setTimeout(() => {
      setPlayGame(false);
      setPuckPosition(randomizeCoordinates(gameBoxDimensions));
    }, 1_000);

    return () => clearTimeout(gameEndTimeout);
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

      let result: UserInteractionResult;
      if (isCorrectKey) {
        result = { text: "Right Key", success: true };
        addPointToUser();
      } else {
        result = { text: "Wrong Key", success: false };
      }

      if (!playGame && !gamesPlayed) {
        result = { text: "Too Soon", success: false };
      } else if (!playGame) {
        result = { text: "Too Late", success: false };
      }

      setUserInteractionResult(result);
      setPlayGame(false);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [gamesPlayed, puckDirection, playGame, addPointToUser]);

  if (!user) return <NoUser />;

  return (
    <GameContainer>
      <GameTitle>Left or Right?</GameTitle>
      <GameArea ref={gameBoxRef}>
        {playGame ? (
          <Puck puckLocation={puckPosition} />
        ) : (
          <WaitingScreen userInteractionResult={userInteractionResult} />
        )}
      </GameArea>
    </GameContainer>
  );
};
