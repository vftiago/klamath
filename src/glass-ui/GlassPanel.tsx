import React from "react";
import { css } from "@emotion/css";
import { ReactNode } from "react";
import Glass, { GlassProps } from "./Glass";

export enum Elevation {
  None = 0,
  Low = 1,
  Medium = 2,
  High = 3,
}

export enum FixedPosition {
  Top = "top",
  Left = "left",
  Bottom = "bottom",
  Right = "right",
}

export type GlassPanelProps = GlassProps & {
  children: ReactNode;
  customStyles?: string;
  elevation?: Elevation;
  fixedPosition?: FixedPosition;
};

const GlassPanel = ({
  blur,
  elevation = Elevation.High,
  opacity,
  tint,
  customStyles,
  children,
  fixedPosition,
}: GlassPanelProps) => {
  return (
    <Glass
      blur={blur}
      opacity={opacity}
      tint={tint}
      customStyles={css([getPanelStyle(elevation, fixedPosition), customStyles])}
    >
      {children}
    </Glass>
  );
};

const getPanelStyle = (elevation: Elevation, fixedPosition?: FixedPosition) => {
  const boxShadow = `${1 + elevation}px`;

  if (!fixedPosition) {
    return css`
      box-shadow: ${boxShadow} ${boxShadow} ${boxShadow} 0px rgba(88, 88, 88, 0.1);
    `;
  }

  const offsetX = fixedPosition === "top" ? 0 : fixedPosition === "left" ? `${1 + elevation}px` : `-${1 + elevation}px`;
  const offsetY = fixedPosition === "top" ? `${1 + elevation}px` : 0;

  return css`
    box-shadow: ${offsetX} ${offsetY} ${boxShadow} 0px rgba(88, 88, 88, 0.1);
  `;
};

export default GlassPanel;
