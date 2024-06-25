import { Box } from "@radix-ui/themes";
import styled from "styled-components";
import { PUCK_DIMENSIONS } from "../../pages/Game/consts";

interface PuckProps {
  $puckLocation: { x: number; y: number };
}

export const Puck = styled(Box)<PuckProps>`
  position: absolute;
  width: ${PUCK_DIMENSIONS}px;
  height: ${PUCK_DIMENSIONS}px;
  background-color: black;
  border-radius: 50%;
`;
