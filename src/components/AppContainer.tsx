/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Fragment, useRef, useState } from "react";
import App from "./App";
import Prologue from "./Prologue";
import Scene from "./scene/Scene";
import ambient from "../assets/audio/ambient.mp3";
import buttonClick from "../assets/audio/button-click.mp3";
import buttonHover from "../assets/audio/button-hover.mp3";
import playSound from "../utils/playSound";

function AppContainer() {
  const [ready, setReady] = useState(false);
  const [muted, setMuted] = useState(false);

  const ambientAudioElement = useRef(null);
  const buttonClickAudioElement = useRef(null);
  const buttonHoverAudioElement = useRef(null);

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      setMuted(true);
    } else {
      setMuted(false);
    }
  });

  const onHeadphonesIconClick = () => {
    setMuted(!muted);
  };

  return (
    <Fragment>
      <audio src={ambient} ref={ambientAudioElement} loop muted={muted}></audio>
      <audio
        src={buttonClick}
        ref={buttonClickAudioElement}
        muted={muted}
      ></audio>
      <audio
        src={buttonHover}
        ref={buttonHoverAudioElement}
        muted={muted}
      ></audio>
      <Scene />
      {ready ? (
        <App
          muted={muted}
          onHeadphonesIconClick={onHeadphonesIconClick}
          onButtonClick={() => {
            playSound(buttonClickAudioElement);
          }}
          onButtonHover={() => {
            playSound(buttonHoverAudioElement);
          }}
        />
      ) : (
        <Prologue
          onButtonClick={() => {
            playSound(buttonClickAudioElement);
            playSound(ambientAudioElement);
            setReady(true);
          }}
          onButtonHover={() => {
            playSound(buttonHoverAudioElement);
          }}
        />
      )}
    </Fragment>
  );
}

export default AppContainer;
