/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Fragment, useEffect, useState } from "react";
import "./App.css";
import Scene from "./Scene";
import LinkedinIcon from "./social-icons/LinkedinIcon";
import GithubIcon from "./social-icons/GithubIcon";
import MailIcon from "./social-icons/MailIcon";
import logo from "./img/logo-256.png";
import ambient from "./audio/ambient.mp3";
import HeadphonesIcon from "./social-icons/Headphones";

const size = 16;

const copyToClipboard = () => {
  const dummy = document.createElement("input");
  document.body.appendChild(dummy);
  dummy.setAttribute("value", "test@gmail.com");
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);
};

function App() {
  useEffect(() => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    Scene(canvas);
  }, []);

  const [muted, setMuted] = useState(false)

  return (
    <Fragment>
      <audio src={ambient} autoPlay loop muted={muted}></audio>
      <canvas css={canvasStyle} id="canvas"></canvas>
      <main css={contentStyle}>
        <div css={leftColumn}>
          <img src={logo} alt="TF" />
        </div>
        {/* <div css={centerColumn}></div> */}
        <div css={rightColumn}>
          <div css={[headPhoneIconContainerStyle, muted && mutedStyle]} onClick={()=>{setMuted(!muted)}}>
            <HeadphonesIcon size={22}></HeadphonesIcon>
          </div>
        </div>
      </main>
      <div css={cornerCounterStyle}>
        <div css={labelStyle}>currently reading</div>
        <div css={numStyle}>Antifragile</div>
      </div>
      <div css={callToActionStyle}>
        <header>tiago fernandes</header>
        <h1>front-end web developer</h1>
        <div css={socialIconsStyle}>
          <a href="https://github.com/vftiago" target="_blank">
            <GithubIcon size={size}></GithubIcon>
          </a>
          <a onClick={copyToClipboard}>
            <MailIcon size={size}></MailIcon>
          </a>
          <a href="https://linkedin.com/in/vftiago" target="_blank">
            <LinkedinIcon size={size}></LinkedinIcon>
          </a>
        </div>
      </div>
      {/* <div css={missionStatementStyle}>
        <p>take control of your digital life</p>
      </div> */}
    </Fragment>
  );
}

const headPhoneIconContainerStyle = css`
  height: 22px;
  width: 22px;
  padding: 33px;
  position: relative;
    &::after {
      background-color: #666;
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      width: 31px;
      height: 2px;
      margin-top: -1px;
      margin-left: -15px;
      transition: all 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
      transform: rotate(-45deg) scaleX(0);
      width: 31px;
    }
`;

const mutedStyle = css`
 &::after {
  transform:  rotate(-45deg) scaleX(1);
 }
`;

const contentStyle = css`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: justify;
  justify-content: space-between;
  width: 100%;
  min-height: 100vh;
  flex-direction: row;
`;

const leftColumn = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: center;
  border-right: 2px solid rgba(128, 128, 128, 0.1);
  background-color: rgba(88, 88, 88, 0.03);
  min-height: 100vh;
  width: 88px;
  img {
    height: 36px;
    width: 36px;
    padding: 26px;
  }
`;

const cornerCounterStyle = css`
  position: absolute;
  left: 128px;
  bottom: 28px;
  text-transform: uppercase;
  z-index: 1;
`;

const labelStyle = css`
  transform: rotate(-90deg);
  margin-bottom: -10px;
  letter-spacing: 0.165em;
  font-size: 12px;
  position: relative;
  left: -46px;
  bottom: 64px;
  width: 120px;
  opacity: 0.4;
`;

const numStyle = css`
  font-size: 24px;
  font-weight: bold;
  position: relative;
`;

const centerColumn = css`
  border: 1px solid rgba(255, 136, 0, 0.7);
  background-color: rgba(88, 88, 88, 0.03);
  min-height: 100vh;
`;

const rightColumn = css`
  border-left: 2px solid rgba(128, 128, 128, 0.1);
  background-color: rgba(88, 88, 88, 0.03);
  min-height: 100vh;
  width: 88px;
  svg {
    /* padding: 33px; */
  }
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
  svg {
    padding: 8px;
    :hover {
      cursor: pointer;
    }
  }
`;

const missionStatementStyle = css`
  /* height: 200px; */
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
  h1 {
    font-size: 22px;
  }
`;

export default App;
