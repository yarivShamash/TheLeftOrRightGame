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
  background: radial-gradient(
    circle at center,
    #8ec8e2 0%,
    #0f84e2 20%,
    #850fe2 50%,
    #cb0fe2 100%
  );
  box-shadow: 0px 0px 40px 0px #65ff93e8;
  border-radius: 50%;
`;
