/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useEffect } from "react";
import * as THREE from "three";
import { PerspectiveCamera } from "three";
import debounce from "../../utils/debounce";
// import createBackground from "./objects/background";
import createPostEffect from "./objects/postEffect";
import createWavyPlane from "./objects/WavyPlane";

const Scene = ({ object }: { object: THREE.Group | null }) => {
  useEffect(() => {
    let scene = new THREE.Scene();

    const canvas = document.getElementById("canvas") as HTMLCanvasElement;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: canvas,
    });

    const backgroundRenderer = new THREE.WebGLRenderTarget(
      document.body.clientWidth,
      window.innerHeight,
    );

    const foregroundScene = new THREE.Scene();

    const foregroundCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const camera = new PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      1,
      10000,
    );

    let background = null;
    let postEffect: any = null;
    let wavyPlane: any = null;

    const createScene = () => {
      postEffect = createPostEffect(backgroundRenderer.texture);
      foregroundScene.add(postEffect);

      // background = createBackground();
      // scene.add(background);

      wavyPlane = createWavyPlane();
      wavyPlane.position.set(0, -128, 0);
      wavyPlane.rotation.set((-90 * Math.PI) / 180, 0, 0);
      scene.add(wavyPlane);

      if (object) {
        scene.add(object.children[0]);
      }

      camera.position.set(0, 0, 1024);
      // camera.lookAt(0, -128, 0);
    };

    const resizeWindow = () => {
      canvas.width = document.body.clientWidth;
      canvas.height = window.innerHeight;
      camera.aspect = document.body.clientWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(document.body.clientWidth, window.innerHeight);
      backgroundRenderer.setSize(document.body.clientWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setClearColor(0xeeeeee, 1.0);
      postEffect.material.uniforms.resolution.value.set(
        document.body.clientWidth,
        window.innerHeight,
      );
    };

    const render = () => {
      wavyPlane.material.uniforms.time.value += 0.01;

      postEffect.material.uniforms.time.value += 0.05;
      renderer.setRenderTarget(backgroundRenderer);
      renderer.render(scene, camera);
      renderer.setRenderTarget(null);
      renderer.render(foregroundScene, foregroundCamera);
    };

    const renderLoop = () => {
      render();
      requestAnimationFrame(renderLoop);
    };

    function updateCamera() {
      camera.position.y = -window.pageYOffset / 4;
    }

    window.addEventListener("scroll", updateCamera);

    const on = () => {
      window.addEventListener(
        "resize",
        debounce(() => {
          resizeWindow();
        }, 1),
      );
    };

    const init = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0xeeeeee, 0.0);

      on();
      createScene();
      resizeWindow();
      renderLoop();
    };
    init();
  }, []);

  return <canvas css={canvasStyle} id="canvas"></canvas>;
};

const canvasStyle = css`
  z-index: -1;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
`;

export default Scene;
