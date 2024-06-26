import { UserInteractionResult } from "../GameBox/types";
import { MessageScreen } from "../MessageScreen";

import { ResultBanner, ResultText } from "./styles";

interface WaitingScreenProps {
  userInteractionResult: UserInteractionResult | null;
}

export const WaitingScreen = ({
  userInteractionResult,
}: WaitingScreenProps) => (
  <MessageScreen message="Wait for it...">
    {userInteractionResult?.text && (
      <ResultBanner $success={userInteractionResult.success}>
        <ResultText>{userInteractionResult.text}</ResultText>
      </ResultBanner>
    )}
  </MessageScreen>
);
