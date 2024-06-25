import { UserInteractionResult } from "../../pages/Game/types";
import {
  WaitingScreenContainer,
  WaitingText,
  ResultBanner,
  ResultText,
} from "./styles";

interface WaitingScreenProps {
  userInteractionResult: UserInteractionResult | null;
}

export const WaitingScreen = ({
  userInteractionResult,
}: WaitingScreenProps) => (
  <WaitingScreenContainer>
    <WaitingText>Wait for it </WaitingText>
    {userInteractionResult?.text && (
      <ResultBanner $success={userInteractionResult.success}>
        <ResultText>{userInteractionResult.text}</ResultText>
      </ResultBanner>
    )}
  </WaitingScreenContainer>
);
