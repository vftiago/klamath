import React, { Fragment, useEffect, useState } from "react";
import "./App.css";
import * as THREE from "three";
import logoImage from "./tf666.png";
import Scene from "./Scene";

function App() {
  const [texture, setTexture] = useState<THREE.Texture>();

  useEffect(() => {
    const loadTexture = async () => {
      const loader = new THREE.TextureLoader();

      const texture: THREE.Texture = await loader.load(logoImage);

      setTexture(texture);

      Scene(texture);
    };

    if (!texture) {
      loadTexture();
    }
  }, [texture]);

  return (
    <Fragment>
      <canvas id="canvas"></canvas>
    </Fragment>
  );
}

export default App;
