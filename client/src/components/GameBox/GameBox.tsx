import React, { forwardRef } from "react";
import { Container, Puck } from "./styles";

interface GameBoxProps {
  puckLocation: { x: number; y: number };
}

export const GameBox = forwardRef(({ puckLocation }: GameBoxProps, ref) => {
  return (
    <Container ref={ref}>
      <Puck $puckLocation={puckLocation} />
    </Container>
  );
});
