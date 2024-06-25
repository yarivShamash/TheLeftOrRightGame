import { GameContainer, GameTitle } from "./styles";

import { NoUser } from "../../components/NoUser";
import { GameBox } from "../../components/GameBox";
import { useUser } from "../../providers/UserProvider";

export const Game = () => {
  const { user } = useUser();

  if (!user) return <NoUser />;

  return (
    <GameContainer>
      <GameTitle>Left or Right?</GameTitle>
      <GameBox />
    </GameContainer>
  );
};
