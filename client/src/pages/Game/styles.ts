import styled from "styled-components";
import { Flex, Heading } from "@radix-ui/themes";

export const GameContainer = styled(Flex)`
  flex-direction: column;
  flex: 1;
`;

export const GameTitle = styled(Heading)`
  font-size: 4rem;
  padding: 2rem;
  color: white;
`;
