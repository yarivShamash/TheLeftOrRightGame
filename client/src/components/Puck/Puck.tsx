import { Puck as StyledPuck } from "./styles";

interface PuckProps {
  puckLocation?: { x: number; y: number };
}

export const Puck = ({ puckLocation }: PuckProps) =>
  puckLocation ? (
    <StyledPuck
      style={{ top: puckLocation.y, left: puckLocation.x }}
      $puckLocation={puckLocation}
    />
  ) : null;
