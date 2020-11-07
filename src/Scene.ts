import * as THREE from 'three';
import debounce from './utils/debounce';
import Util from './utils/util';
import Force2 from './utils/force2';
import ForceCamera from './utils/force-camera';

const normalizeVector2 = function(vector: { x: number; y: number}) {
  vector.x = (vector.x / document.body.clientWidth) * 2 - 1;
  vector.y = - (vector.y / window.innerHeight) * 2 + 1;
};

const Scene = () => {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  if (!canvas) return;


  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: canvas,
  });
  const scene = new THREE.Scene();
  console.log(ForceCamera)
  const camera = new ForceCamera(35, window.innerWidth / window.innerHeight, 1, 10000);

  let points: any = null;
  let bg = null;
  let bg_wf: any = null;
  let obj: any = null;
  let light = new THREE.DirectionalLight(0xffffff, 1);

  let sub_scene = new THREE.Scene();
  let sub_camera = new ForceCamera(45, 1, 1, 10000);
  let render_target = new THREE.WebGLRenderTarget(1200, 1200);
  // let framebuffer: any = null;

  let sub_scene2 = new THREE.Scene();
  let sub_camera2 = new ForceCamera(45, 1, 1, 10000);
  let sub_light = new THREE.HemisphereLight(0xfffffff, 0xcccccc, 1);
  let render_target2 = new THREE.WebGLRenderTarget(1200, 1200);
  let bg_fb: any = null;
  let points_fb: any = null;

  const force = new Force2();

  const createPointsForCrossFade = function() {
    const geometry = new THREE.BufferGeometry();
    const vertices_base = [];
    const radians_base = [];
    for (let i = 0; i < 32; i ++) {
      const x = 0;
      const y = 0;
      const z = 0;
      vertices_base.push(x, y, z);
      const r1 = Util.getRadian(Util.getRandomInt(0, 360));
      const r2 = Util.getRadian(Util.getRandomInt(0, 360));
      const r3 = Util.getRadian(Util.getRandomInt(0, 360));
      radians_base.push(r1, r2, r3);
    }
    const vertices = new Float32Array(vertices_base);
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    const radians = new Float32Array(radians_base);
    geometry.setAttribute('radian', new THREE.BufferAttribute(radians, 3));
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: {
          // type: 'f',
          value: 0.0
        },
        resolution: {
          // type: 'v2',
          value: new THREE.Vector2(window.innerWidth, window.innerHeight)
        },
        size: {
          // type: 'f',
          value: 28.0
        },
        force: {
          // type: 'v2',
          value: force.velocity,
        },
      },
      vertexShader: require('./glsl/points.vert').default,
      fragmentShader: require('./glsl/points.frag').default,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    return new THREE.Points(geometry, material);
  };

  const createObject = function() {
    const geometry_base = new THREE.SphereBufferGeometry(2, 4, 4);
    const attr = geometry_base.attributes;
    const geometry = new THREE.BufferGeometry();
    const vertices_base = [];
    const radiuses_base = [];
    const radians_base = [];
    const scales_base = [];
    const indices_base: number[] = [];
    for (let i = 0; i < 16; i ++) {
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

  const createPointsInFramebuffer = function() {
    const geometry = new THREE.BufferGeometry();
    const vertices_base = [];
    for (let i = 0; i < 2000; i++) {
      vertices_base.push(
        Util.getRadian(Util.getRandomInt(0, 120) + 120),
        Util.getRadian(Util.getRandomInt(0, 3600) / 10),
        Util.getRandomInt(200, 1000)
      );
    }
    const vertices = new Float32Array(vertices_base);
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: {
          // type: 'f',
          value: 0,
        },
      },
      vertexShader: require('./glsl/fb_points.vert').default,
      fragmentShader: require('./glsl/fb_points.frag').default,
    });
    return new THREE.Points(geometry, material);
  };

  const createBackgroundInFramebuffer = function() {
    const geometry_base = new THREE.SphereGeometry(1000, 128, 128);
    const geometry = new THREE.BufferGeometry();
    geometry.fromGeometry(geometry_base);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: {
          // type: 'f',
          value: 0,
        },
      },
      vertexShader: require('./glsl/fb_bg.vert').default,
      fragmentShader: require('./glsl/fb_bg.frag').default,
      side: THREE.BackSide,
    });
    return new THREE.Mesh(geometry, material);
  };

  // const createPlaneForFramebuffer = function() {
  //   const geometry_base = new THREE.PlaneGeometry(1000, 1000);
  //   const geometry = new THREE.BufferGeometry();
  //   geometry.fromGeometry(geometry_base);
  //   const material = new THREE.ShaderMaterial({
  //     uniforms: {
  //       time: {
  //         // type: 'f',
  //         value: 0,
  //       },
  //       resolution: {
  //         // type: 'v2',
  //         value: new THREE.Vector2(window.innerWidth, window.innerHeight)
  //       },
  //       texture: {
  //         // type: 't',
  //         value: render_target.texture,
  //       },
  //       texture2: {
  //         // type: 't',
  //         value: render_target2.texture,
  //       },
  //     },
  //     vertexShader: require('./glsl/fb.vert').default,
  //     fragmentShader: require('./glsl/fb.frag').default,
  //     transparent: true
  //   });
  //   return new THREE.Mesh(geometry, material);
  // };

  const initSketch = () => {
    force.anchor.set(1, 0);

    sub_camera2.force.position.anchor.set(1000, 300, 0);
    sub_camera2.force.look.anchor.set(0, 0, 0);
    bg_fb = createBackgroundInFramebuffer();
    points_fb = createPointsInFramebuffer();
    sub_scene2.add(bg_fb);
    sub_scene2.add(points_fb);
    sub_scene2.add(sub_light);

    points = createPointsForCrossFade();
    sub_scene.add(points);
    sub_camera.position.set(0, 0, 3000);
    sub_camera.force.look.anchor.set(0, 0, 0);

    // framebuffer = createPlaneForFramebuffer();
    // scene.add(framebuffer);
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
    points.material.uniforms.resolution.value.set(window.innerWidth, window.innerHeight);
    // framebuffer.material.uniforms.resolution.value.set(window.innerWidth, window.innerHeight);
  }
  const render = () => {
    points.material.uniforms.time.value++;
    // framebuffer.lookAt(camera.position);
    // framebuffer.material.uniforms.time.value++;

    bg_fb.material.uniforms.time.value++;
    points_fb.material.uniforms.time.value++;

    bg_wf.rotation.y = points.material.uniforms.time.value / 1000;
    obj.material.uniforms.time.value++;

    force.applyHook(0, 0.12);
    force.applyDrag(0.18);
    force.updateVelocity();
    camera.force.position.applyHook(0, 0.025);
    camera.force.position.applyDrag(0.2);
    camera.force.position.updateVelocity();
    camera.updatePosition();
    camera.force.look.anchor.y = Math.sin(points.material.uniforms.time.value / 100) * 100;
    camera.force.look.applyHook(0, 0.2);
    camera.force.look.applyDrag(0.4);
    camera.updateLook();
    sub_camera2.force.position.applyHook(0, 0.1);
    sub_camera2.force.position.applyDrag(0.2);
    sub_camera2.force.position.updateVelocity();
    sub_camera2.updatePosition();
    sub_camera2.force.look.applyHook(0, 0.2);
    sub_camera2.force.look.applyDrag(0.4);
    sub_camera2.force.look.updateVelocity();
    sub_camera2.updateLook();
    renderer.setRenderTarget(render_target2);
    renderer.render(sub_scene2, sub_camera2);
    renderer.setRenderTarget(render_target);
    renderer.render(sub_scene, sub_camera);
    renderer.setRenderTarget(null);
    renderer.render(scene, camera);
  }
  const renderLoop = () => {
    render();
    requestAnimationFrame(renderLoop);
  }
  const on = () => {
    const vectorTouchStart = new THREE.Vector2();
    const vectorTouchMove = new THREE.Vector2();
    const vectorTouchEnd = new THREE.Vector2();

    const touchStart = (x: number, y: number) => {
      vectorTouchStart.set(x, y);
      normalizeVector2(vectorTouchStart);
      force.anchor.set(2, 30);
    };
    const touchMove = (x: number, y: number) => {
      vectorTouchMove.set(x, y);
      normalizeVector2(vectorTouchMove);
    };
    const touchEnd = (x: number, y: number) => {
      vectorTouchEnd.set(x, y);
      force.anchor.set(1, 0);
    };
    const mouseOut = () => {
      vectorTouchEnd.set(0, 0);
      force.anchor.set(1, 0);
    };

    window.addEventListener('resize', debounce(() => {
      resizeWindow();
    }, 1000));
    canvas.addEventListener('mousedown', function (event) {
      event.preventDefault();
      touchStart(event.clientX, event.clientY);
    });
    canvas.addEventListener('mousemove', function (event) {
      event.preventDefault();
      touchMove(event.clientX, event.clientY);
    });
    canvas.addEventListener('mouseup', function (event) {
      event.preventDefault();
      touchEnd(event.clientX, event.clientY);
    });
    canvas.addEventListener('touchstart', function (event) {
      event.preventDefault();
      touchStart(event.touches[0].clientX, event.touches[0].clientY);
    });
    canvas.addEventListener('touchmove', function (event) {
      event.preventDefault();
      touchMove(event.touches[0].clientX, event.touches[0].clientY);
    });
    canvas.addEventListener('touchend', function (event) {
      event.preventDefault();
      touchEnd(event.changedTouches[0].clientX, event.changedTouches[0].clientY);
    });
    window.addEventListener('mouseout', function (event) {
      event.preventDefault();
      mouseOut();
    });
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