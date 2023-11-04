import React from "react";
import { css } from "@emotion/css";
import { useEffect } from "react";
import { motion } from "framer-motion";
import Logo from "./icons/Logo";
import { DEFAULT_LOGO_SIZE } from "../theme";
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
  header: string;
  onButtonHover: () => void;
  onHeadphonesIconClick: () => void;
  fixedPosition?: FixedPosition;
};

const LeftNavbar = ({ header, fixedPosition = FixedPosition.Left }: Props) => {
  useEffect(() => {
    const typedCurrentPageHeader = new Typed("#left-navbar-header", {
      strings: [header],
      typeSpeed: 20,
      showCursor: false,
    });

    return () => {
      typedCurrentPageHeader.destroy();
    };
  }, [header]);

  return (
    <motion.div initial="hidden" animate="visible" variants={leftNavbarVariants} className={leftNavbarContainerStyles}>
      <GlassPanel customStyles={verticalBarStyles} fixedPosition={fixedPosition}>
        <div className={iconContainerStyle}>
          <span className={logoStyle}>
            <Logo size={DEFAULT_LOGO_SIZE}></Logo>
          </span>
        </div>
        <div className={getPageHeaderStyles(fixedPosition)}>
          <header id="left-navbar-header"></header>
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

const verticalBarStyles = css`
  ${baseNavbarStyles}
  width: 80px;
  grid-template-rows: 80px auto 80px;
  height: 100%;
`;

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