import { Flex, Heading } from "@radix-ui/themes";
import styled from "styled-components";

export const MessageScreenContainer = styled(Flex)`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  padding: 2rem;
  gap: 6rem;
`;

export const MessageText = styled(Heading)`
  font-size: 2rem;
  background: transparent;
  color: white;
`;
