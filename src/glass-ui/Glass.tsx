import React from "react";
import { clsx } from "clsx";
import { ReactNode } from "react";

export enum Opacity {
  Low = 0.03,
  High = 1,
}

export type GlassProps = {
  opacity?: Opacity;
  children: ReactNode;
  customStyles?: string;
};

const Glass = ({ opacity = 0.03, customStyles, children }: GlassProps) => {
  return (
    <div
      className={clsx([`backdrop-blur-[2px] bg-neutral-500/[${opacity}] border border-neutral-500/20`, customStyles])}
    >
      {children}
    </div>
  );
};

export default Glass;
