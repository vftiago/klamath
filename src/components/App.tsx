/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import LinkedinIcon from "./icons/LinkedinIcon";
import GithubIcon from "./icons/GithubIcon";
import Logo from "./icons/Logo";
import HeadphonesIcon from "./icons/Headphones";
import MailIcon from "./icons/MailIcon";
import Typed from "typed.js";
import { copyToClipboard } from "../utils/copyToClipboard";
import { motion } from "framer-motion";
import { Fragment } from "react";

const iconSize = 18;

const accentColor = "#fa8072";

const email = "tiago@infodump.xyz";

let typed: any;

type Props = {
  muted: boolean;
  onButtonClick: () => void;
  onButtonHover: () => void;
  onHeadphonesIconClick: () => void;
};

function App({
  muted,
  onButtonClick,
  onButtonHover,
  onHeadphonesIconClick,
}: Props) {
  const handleMailIconClick = () => {
    if (typed) typed.destroy();

    copyToClipboard(email);

    onButtonClick();

    typed = new Typed("#toast", {
      strings: [`<u>${email}</u> copied to clipboard.`, ""],
      typeSpeed: 1,
      backDelay: 3000,
      showCursor: false,
      fadeOut: true,
    });
  };

  return (
    <Fragment>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={leftColumnVariants}
        css={leftColumn}
      >
        <div css={iconContainerStyle}>
          <Logo size={32}></Logo>
        </div>
        <div css={centerPieceStyle}>
          <header css={headerStyle}>
            tiago fernandes — front-end web developer
          </header>
        </div>
        <div css={iconContainerStyle}></div>
      </motion.div>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={rightColumnVariants}
        css={rightColumn}
      >
        <div css={iconContainerStyle}></div>
        <div
          css={[iconContainerStyle, muted && mutedStyle]}
          onMouseEnter={onButtonHover}
          onClick={onHeadphonesIconClick}
        >
          <HeadphonesIcon size={iconSize}></HeadphonesIcon>
        </div>
      </motion.div>
      <main css={mainContentStyle}>
        <div></div>
      </main>
      {/* <div css={cornerCounterStyle}>
        <div css={labelStyle}>currently reading</div>
        <div css={numStyle}>Antifragile</div>
      </div> */}
      <div css={callToActionStyle}>
        <div css={toastStyle}>
          <span id="toast"></span>
        </div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={socialIconsVariant}
          css={socialIconsStyle}
        >
          <motion.a
            variants={item}
            href="https://github.com/vftiago"
            target="_blank"
            onMouseEnter={onButtonHover}
            onClick={onButtonClick}
          >
            <GithubIcon size={iconSize}></GithubIcon>
          </motion.a>
          <motion.a
            variants={item}
            onClick={handleMailIconClick}
            target="_blank"
            onMouseEnter={onButtonHover}
          >
            <MailIcon size={iconSize}></MailIcon>
          </motion.a>
          <motion.a
            variants={item}
            href="https://linkedin.com/in/vftiago"
            target="_blank"
            onMouseEnter={onButtonHover}
            onClick={onButtonClick}
          >
            <LinkedinIcon size={iconSize}></LinkedinIcon>
          </motion.a>
        </motion.div>
      </div>
      <div css={missionStatementStyle}>
        <p>take back control of your digital space.</p>
      </div>
    </Fragment>
  );
}

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

const leftColumnVariants = {
  visible,
  hidden: { opacity: 0, x: "-88px" },
};

const rightColumnVariants = {
  visible,
  hidden: { opacity: 0, x: "88px" },
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

const columnWidth = 80;
const logoSize = 36;

const mainContentStyle = css`
  top: 0;
  left: 0;
  display: flex;
  align-items: justify;
  justify-content: space-between;
  width: 100%;
  min-height: 100vh;
  flex-direction: column;
`;

const toastStyle = css`
  width: 253px;
  height: 16px;
`;

const centerPieceStyle = css`
  transform: rotate(-90deg);
`;

const headerStyle = css`
  width: 265px;
`;

const iconContainerStyle = css`
  height: ${logoSize + "px"};
  width: ${logoSize + "px"};
  margin: 16px 0 16px 0;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    cursor: pointer;
    svg {
      fill: ${accentColor};
    }
    &::after {
      background-color: ${accentColor};
    }
  }
  svg {
    transition: all 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
    fill: #666;
  }
  &::after {
    transition: all 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
    background-color: #666;
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: ${Math.sqrt(iconSize * iconSize + iconSize * iconSize) + "px"};
    height: 2px;
    margin-top: -1px;
    margin-left: ${-1 * iconSize * 0.75 + "px"};
    transform: rotate(-45deg) scaleX(0);
  }
`;

const mutedStyle = css`
  &::after {
    transform: rotate(-45deg) scaleX(1);
  }
`;

const columnStyle = css`
  position: fixed;
  z-index: 1;
  width: ${columnWidth + "px"};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  min-height: 100vh;
  background-color: rgba(88, 88, 88, 0.02);
`;

const leftColumn = css`
  ${columnStyle};
  border-right: 1px solid rgba(128, 128, 128, 0.1);
  img {
    height: ${logoSize + "px"};
    width: ${logoSize + "px"};
  }
`;

const rightColumn = css`
  ${columnStyle};
  right: 0;
  border-left: 1px solid rgba(128, 128, 128, 0.1);
`;

// const cornerCounterStyle = css`
//   position: absolute;
//   left: 128px;
//   bottom: 28px;
//   text-transform: uppercase;
//   z-index: 1;
//   background-color: rgba(88, 88, 88, 0.01);
// `;

// const labelStyle = css`
//   /* transform: rotate(-90deg); */
//   /* margin-bottom: -10px; */
//   letter-spacing: 0.165em;
//   font-size: 12px;
//   /* position: relative;
//   left: -46px;
//   bottom: 64px; */
//   width: 120px;
//   opacity: 0.4;
// `;

// const numStyle = css`
//   font-size: 24px;
//   font-weight: bold;
//   position: relative;
// `;

const socialIconsStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 200px;
  margin: 32px;
  a {
    height: ${iconSize + "px"};
    width: ${iconSize + "px"};
  }
  svg {
    transition: all 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
    /* margin: ${"0 " + iconSize + "px"}; */
    fill: #666;
    &:hover {
      cursor: pointer;
      fill: ${accentColor};
    }
  }
`;

const missionStatementStyle = css`
  top: 100vh;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const callToActionStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 200px;
  width: 100%;
  position: absolute;
  bottom: 0;
`;

export default App;
