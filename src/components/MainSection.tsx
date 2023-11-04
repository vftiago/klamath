import React from "react";
import { css } from "@emotion/css";
import LinkedinIcon from "./icons/LinkedinIcon";
import GithubIcon from "./icons/GithubIcon";
import MailIcon from "./icons/MailIcon";
import Typed from "typed.js";
import { copyToClipboard } from "../utils/copyToClipboard";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { DEFAULT_ICON_SIZE, colors } from "../theme";
import { EMAIL } from "../constants";
import { useInView } from "react-intersection-observer";
import Waterfall from "./Waterfalll";

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

const item = {
  visible: {
    opacity: 1,
    cursor: "pointer",
    transition: {
      duration: 0.8,
      ease: "backInOut",
    },
  },
  hidden: { opacity: 0 },
};
// #endregion framer-animations

let typedMail: Typed;
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

type Props = {
  onButtonClick: () => void;
  onButtonHover: () => void;
  onHeadphonesIconClick: () => void;
  onVisibilityChange: (pageNumber: number, inview: boolean) => void;
};

function MainSection({ onButtonClick, onButtonHover, onVisibilityChange }: Props) {
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
      typedMail?.destroy();
    };
  }, []);

  useEffect(() => {
    onVisibilityChange(0, inView);
  }, [inView]);

  const handleMailIconClick = () => {
    if (typedMail) typedMail.destroy();

    copyToClipboard(EMAIL);

    onButtonClick();

    typedMail = new Typed("#toast", {
      strings: [`<u>${EMAIL}</u> copied to clipboard.`],
      typeSpeed: 1,
      showCursor: false,
      fadeOut: true,
      onComplete: () => {
        setTimeout(() => {
          typedMail.destroy();
        }, 3000);
      },
    });
  };

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
        <div className={socialIconsStyle}>
          <motion.a
            variants={item}
            href="https://github.com/vftiago"
            target="_blank"
            rel="noreferrer"
            onMouseEnter={onButtonHover}
            onClick={onButtonClick}
          >
            <GithubIcon size={DEFAULT_ICON_SIZE} />
          </motion.a>
          <motion.a
            variants={item}
            onClick={handleMailIconClick}
            target="_blank"
            rel="noreferrer"
            onMouseEnter={onButtonHover}
          >
            <MailIcon size={DEFAULT_ICON_SIZE} />
          </motion.a>
          <motion.a
            variants={item}
            href="https://linkedin.com/in/vftiago"
            target="_blank"
            rel="noreferrer"
            onMouseEnter={onButtonHover}
            onClick={onButtonClick}
          >
            <LinkedinIcon size={DEFAULT_ICON_SIZE} />
          </motion.a>
        </div>
        <Waterfall />
      </motion.div>
    </main>
  );
}

const mainContentStyle = css`
  display: flex;
  width: 100%;
  min-height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const toastStyles = css`
  width: 254px;
  padding-bottom: 24px;
`;

const socialIconsStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 88px;
  a {
    height: ${DEFAULT_ICON_SIZE + "px"};
    width: ${DEFAULT_ICON_SIZE + "px"};
  }
  svg {
    transition: all 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
    fill: #333;
    &:hover {
      cursor: pointer;
      fill: ${colors.icon.accent};
    }
  }
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
