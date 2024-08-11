import React from "react";
import { clsx } from "clsx";
import { ReactNode } from "react";

export type GlassPanelProps = {
  children: ReactNode;
  customStyles?: string;
};

const GlassPanel = ({ customStyles, children }: GlassPanelProps) => {
  return (
    <div
      className={clsx([`border border-neutral-500/20 bg-neutral-100/[0.2] shadow-lg backdrop-blur-sm`, customStyles])}
    >
      {children}
    </div>
  );
};

export default GlassPanel;
