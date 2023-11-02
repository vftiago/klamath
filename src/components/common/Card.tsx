import React from "react";
import { css } from "@emotion/css";
import { ReactNode } from "react";
import { GOLDEN_RATIO } from "../../constants";
import GlassPanel, { GlassPanelProps } from "../../glass-ui/GlassPanel";

type Size = "s" | "m" | "l";
type Orientation = "horizontal" | "vertical";

const cardSizes = {
  s: 220,
  m: 320,
  l: 640,
};

type CardProps = GlassPanelProps & {
  children: ReactNode;
  orientation: Orientation;
  customStyles?: string;
  size?: Size;
};

const Card = ({ blur, elevation, size = "m", orientation, customStyles, children }: CardProps) => {
  return (
    <GlassPanel blur={blur} elevation={elevation} customStyles={css([getCardStyles(orientation, size), customStyles])}>
      {children}
    </GlassPanel>
  );
};

const getCardStyles = (orientation: Orientation, size: Size) => {
  const height = orientation === "horizontal" ? cardSizes[size] : Math.ceil(cardSizes[size] * GOLDEN_RATIO);

  return css`
    height: ${`${height}px`};
  `;
};

export default Card;
