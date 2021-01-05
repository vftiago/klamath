/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Fragment, useEffect } from "react";
import "./App.css";
import Scene from "./Scene";
import LinkedinIcon from "./social-icons/LinkedinIcon";
import GithubIcon from "./social-icons/GithubIcon";
import MailIcon from "./social-icons/MailIcon";
import logo from "./img/logo-256.png";

const size = 16;

function App() {
  useEffect(() => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    Scene(canvas);
  }, []);

  return (
    <Fragment>
      <main css={contentStyle}>
        <div css={leftColumn}>
          <img src={logo} alt="TF" />
        </div>
        <div css={rightColumn}></div>
      </main>
      <canvas css={canvasStyle} id="canvas"></canvas>
      <div css={callToActionStyle}>
        <header>tiago fernandes</header>
        <h1>front-end web developer</h1>
        <div css={socialIconsStyle}>
          <GithubIcon size={size}></GithubIcon>
          <MailIcon size={size}></MailIcon>
          <LinkedinIcon size={size}></LinkedinIcon>
        </div>
      </div>
      {/* <div css={missionStatementStyle}>
        <p>take control of your digital life</p>
      </div> */}
    </Fragment>
  );
}

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
  align-items: justify;
  align-content: center;
  border-right: 2px solid rgba(128, 128, 128, 0.1);
  background-color: rgba(88, 88, 88, 0.03);
  min-height: 100vh;
  width: 88px;
  img {
    height: 44px;
    width: 44px;
    padding: 22px;
  }
`;

const rightColumn = css`
  border-left: 2px solid rgba(128, 128, 128, 0.1);
  background-color: rgba(88, 88, 88, 0.03);
  min-height: 100vh;
  width: 88px;
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
