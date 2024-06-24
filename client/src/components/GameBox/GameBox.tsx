import React, { forwardRef } from "react";
import { Container, Puck } from "./styles";

interface GameBoxProps {
  puckLocation?: { x: number; y: number };
}

export const GameBox = forwardRef<HTMLDivElement, GameBoxProps>(
  ({ puckLocation }, ref) => {
    return (
      <Container ref={ref}>
        {puckLocation && <Puck $puckLocation={puckLocation} />}
      </Container>
    );
  }
);
