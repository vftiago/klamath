import React from "react";
import { css } from "@emotion/css";
import { useEffect } from "react";
import { motion } from "framer-motion";
import Typed from "typed.js";
import GlassPanel, { FixedPosition } from "../glass-ui/GlassPanel";

const DEFAULT_NAVBAR_SIZE = 80;

export enum NavbarPosition {
  Left = "left",
  Right = "right",
}

type Props = {
  position: NavbarPosition;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  header: string;
};

const Navbar = ({ position, header, leftIcon, rightIcon }: Props) => {
  useEffect(() => {
    const typedCurrentPageHeader = new Typed(`#${position}-header`, {
      strings: [header],
      typeSpeed: 20,
      showCursor: false,
    });

    return () => {
      typedCurrentPageHeader.destroy();
    };
  }, [header]);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={getNavbarVariants(position)}
      className={getNavbarContainerStyles(position)}
    >
      <GlassPanel customStyles={getCustomStyles(position)} fixedPosition={getFixedPosition(position)}>
        <div className={iconContainerStyle}>{leftIcon}</div>
        <div className={headerContainerStyles}>
          <div className={getHeaderStyles(position)} id={`${position}-header`}>
            {header}
          </div>
        </div>
        <div className={iconContainerStyle}>{rightIcon}</div>
      </GlassPanel>
    </motion.div>
  );
};

const getFixedPosition = (position: NavbarPosition) => {
  switch (position) {
    case NavbarPosition.Left:
      return FixedPosition.Left;
    case NavbarPosition.Right:
      return FixedPosition.Right;
    default:
      return FixedPosition.Left;
  }
};

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

const baseNavbarContainerStyles = css`
  top: 0;
  z-index: 1;
  position: fixed;
`;

const rightNavbarContainerStyles = css`
  ${baseNavbarContainerStyles}
  width: ${DEFAULT_NAVBAR_SIZE}px;
  height: 100%;
  right: 0;
`;

const leftNavbarContainerStyles = css`
  ${baseNavbarContainerStyles}
  height: 100%;
  left: 0;
`;

const getNavbarContainerStyles = (position: NavbarPosition) => {
  switch (position) {
    case NavbarPosition.Left:
      return leftNavbarContainerStyles;
    case NavbarPosition.Right:
      return rightNavbarContainerStyles;
    default:
      return leftNavbarContainerStyles;
  }
};

const verticalBarStyles = css`
  top: -1px;
  position: fixed;
  display: grid;
  align-items: center;
  width: ${DEFAULT_NAVBAR_SIZE}px;
  grid-template-rows: ${DEFAULT_NAVBAR_SIZE}px auto ${DEFAULT_NAVBAR_SIZE}px;
  height: 100%;
`;

const getCustomStyles = (position: NavbarPosition) => {
  switch (position) {
    case NavbarPosition.Left:
      return verticalBarStyles;
    case NavbarPosition.Right:
      return verticalBarStyles;
    default:
      return verticalBarStyles;
  }
};

const headerContainerStyles = css`
  height: ${DEFAULT_NAVBAR_SIZE}px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const getHeaderStyles = (position: NavbarPosition) => {
  const rotate = position === NavbarPosition.Left ? -90 : 90;

  return css`
    height: ${DEFAULT_NAVBAR_SIZE}px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vh;
    position: absolute;
    transform: rotate(${rotate}deg);
  `;
};

const iconContainerStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Navbar;
