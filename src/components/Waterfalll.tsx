import React from "react";
import { css } from "@emotion/css";
import { colors } from "../theme";
import { motion } from "framer-motion";
import { scroller } from "react-scroll";

const Waterfall = () => {
  const handleWaterfallClick = () => {
    scroller.scrollTo("repository-section", {
      smooth: true,
    });
  };

  return (
    <motion.div className={waterfallStyle} variants={item} onClick={handleWaterfallClick}>
      <span></span>
      <span></span>
      <span></span>
    </motion.div>
  );
};

const item = {
  visible: {
    opacity: 1,
    cursor: "pointer",
    transition: {
      duration: 8,
      ease: "backInOut",
    },
  },
  hidden: { opacity: 0 },
};

const waterfallStyle = css`
  @keyframes waterfall {
    0% {
      transform: translateY(-100%);
    }
    100% {
      transform: translateY(100%);
    }
  }
  width: 17px;
  height: 80px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  &:hover {
    span {
      background-color: ${colors.icon.accent};
    }
  }
  span {
    width: 1px;
    height: 100%;
    position: absolute;
    top: 0;
    background-color: #888;
    animation-name: waterfall;
    animation-duration: 1.5s;
    animation-iteration-count: infinite;
    transition: background-color 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
    &:nth-of-type(1) {
      left: 0;
    }
    &:nth-of-type(2) {
      left: 50%;
      margin-left: -1px;
      animation-delay: 0.3s;
    }
    &:nth-of-type(3) {
      right: 0;
      animation-delay: 0.15s;
    }
  }
`;

export default Waterfall;
