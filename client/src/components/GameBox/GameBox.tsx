import { Puck } from "./styles";

interface GameBoxProps {
  puckLocation?: { x: number; y: number };
}

export const GameBox = ({ puckLocation }: GameBoxProps) => {
  return (
    <>
      {puckLocation && (
        <Puck
          style={{ top: puckLocation.y, left: puckLocation.x }}
          $puckLocation={puckLocation}
        />
      )}
    </>
  );
};
