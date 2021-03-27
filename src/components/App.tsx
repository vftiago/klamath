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
import { iconSize, logoSize } from "../common/breakpoints";
import VisibilitySensor from "react-visibility-sensor";

const accentColor = "#fa8072";

const email = "tiago@infodump.xyz";

let typedExternalLink: Typed;
let typedMail: Typed;
let typedMissionStatement: Typed;

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
    if (typedMail) typedMail.destroy();

    copyToClipboard(email);

    onButtonClick();

    typedMail = new Typed("#toast", {
      strings: [`<u>${email}</u> copied to clipboard.`, ""],
      typeSpeed: 1,
      backDelay: 3000,
      showCursor: false,
      fadeOut: true,
    });
  };

  const handleMissionStatementVisibilityChange = (isVisible: boolean) => {
    // console.log("Element is now %s", isVisible ? "visible" : "hidden");
    if (isVisible) {
      if (typedMissionStatement) return;

      typedMissionStatement = new Typed("#mission-statement", {
        strings: [`take back control of your digital <span>space.</span>`],
        typeSpeed: 10,
        showCursor: false,
      });
    }
  };

  const handleLogoClick = () => {
    if (typedExternalLink) typedExternalLink.destroy();

    copyToClipboard(email);

    onButtonClick();

    typedExternalLink = new Typed("#external-link", {
      strings: [
        `<p>go to <a href="https://lightradius.com" target="_blank">lightradius.com</a> →</p>`,
        "",
      ],
      typeSpeed: 1,
      backDelay: 6000,
      showCursor: false,
      fadeOut: true,
    });
  };

  return (
    <Fragment>
      <div
        id="external-link"
        css={css`
          height: 68px;
          display: flex;
          align-items: center;
          position: fixed;
          left: 100px;
          p {
            font-size: 14px;
            margin: 0 8px;
          }
          a {
            color: ${accentColor};
          }
        `}
      ></div>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={leftColumnVariants}
        css={leftColumn}
      >
        <div css={iconContainerStyle} onClick={handleLogoClick}>
          <Logo size={logoSize}></Logo>
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
      <motion.div
        css={callToActionStyle}
        initial="hidden"
        animate="visible"
        variants={socialIconsVariant}
      >
        <div css={toastStyle}>
          <span id="toast"></span>
        </div>
        <div css={socialIconsStyle}>
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
        </div>
        <motion.div css={waterfallStyle} variants={item}>
          <span></span>
          <span></span>
          <span></span>
        </motion.div>
      </motion.div>
      <VisibilitySensor onChange={handleMissionStatementVisibilityChange}>
        <div css={missionStatementStyle}>
          <div>
            <p id="mission-statement"></p>
          </div>
        </div>
      </VisibilitySensor>
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
  box-shadow: 3px 3px 3px 0px rgba(88, 88, 88, 0.03);
  img {
    height: ${logoSize + "px"};
    width: ${logoSize + "px"};
  }
`;

const rightColumn = css`
  ${columnStyle};
  right: 0;
  border-left: 1px solid rgba(128, 128, 128, 0.1);
  box-shadow: -3px 3px 3px 0px rgba(88, 88, 88, 0.03);
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
  height: 30vh;
  div {
    width: 241px;
  }
  span {
    color: ${accentColor};
  }
`;

const callToActionStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 300px;
  width: 100%;
  position: absolute;
  bottom: 0;
`;

const waterfallStyle = css`
  @keyframes waterfall {
    0% {
      transform: translateY(-100.5%);
    }
    100% {
      transform: translateY(100.5%);
    }
  }
  width: 15px;
  height: 40px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  span {
    width: 1px;
    height: 100%;
    position: absolute;
    top: 0;
    background-color: #888;
    animation-name: waterfall;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    &:nth-child(1) {
      left: 0;
    }
    &:nth-child(2) {
      left: 50%;
      margin-left: -1px;
      animation-delay: 0.3s;
    }
    &:nth-child(3) {
      right: 0;
      animation-delay: 0.15s;
    }
  }
`;

export default App;
