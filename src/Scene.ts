import * as THREE from 'three';
import debounce from './utils/debounce';
import { PerspectiveCamera } from 'three';
import createBackground from './objects/background';
// import createOuterSphere from './objects/outerSphere';
import createPostEffect from './objects/postEffect';
import createInnerSphere from './objects/innerSphere';

const Scene = (canvas: HTMLCanvasElement) => {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: canvas,
  });

  const backgroundRenderer = new THREE.WebGLRenderTarget(
    document.body.clientWidth,
    window.innerHeight,
  );
  
  const foregroundScene = new THREE.Scene();
  const scene = new THREE.Scene();

  const foregroundCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const camera = new PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000);

  let background = null;
  let innerSphere: any = null;
  let postEffect: any = null;

  const createScene = () => {
    background = createBackground();
    scene.add(background);

    // outerSphere = createOuterSphere();
    // scene.add(outerSphere);

    innerSphere = createInnerSphere();
    scene.add(innerSphere);

    innerSphere.position.y += 100;

    postEffect = createPostEffect(backgroundRenderer.texture);
    foregroundScene.add(postEffect);

    camera.position.set(0, 400, 1000);
    camera.lookAt(0, 1, 0)
  }

  const resizeWindow = () => {
    canvas.width = document.body.clientWidth;
    canvas.height = window.innerHeight;
    camera.aspect = document.body.clientWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(document.body.clientWidth, window.innerHeight);
    backgroundRenderer.setSize(document.body.clientWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x111111, 1.0);
    postEffect.material.uniforms.resolution.value.set(document.body.clientWidth, window.innerHeight)
  }

  const render = () => {
    // outerSphere.rotation.y += 0.0003;
    innerSphere.rotation.x -= 0.001;
    innerSphere.rotation.y -= 0.001;
    innerSphere.rotation.z -= 0.001;
    postEffect.material.uniforms.time.value += 0.05;

    renderer.setRenderTarget(backgroundRenderer);
    renderer.render(scene, camera);
    renderer.setRenderTarget(null);
    renderer.render(foregroundScene, foregroundCamera);
  }
  

  const renderLoop = () => {
    render();
    requestAnimationFrame(renderLoop);
  }

  function updateCamera() {
    camera.lookAt(0, -window.pageYOffset * 4, 0)
    // camera.position.y = 400 - window.pageYOffset / 2;
  }

  window.addEventListener("scroll", updateCamera);
  
  const on = () => {
    window.addEventListener('resize', debounce(() => {
      resizeWindow();
    }, 1));
  }

  const init = () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xeeeeee, 0.0);
    camera.lookAt(new THREE.Vector3());

    on();
    createScene();
    resizeWindow();
    renderLoop();
  }
  init();
}

export default Scene;