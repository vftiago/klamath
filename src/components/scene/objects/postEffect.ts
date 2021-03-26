import * as THREE from "three";

import fragmentShader from "../../../assets/glsl/postEffect.frag";
import vertexShader from "../../../assets/glsl/postEffect.vert";

const createPostEffect = (textureValue: THREE.Texture) => {
  const uniforms = {
    time: {
      type: "f",
      value: 0,
    },
    resolution: {
      type: "v2",
      value: new THREE.Vector2(document.body.clientWidth, window.innerHeight),
    },
    texture: {
      type: "t",
      value: textureValue,
    },
  };

  return new THREE.Mesh(
    new THREE.PlaneBufferGeometry(2, 2),
    new THREE.RawShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
    }),
  );

  // render(time: number) {
  //     this.uniforms.time.value += time * this.time;
  // }
  // resize() {
  //     this.uniforms.resolution.value.set(document.body.clientWidth, window.innerHeight);
  // }
};

export default createPostEffect;
