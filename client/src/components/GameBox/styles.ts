import { Box, Flex } from "@radix-ui/themes";
import styled from "styled-components";
import { PUCK_DIMENSIONS } from "../../pages/Game/consts";

interface PuckProps {
  $puckLocation: { x: number; y: number };
}

export const Container = styled(Flex)`
  flex-direction: column;
  flex: 1;
  width: 100%;
  background-color: pink;
`;

export const Puck = styled(Box)<PuckProps>`
  position: absolute;
  top: ${({ $puckLocation: $objectLocation }) => $objectLocation.y}px;
  left: ${({ $puckLocation: $objectLocation }) => $objectLocation.y}px;
  width: ${PUCK_DIMENSIONS}px;
  height: ${PUCK_DIMENSIONS}px;
  background-color: black;
  border-radius: 50%;
`;
