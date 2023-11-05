import React from "react";
import { css } from "@emotion/css";
import Typed from "typed.js";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Waterfall from "./Waterfalll";
import Socials from "./Socials";

// #region framer-animations
const visible = {
  opacity: 1,
  x: 0,
  transition: {
    delay: 0.2,
    duration: 0.8,
    when: "beforeChildren",
    staggerChildren: 0.2,
    ease: "backInOut",
  },
};

const socialIconsVariant = {
  visible,
  hidden: { opacity: 0 },
};

// #endregion framer-animations

let typedName: Typed;
let typedJob: Typed;

const HEADING_1_START_DELAY = 1800;
const HEADING_2_START_DELAY = 0;

const defaultTypedOptions = {
  typeSpeed: 20,
  showCursor: true,
  cursorChar: "_",
};

const typedJobCallback = (self: Typed) => {
  typedJob = new Typed("#typed-job", {
    ...defaultTypedOptions,
    strings: [`Software developer`],
    startDelay: HEADING_2_START_DELAY,
  });

  self.cursor.remove();
};

type MainSectionProps = {
  onVisibilityChange: (pageNumber: number, inview: boolean) => void;
};

const MainSection = ({ onVisibilityChange }: MainSectionProps) => {
  const { ref, inView } = useInView({
    threshold: 1,
  });

  useEffect(() => {
    typedName = new Typed("#typed-name", {
      ...defaultTypedOptions,
      strings: [`Tiago Fernandes`],
      startDelay: HEADING_1_START_DELAY,
      onComplete: typedJobCallback,
    });

    return () => {
      typedName?.destroy();
      typedJob?.destroy();
    };
  }, []);

  useEffect(() => {
    onVisibilityChange(0, inView);
  }, [inView]);

  return (
    <main className={mainContentStyle}>
      <div className={typedTitle}>
        <h1 ref={ref}>
          <span id="typed-name"></span>
        </h1>
        <h2>
          <span id="typed-job"></span>
        </h2>
      </div>
      <motion.div className={callToActionStyle} initial="hidden" animate="visible" variants={socialIconsVariant}>
        <div className={toastStyles}>
          <span id="toast"></span>
        </div>
        <Socials />
        <Waterfall />
      </motion.div>
    </main>
  );
};

const mainContentStyle = css`
  display: flex;
  width: 100%;
  min-height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const toastStyles = css`
  height: 20px;
  width: 254px;
  padding-bottom: 48px;
`;

const callToActionStyle = css`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-bottom: 128px;
  bottom: 0;
`;

const typedTitle = css`
  height: 70px;
  width: 349px;
  .typed-cursor {
    animation-delay: 0s;
    animation-direction: normal;
    animation-duration: 0.7s;
    animation-fill-mode: none;
    animation-iteration-count: infinite;
    animation-play-state: running;
    animation-timing-function: ease;
  }
`;

export default MainSection;
