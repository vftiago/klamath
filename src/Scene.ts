import * as THREE from 'three';
import debounce from './utils/debounce';
import Util from './utils/util';
import Force2 from './utils/force2';
import ForceCamera from './utils/force-camera';

const ASTEROID_COUNT = 8;

const Scene = () => {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  if (!canvas) return;


  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: canvas,
  });
  const scene = new THREE.Scene();
  const camera = new ForceCamera(35, window.innerWidth / window.innerHeight, 1, 10000);

  let bg = null;
  let bg_wf: any = null;
  let obj: any = null;
  let light = new THREE.DirectionalLight(0xffffff, 1);

  const force = new Force2();

  const createObject = function() {
    const geometry_base = new THREE.SphereBufferGeometry(2, 4, 4);
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
          // type: 'f',
          value: 0,
        },
      },
      vertexShader: require('./glsl/bg.vert').default,
      fragmentShader: require('./glsl/bg.frag').default,
      side: THREE.BackSide,
    });
    return new THREE.Mesh(geometry, material);
  };

  const createBackgroundWire = function() {
    const geometry = new THREE.SphereGeometry(1100, 64, 64);
    const material = new THREE.MeshBasicMaterial({
      color: 0xdddddd,
      wireframe: true
    });
    return new THREE.Mesh(geometry, material);
  };

  const initSketch = () => {
    force.anchor.set(1, 0);
    bg = createBackground();
    scene.add(bg);
    bg_wf = createBackgroundWire();
    scene.add(bg_wf);
    obj = createObject();
    scene.add(obj);
    light.position.set(0, 1, 0)
    scene.add(light);
    camera.force.position.anchor.set(1000, 300, 0);
    camera.force.look.anchor.set(0, 0, 0);
  }

  //
  // common process
  //
  const resizeWindow = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  const render = () => {
    obj.material.uniforms.time.value++;

    force.applyHook(0, 0.12);
    force.applyDrag(0.18);
    force.updateVelocity();
    camera.force.position.applyHook(0, 0.025);
    camera.force.position.applyDrag(0.2);
    camera.force.position.updateVelocity();
    camera.updatePosition();
    camera.force.look.applyHook(0, 0.2);
    camera.force.look.applyDrag(0.4);
    camera.updateLook();
    renderer.setRenderTarget(null);
    renderer.render(scene, camera);
  }
  const renderLoop = () => {
    render();
    requestAnimationFrame(renderLoop);
  }
  const on = () => {
    window.addEventListener('resize', debounce(() => {
      resizeWindow();
    }, 100));
  }

  const init = () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xeeeeee, 0.0);
    camera.position.set(1000, 1000, 1000);
    camera.lookAt(new THREE.Vector3());

    on();
    initSketch();
    resizeWindow();
    renderLoop();
  }
  init();
}

export default Scene;