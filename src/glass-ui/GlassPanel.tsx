import React from "react";
import { clsx } from "clsx";
import { ReactNode } from "react";
import Glass, { GlassProps } from "./Glass";

export type GlassPanelProps = GlassProps & {
  children: ReactNode;
  customStyles?: string;
};

const GlassPanel = ({ opacity, customStyles, children }: GlassPanelProps) => {
  return (
    <Glass opacity={opacity} customStyles={clsx(["shadow-lg", customStyles])}>
      {children}
    </Glass>
  );
};

export default GlassPanel;
