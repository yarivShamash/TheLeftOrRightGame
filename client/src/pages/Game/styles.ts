import styled from "styled-components";
import { Flex, Heading } from "@radix-ui/themes";

export const GameContainer = styled(Flex)`
  flex-direction: column;
  flex: 1;
  background: linear-gradient(to bottom, #9de0af, #188535);
`;

export const GameTitle = styled(Heading)`
  font-size: 4rem;
  padding: 2rem;
`;

export const GameArea = styled(Flex)`
  flex-direction: column;
  /* flex: 1; */
  height: 100%;
  width: 100%;
`;
