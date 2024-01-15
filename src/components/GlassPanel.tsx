import React from "react";
import { clsx } from "clsx";
import { ReactNode } from "react";

export enum Opacity {
  Low = 0.03,
  High = 1,
}

export type GlassPanelProps = {
  children: ReactNode;
  customStyles?: string;
  opacity?: Opacity;
};

const GlassPanel = ({ opacity, customStyles, children }: GlassPanelProps) => {
  return (
    <div
      className={clsx([
        `backdrop-blur-sm bg-neutral-500/[${opacity}] border border-neutral-500/20 shadow-lg`,
        customStyles,
      ])}
    >
      {children}
    </div>
  );
};

export default GlassPanel;
