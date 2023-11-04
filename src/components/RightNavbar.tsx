import React from "react";
import { css } from "@emotion/css";
import { useEffect } from "react";
import { motion } from "framer-motion";
import HeadphonesIcon from "./icons/Headphones";
import { DEFAULT_ICON_SIZE, colors, logoSize } from "../theme";
import Typed from "typed.js";
import GlassPanel, { FixedPosition } from "../glass-ui/GlassPanel";
import { generateUUID } from "three/src/math/MathUtils";

// #region framer-animations
const visible = {
  x: 0,
  transition: {
    duration: 0.8,
    when: "beforeChildren",
    staggerChildren: 0.2,
    ease: "backInOut",
  },
};

const rightNavbarVariants = {
  hidden: { x: "88px" },
  visible,
};

type Props = {
  muted: boolean;
  currentPageHeader: string;
  onButtonHover: () => void;
  onHeadphonesIconClick: () => void;
};

const RightNavbar = ({ muted, currentPageHeader, onButtonHover, onHeadphonesIconClick }: Props) => {
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
    <motion.div
      initial="hidden"
      animate="visible"
      variants={rightNavbarVariants}
      className={rightNavbarContainerStyles}
    >
      <GlassPanel customStyles={verticalBarStyles} fixedPosition={FixedPosition.Right}>
        <div className={iconContainerStyle}>
          {/* <span className={logoStyle}>
            <LoadingIcon size={DEFAULT_ICON_SIZE}></LoadingIcon>
          </span> */}
        </div>
        <div className={pageHeaderStyles}>
          <header id="current-page-header">{generateUUID()}</header>
        </div>
        <div className={iconContainerStyle}>
          <span
            className={css([soundIconStyle, muted && mutedStyle])}
            onMouseEnter={onButtonHover}
            onClick={onHeadphonesIconClick}
          >
            <HeadphonesIcon />
          </span>
        </div>
      </GlassPanel>
    </motion.div>
  );
};

const rightNavbarContainerStyles = css`
  z-index: 1;
  position: fixed;
  width: 80px;
  height: 100%;
  right: 0;
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
  img {
    height: ${logoSize + "px"};
    width: ${logoSize + "px"};
  }
`;

const pageHeaderStyles = css`
  height: 80px;
  display: flex;
  align-items: center;
  header {
    width: 100vh;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translate(-50vh) rotate(90deg);
    margin-left: 40px;
  }
`;

const iconContainerStyle = css`
  z-index: 1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// const logoStyle = css`
//   height: 36px;
//   svg {
//     fill: #333;
//   }
// `;

const soundIconStyle = css`
  height: 16px;
  svg {
    transition: all 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
    fill: #333;
  }
  &:hover {
    cursor: pointer;
    svg {
      fill: ${colors.icon.accent};
    }
    &::after {
      background-color: ${colors.icon.accent};
    }
  }
  &:after {
    transition: all 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
    background-color: #666;
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: ${Math.sqrt(DEFAULT_ICON_SIZE * DEFAULT_ICON_SIZE + DEFAULT_ICON_SIZE * DEFAULT_ICON_SIZE) + "px"};
    height: 2px;
    margin-top: -1px;
    margin-left: ${-1 * DEFAULT_ICON_SIZE * 0.75 + "px"};
    transform: rotate(-45deg) scaleX(0);
  }
`;

const mutedStyle = css`
  &:after {
    transform: rotate(-45deg) scaleX(1);
  }
`;

export default RightNavbar;
