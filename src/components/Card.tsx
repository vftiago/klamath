import React from "react";
import GlassPanel, { GlassPanelProps } from "../glass-ui/GlassPanel";

type Size = "s" | "m" | "l";
type Orientation = "horizontal" | "vertical";

// const cardSizes = {
//   s: 220,
//   m: 320,
//   l: 640,
// };

type CardProps = GlassPanelProps & {
  orientation: Orientation;
  customStyles?: string;
  size?: Size;
};

const Card = ({ blur, elevation, customStyles, children }: CardProps) => {
  return (
    <GlassPanel blur={blur} elevation={elevation} customStyles={customStyles}>
      {children}
    </GlassPanel>
  );
};

// const getCardStyles = (orientation: Orientation, size: Size) => {
//   const height = orientation === "horizontal" ? cardSizes[size] : Math.ceil(cardSizes[size] * GOLDEN_RATIO);

//   return css`
//     height: ${`${height}px`};
//   `;
// };

export default Card;
