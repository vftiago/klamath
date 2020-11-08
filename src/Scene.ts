import * as THREE from 'three';
import debounce from './utils/debounce';
import Util from './utils/util';
import ForceCamera from './utils/force-camera';
import { Clock } from 'three';
import Logo from './Logo';

const ASTEROID_COUNT = 8;

const Scene = (texture: THREE.Texture) => {
  const clock = new Clock();

  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  if (!canvas) return;


  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: canvas,
  });
  const scene = new THREE.Scene();
  const camera = new ForceCamera(35, window.innerWidth / window.innerHeight, 1, 10000);

  let background = null;
  let outerSphere: any = null;
  let asteroidField: any = null;
  let logo: any = null;
  let light = new THREE.DirectionalLight(0xff0000, 1);

  const createAsteroidField = function() {
    const geometry_base = new THREE.SphereBufferGeometry(2, 6, 4);
    const attr = geometry_base.attributes;
    const geometry = new THREE.BufferGeometry();
    const vertices_base = [];
    const radiuses_base = [];
    const radians_base = [];
    const scales_base = [];
    const indices_base: number[] = [];
    for (let i = 0; i < ASTEROID_COUNT; i ++) {
      const radius = Util.getRandomInt(300, 1000);
      const radian = Util.getRadian(Util.getRandomInt(0, 3600) / 10);
      const scale = Util.getRandomInt(60, 120) / 100;
      for (let j = 0; j < attr.position.array.length; j += 3) {
        vertices_base.push(
          attr.position.array[j + 0],
          attr.position.array[j + 1],
          attr.position.array[j + 2]
        );
        radiuses_base.push(radius);
        radians_base.push(radian);
        scales_base.push(scale);
      }

      Object.values(geometry_base!.index!.array).map((item: number) => {
        return indices_base.push(item + i * attr.position.array.length / 3)
      });
    }
    const vertices = new Float32Array(vertices_base);
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    const radius = new Float32Array(radiuses_base);
    geometry.setAttribute('radius', new THREE.BufferAttribute(radius, 1));
    const radians = new Float32Array(radians_base);
    geometry.setAttribute('radian', new THREE.BufferAttribute(radians, 1));
    const scales = new Float32Array(scales_base);
    geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));
    const indices = new Uint32Array(indices_base);
    geometry.setIndex(new THREE.BufferAttribute(indices, 1));
    const material = new THREE.ShaderMaterial({
      uniforms: THREE.UniformsUtils.merge([
        THREE.UniformsLib['lights'],
        {
          time: {
            type: 'f',
            value: 0,
          },
        }
      ]),
      vertexShader: require('./glsl/object.vert').default,
      fragmentShader: require('./glsl/object.frag').default,
      flatShading: true,
      lights: true,
    });
    return new THREE.Mesh(geometry, material);
  };

  const createBackground = function() {
    const geometry = new THREE.SphereGeometry(1200, 64, 64);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: {
          value: 0,
        },
      },
      vertexShader: require('./glsl/bg.vert').default,
      fragmentShader: require('./glsl/bg.frag').default,
      side: THREE.BackSide,
    });
    return new THREE.Mesh(geometry, material);
  };

  const createOuterSphere = function() {
    const geometry = new THREE.SphereGeometry(1100, 92, 92);
    const material = new THREE.MeshBasicMaterial({
      color: 0xdddddd,
      wireframe: true
    });
    return new THREE.Mesh(geometry, material);
  };

  const initSketch = () => {
    logo = Logo(texture);
    logo.mesh.position.y = 100;
    logo.mesh.rotation.x = -0.4;
    // logo.mesh.rotation.y = 1.5;


    // logo.mesh.position.anchor.set(1, 1, 0);
    // logo.mesh.rotation.set(0,1.5,0)
    scene.add(logo.mesh);
    background = createBackground();
    scene.add(background);
    outerSphere = createOuterSphere();
    scene.add(outerSphere);
    asteroidField = createAsteroidField();
    scene.add(asteroidField);
    light.position.set(0, 1, 0)
    scene.add(light);

    camera.force.position.anchor.set(0, 400, 1000);
    // camera.force.look.anchor.set(0, 0, 0);
  }

  //
  // common process
  //
  const resizeWindow = () => {
    canvas.width = document.body.clientWidth;
    canvas.height = window.innerHeight;
    camera.aspect = document.body.clientWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(document.body.clientWidth, window.innerHeight);
  }

  const render = (elapsedTime: number) => {
    outerSphere.rotation.y = elapsedTime / 20;
    asteroidField.material.uniforms.time.value = elapsedTime * 20;
    logo.material.uniforms.time.value += elapsedTime * 20;
    camera.force.position.applyHook(0, 0.05);
    camera.force.position.applyDrag(0.8);
    camera.force.position.updateVelocity();
    camera.updatePosition();
    // camera.force.look.anchor.y = Math.sin(elapsedTime / 20) * 100;
    // camera.force.look.applyHook(0, 0.2);
    // camera.force.look.applyDrag(0.4);
    camera.updateLook();
    renderer.setRenderTarget(null);
    renderer.render(scene, camera);
  }
  const renderLoop = () => {
    render(clock.getElapsedTime());
    requestAnimationFrame(renderLoop);
  }
  const on = () => {
    window.addEventListener('resize', debounce(() => {
      resizeWindow();
    }, 1));
  }

  const init = () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xeeeeee, 0.0);
    // camera.position.set(1000, 1000, 1000);
    camera.lookAt(new THREE.Vector3());

    on();
    initSketch();
    resizeWindow();
    renderLoop();
  }
  init();
}

export default Scene;