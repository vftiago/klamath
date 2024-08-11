import React from "react";
import { clsx } from "clsx";
import { useEffect } from "react";
import { motion } from "framer-motion";
import Typed from "typed.js";
import GlassPanel from "./GlassPanel";

// #region framer-animations
const visible = {
  x: 0,
  y: 0,
  transition: {
    duration: 0.8,
    ease: "backInOut",
  },
};

// #endregion framer-animations

const getNavbarVariants = (position: NavbarPosition) => {
  switch (position) {
    case NavbarPosition.Left:
      return {
        visible,
        hidden: { x: `-66px` },
      };
    case NavbarPosition.Right:
      return {
        visible: {
          ...visible,
          x: "-66px",
        },
        hidden: { x: 0 },
      };
    case NavbarPosition.Top:
      return {
        visible,
        hidden: { y: `-66px` },
      };
    case NavbarPosition.Bottom:
      return {
        visible: {
          ...visible,
          y: "-66px",
        },
        hidden: { y: 0 },
      };
    default:
      return {
        visible,
        hidden: { x: `-66px` },
      };
  }
};

const getGridTemplates = (position: NavbarPosition) => {
  switch (position) {
    case NavbarPosition.Top:
    case NavbarPosition.Bottom:
      return `grid-cols-[66px_auto_66px]`;
    case NavbarPosition.Left:
    case NavbarPosition.Right:
      return `grid-rows-[66px_auto_66px]`;
    default:
      return `grid-cols-[66px_auto_66px]`;
  }
};

const getNavbarDimensions = (position: NavbarPosition) => {
  switch (position) {
    case NavbarPosition.Top:
    case NavbarPosition.Bottom:
      return `h-[66px]`;
    case NavbarPosition.Left:
    case NavbarPosition.Right:
      return `w-[66px]`;
    default:
      return `h-[66px]`;
  }
};

export enum NavbarPosition {
  Left = "left",
  Right = "right",
  Top = "top",
  Bottom = "bottom",
}

type NavbarProps = {
  isAnimated?: boolean;
  header?: string;
  position?: NavbarPosition;
  size?: number;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isTyped?: boolean;
};

const Navbar = ({
  isAnimated = true,
  header,
  position = NavbarPosition.Left,
  leftIcon,
  rightIcon,
  isTyped,
}: NavbarProps) => {
  useEffect(() => {
    if (!header || !isTyped) return;

    const typedCurrentPageHeader = new Typed(`#${position}-header`, {
      strings: [header],
      typeSpeed: 20,
      showCursor: false,
    });

    return () => {
      typedCurrentPageHeader.destroy();
    };
  }, [header, position, isTyped]);

  return (
    <motion.div
      initial={isAnimated ? "hidden" : "visible"}
      animate="visible"
      variants={getNavbarVariants(position)}
      className={clsx("fixed z-10", {
        "w-full": position === NavbarPosition.Top || position === NavbarPosition.Bottom,
        "h-full": position === NavbarPosition.Left || position === NavbarPosition.Right,
        "left-0": position === NavbarPosition.Left,
        "right-0": position === NavbarPosition.Right,
        "top-0": position === NavbarPosition.Top,
        "bottom-0": position === NavbarPosition.Bottom,
      })}
    >
      <GlassPanel
        customStyles={clsx(
          "fixed grid items-center",
          {
            "w-full grid-flow-col": position === NavbarPosition.Top || position === NavbarPosition.Bottom,
            "h-full grid-flow-row": position === NavbarPosition.Left || position === NavbarPosition.Right,
          },
          getGridTemplates(position),
          getNavbarDimensions(position),
        )}
      >
        <div className="flex items-center justify-center">{leftIcon}</div>
        <div className="flex items-center justify-center">
          <div
            className={clsx("absolute flex w-screen items-center justify-center text-lg", {
              "-rotate-90": position === NavbarPosition.Left,
              "rotate-90": position === NavbarPosition.Right,
            })}
            id={`${position}-header`}
          >
            <p className={isTyped ? "sr-only" : undefined}>{header}</p>
          </div>
        </div>
        <div className="flex items-center justify-center">{rightIcon}</div>
      </GlassPanel>
    </motion.div>
  );
};

export default Navbar;
