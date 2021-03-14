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

const iconSize = 18;

const accentColor = "#fa8072";

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

    copyToClipboard();

    onButtonClick();

    typed = new Typed("#toast", {
      strings: ["<u>hello@tiagofernandes.dev</u> copied to clipboard.", ""],
      backDelay: 3000,
      showCursor: false,
      fadeOut: true,
    });
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={variants}>
      <div css={leftColumn}>
        <div css={iconContainerStyle}>
          <Logo size={32}></Logo>
        </div>
        <div css={centerPieceStyle}>
          <header css={headerStyle}>
            tiago fernandes — front-end web developer
          </header>
        </div>
        <div css={iconContainerStyle}></div>
      </div>
      <div css={rightColumn}>
        <div css={iconContainerStyle}></div>
        <div
          css={[iconContainerStyle, muted && mutedStyle]}
          onMouseEnter={onButtonHover}
          onClick={onHeadphonesIconClick}
        >
          <HeadphonesIcon size={iconSize}></HeadphonesIcon>
        </div>
      </div>
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
        <div css={socialIconsStyle}>
          <a
            href="https://github.com/vftiago"
            target="_blank"
            onMouseEnter={onButtonHover}
            onClick={onButtonClick}
          >
            <GithubIcon size={iconSize}></GithubIcon>
          </a>
          <a
            onClick={handleMailIconClick}
            target="_blank"
            onMouseEnter={onButtonHover}
          >
            <MailIcon size={iconSize}></MailIcon>
          </a>
          <a
            href="https://linkedin.com/in/vftiago"
            target="_blank"
            onMouseEnter={onButtonHover}
            onClick={onButtonClick}
          >
            <LinkedinIcon size={iconSize}></LinkedinIcon>
          </a>
        </div>
      </div>
      <div css={missionStatementStyle}>
        <p>take back control of your digital space.</p>
      </div>
    </motion.div>
  );
}

const variants = {
  visible: {
    opacity: 1,
    cursor: "arrow",
    transition: {
      delay: 0.8,
      duration: 2.0,
      when: "beforeChildren",
      staggerChildren: 0.4,
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
  width: 287px;
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

const cornerCounterStyle = css`
  position: absolute;
  left: 128px;
  bottom: 28px;
  text-transform: uppercase;
  z-index: 1;
  background-color: rgba(88, 88, 88, 0.01);
`;

const labelStyle = css`
  /* transform: rotate(-90deg); */
  /* margin-bottom: -10px; */
  letter-spacing: 0.165em;
  font-size: 12px;
  /* position: relative;
  left: -46px;
  bottom: 64px; */
  width: 120px;
  opacity: 0.4;
`;

const numStyle = css`
  font-size: 24px;
  font-weight: bold;
  position: relative;
`;

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