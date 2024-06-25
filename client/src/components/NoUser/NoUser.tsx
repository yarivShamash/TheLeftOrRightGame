import { MessageScreen } from "../MessageScreen";
import { NoUserLink } from "./styles";

export const NoUser = () => {
  return (
    <MessageScreen message="Dear friend you should submit your name to play our game">
      <NoUserLink to="/">Take me home</NoUserLink>
    </MessageScreen>
  );
};
