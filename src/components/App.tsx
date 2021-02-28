/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Fragment, useEffect, useState } from "react";
import Scene from "./Scene";
import LinkedinIcon from "./social-icons/LinkedinIcon";
import GithubIcon from "./social-icons/GithubIcon";
import Logo from "./social-icons/Logo";
import HeadphonesIcon from "./social-icons/Headphones";
import MailIcon from "./social-icons/MailIcon";
import ambient from "../assets/audio/ambient.mp3";
import Typed from "typed.js";

const iconSize = 18;

const accentColor = "#fa8072";

let typed: any;

function App() {
  useEffect(() => {
    Scene();
  }, [ambient]);

  const [muted, setMuted] = useState(false);

  const copyToClipboard = () => {
    if (typed) typed.destroy();
    const dummyInput = document.createElement("input");
    document.body.appendChild(dummyInput);
    dummyInput.setAttribute("value", "hello@tiagofernandes.dev");
    dummyInput.select();
    document.execCommand("copy");
    document.body.removeChild(dummyInput);
    typed = new Typed("#toast", {
      strings: ["<u>hello@tiagofernandes.dev</u> copied to clipboard.", ""],
      backDelay: 3000,
      showCursor: false,
      fadeOut: true,
    });
  };

  return (
    <Fragment>
      <audio
        autoPlay
        loop
        muted={muted}
        onLoad={() => {
          console.log("audio loaded.");
        }}
        onPlay={() => {
          console.log("audio playing.");
        }}
      >
        <source src={ambient} type="audio/mp3" />
      </audio>
      <canvas css={canvasStyle} id="canvas"></canvas>
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
          onClick={() => {
            setMuted(!muted);
          }}
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
          <a href="https://github.com/vftiago" target="_blank">
            <GithubIcon size={iconSize}></GithubIcon>
          </a>
          <a onClick={copyToClipboard} target="_blank">
            <MailIcon size={iconSize}></MailIcon>
          </a>
          <a href="https://linkedin.com/in/vftiago" target="_blank">
            <LinkedinIcon size={iconSize}></LinkedinIcon>
          </a>
        </div>
      </div>
      <div css={missionStatementStyle}>
        <p>take back control of your digital space.</p>
      </div>
    </Fragment>
  );
}

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

const canvasStyle = css`
  z-index: -1;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
`;

const socialIconsStyle = css`
  display: flex;
  align-items: center;
  margin: 32px;
  svg {
    transition: all 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
    margin: ${"0 " + iconSize + "px"};
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
