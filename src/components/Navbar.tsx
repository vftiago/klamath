import React from "react";
import { clsx } from "clsx";
import { useEffect } from "react";
import { motion } from "framer-motion";
import Typed from "typed.js";
import GlassPanel from "./GlassPanel";

const DEFAULT_NAVBAR_SIZE = 80;

// #region framer-animations
const visible = {
  x: 0,
  y: 0,
  transition: {
    duration: 0.8,
    ease: "backInOut",
  },
};

const leftNavbarVariants = {
  visible,
  hidden: { x: `-${DEFAULT_NAVBAR_SIZE}PX` },
};

const rightNavbarVariants = {
  visible,
  hidden: { x: `${DEFAULT_NAVBAR_SIZE}PX` },
};

const getNavbarVariants = (position: NavbarPosition) => {
  switch (position) {
    case NavbarPosition.Left:
      return leftNavbarVariants;
    case NavbarPosition.Right:
      return rightNavbarVariants;
    default:
      return leftNavbarVariants;
  }
};
// #endregion framer-animations

export enum NavbarPosition {
  Left = "left",
  Right = "right",
}

type Props = {
  header: string;
  position: NavbarPosition;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  typedHeader?: boolean;
};

const Navbar = ({ header, position, leftIcon, rightIcon, typedHeader }: Props) => {
  useEffect(() => {
    if (!typedHeader) return;

    const typedCurrentPageHeader = new Typed(`#${position}-header`, {
      strings: [header],
      typeSpeed: 20,
      showCursor: false,
    });

    return () => {
      typedCurrentPageHeader.destroy();
    };
  }, [header, position, typedHeader]);

  const isLeftNavbar = position === NavbarPosition.Left;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={getNavbarVariants(position)}
      className={clsx("fixed top-0 z-10 h-full w-20", isLeftNavbar ? "left-0" : "right-0")}
    >
      <GlassPanel customStyles="fixed grid items-center w-20 h-full grid-rows-[80px,auto,80px]">
        <div className="flex items-center justify-center">{leftIcon}</div>
        <div className="flex h-20 items-center justify-center">
          <div
            className={clsx(
              `absolute flex h-20 w-screen items-center justify-center text-base`,
              isLeftNavbar ? "-rotate-90" : "rotate-90",
            )}
            id={`${position}-header`}
          >
            <p className={typedHeader ? "sr-only" : undefined}>{header}</p>
          </div>
        </div>
        <div className="flex items-center justify-center">{rightIcon}</div>
      </GlassPanel>
    </motion.div>
  );
};

export default Navbar;
