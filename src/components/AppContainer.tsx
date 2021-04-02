/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Fragment, useEffect, useRef, useState } from "react";
import App from "./App";
import Prologue from "./Prologue";
import Scene from "./scene/Scene";
import buttonClick from "../assets/audio/button-click.mp3";
import buttonHover from "../assets/audio/button-hover.mp3";
import playSound from "../utils/playSound";
import stringObject from "../assets/obj/object.obj";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import * as THREE from "three";
import fragmentShader from "../assets/glsl/object.frag";
import vertexShader from "../assets/glsl/object.vert";

const material = new THREE.RawShaderMaterial({
  wireframe: true,
  fragmentShader,
  vertexShader,
});

const loadObject = async (cb: (obj: THREE.Group) => void) => {
  const loader = new OBJLoader();

  await loader.load(stringObject, (object: THREE.Group) => {
    object.traverse(function (child) {
      if (child instanceof THREE.Mesh) {
        child.material = material;
      }
    });

    cb(object);
  });
};

function AppContainer() {
  const [ready, setReady] = useState(false);
  const [muted, setMuted] = useState(true);
  const [object, setObject] = useState<THREE.Group | null>(null);

  const buttonClickAudioElement = useRef(null);
  const buttonHoverAudioElement = useRef(null);

  const handleVisibilityChange = () => {
    document.hidden ? setMuted(true) : setMuted(false);
  };

  useEffect(() => {
    document.addEventListener("visibilitychange", handleVisibilityChange);

    if (!object)
      loadObject((object) => {
        setObject(object);
      });

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const onHeadphonesIconClick = () => {
    setMuted(!muted);
  };

  return (
    <Fragment>
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
      {object && <Scene object={object} />}
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
          onModalVisible={() => {
            setMuted(false);
          }}
          onReady={() => {
            setMuted(false);
            setReady(true);
          }}
          onButtonClick={() => {
            playSound(buttonClickAudioElement);
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
