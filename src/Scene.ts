import * as THREE from 'three';
import debounce from './utils/debounce';
import { Clock, PerspectiveCamera } from 'three';
import createLogo from './logo';
import createBackground from './background';
import createOuterSphere from './sphere';

const Scene = (texture: THREE.Texture, canvas: HTMLCanvasElement) => {
  const clock = new Clock();

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: canvas,
  });
  const scene = new THREE.Scene();
  const camera = new PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000);

  let background = null;
  let outerSphere: any = null;
  let logo: any = null;

  const createScene = () => {
    logo = createLogo(texture);
    logo.mesh.position.y = 133;
    logo.mesh.rotation.x = -0.4;
    scene.add(logo.mesh);

    background = createBackground();
    scene.add(background);

    outerSphere = createOuterSphere();
    scene.add(outerSphere);

    camera.position.set(0, 400, 1000);
    camera.lookAt(0, 1, 0)
  }

  const resizeWindow = () => {
    canvas.width = document.body.clientWidth;
    canvas.height = window.innerHeight;
    camera.aspect = document.body.clientWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(document.body.clientWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
  }

  const render = (elapsedTime: number) => {
    outerSphere.rotation.y = elapsedTime / 20;
    logo.material.uniforms.time.value += elapsedTime / 20;
    renderer.setRenderTarget(null);
    renderer.render(scene, camera);
  }
  

  const renderLoop = () => {
    render(clock.getElapsedTime());
    requestAnimationFrame(renderLoop);
  }

  function updateCamera() {
    camera.lookAt(0, -800, 0)
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