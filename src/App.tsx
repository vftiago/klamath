/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Fragment, useEffect, useState } from "react";
import "./App.css";
import * as THREE from "three";
import logoImage from "./tf-small.png";
import Scene from "./Scene";
import LinkedinIcon from "./social-icons/LinkedinIcon";
import GithubIcon from "./social-icons/GithubIcon";
import MailIcon from "./social-icons/MailIcon";

const size = 22;

function App() {
  const [texture, setTexture] = useState<THREE.Texture>();

  useEffect(() => {
    const loadTexture = async () => {
      const loader = new THREE.TextureLoader();

      const texture: THREE.Texture = await loader.load(logoImage);

      setTexture(texture);

      const canvas = document.getElementById("canvas") as HTMLCanvasElement;

      Scene(texture, canvas);
    };

    if (!texture) {
      loadTexture();
    }
  }, [texture]);

  return (
    <Fragment>
      <canvas css={canvasStyle} id="canvas"></canvas>
      <main css={contentStyle}></main>
      <div css={callToActionStyle}>
        <header>tiago fernandes</header>
        <h1>front-end web developer</h1>
        <div css={socialIconsStyle}>
          <GithubIcon size={size}></GithubIcon>
          <MailIcon size={size}></MailIcon>
          <LinkedinIcon size={size}></LinkedinIcon>
        </div>
      </div>
      <div css={missionStatementStyle}>
        <p>take control of your digital life</p>
      </div>
    </Fragment>
  );
}

const canvasStyle = css`
  z-index: -1;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
`;

const contentStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
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
  height: 200px;
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
