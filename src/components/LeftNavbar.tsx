import React from "react";
import { css } from "@emotion/css";
import { useEffect } from "react";
import { motion } from "framer-motion";
import Logo from "./icons/Logo";
import { logoSize } from "../theme";
import Typed from "typed.js";
import GlassPanel, { FixedPosition } from "../glass-ui/GlassPanel";

// #region framer-animations
const visible = {
  x: 0,
  y: 0,
  transition: {
    duration: 0.8,
    when: "beforeChildren",
    staggerChildren: 0.2,
    ease: "backInOut",
  },
};

const leftNavbarVariants = {
  visible,
  hidden: { x: "-80px" },
};

type Props = {
  muted: boolean;
  currentPageHeader: string;
  onButtonHover: () => void;
  onHeadphonesIconClick: () => void;
  fixedPosition?: FixedPosition;
};

const LeftNavbar = ({ currentPageHeader, fixedPosition = FixedPosition.Left }: Props) => {
  useEffect(() => {
    const typedCurrentPageHeader = new Typed("#current-page-header", {
      strings: [currentPageHeader],
      typeSpeed: 20,
      showCursor: false,
    });

    return () => {
      typedCurrentPageHeader.destroy();
    };
  }, [currentPageHeader]);

  return (
    <motion.div initial="hidden" animate="visible" variants={leftNavbarVariants} className={leftNavbarContainerStyles}>
      <GlassPanel customStyles={getNavbarStyles(fixedPosition)} fixedPosition={fixedPosition}>
        <div className={iconContainerStyle}>
          <span className={logoStyle}>
            <Logo size={logoSize}></Logo>
          </span>
        </div>
        <div className={getPageHeaderStyles(fixedPosition)}>
          <header id="current-page-header"></header>
        </div>
        <div className={iconContainerStyle}></div>
      </GlassPanel>
    </motion.div>
  );
};

const baseNavbarContainerStyles = css`
  top: 0;
  z-index: 1;
  position: fixed;
`;

const leftNavbarContainerStyles = css`
  ${baseNavbarContainerStyles}
  height: 100%;
  left: 0;
`;

const baseNavbarStyles = css`
  position: fixed;
  display: grid;
  align-items: center;
`;

const horizontalBarStyles = css`
  ${baseNavbarStyles}
  height: 80px;
  grid-template-columns: 80px auto 80px;
  width: 100%;
`;

const verticalBarStyles = css`
  ${baseNavbarStyles}
  width: 80px;
  grid-template-rows: 80px auto 80px;
  height: 100%;
`;

const getNavbarStyles = (fixedPosition: FixedPosition) => {
  const navbarStyles = fixedPosition === FixedPosition.Top ? horizontalBarStyles : verticalBarStyles;

  return css`
    ${navbarStyles};
    img {
      height: ${logoSize + "px"};
      width: ${logoSize + "px"};
    }
  `;
};

const getPageHeaderStyles = (fixedPosition: FixedPosition) => {
  const horizontalHeaderStyles = css`
    header {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `;

  const verticalHeaderStyles = css`
    header {
      width: 100vh;
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      transform: translate(-50vh) rotate(-90deg);
      margin-left: 40px;
    }
  `;

  const headerStyles = fixedPosition === FixedPosition.Top ? horizontalHeaderStyles : verticalHeaderStyles;

  return css`
    height: 80px;
    display: flex;
    align-items: center;
    ${headerStyles}
  `;
};

const iconContainerStyle = css`
  z-index: 1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const logoStyle = css`
  height: 36px;
  svg {
    fill: #333;
  }
`;

export default LeftNavbar;
