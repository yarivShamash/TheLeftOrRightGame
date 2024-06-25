import { PropsWithChildren } from "react";

import { MessageScreenContainer, MessageText } from "./styles";

interface MessageScreenProps {
  message: string;
}

export const MessageScreen = ({
  message,
  children,
}: PropsWithChildren<MessageScreenProps>) => (
  <MessageScreenContainer>
    <MessageText>{message}</MessageText>
    {children}
  </MessageScreenContainer>
);
