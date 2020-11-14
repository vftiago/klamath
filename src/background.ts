import * as THREE from 'three'

import fragmentShader from "./glsl/bg.frag";
import vertexShader from "./glsl/bg.vert";

 const createBackground = function() {
    const geometry = new THREE.SphereGeometry(1200, 32, 32);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: {
          value: 0,
        },
      },
      vertexShader,
      fragmentShader,
      side: THREE.BackSide,
    });
    return new THREE.Mesh(geometry, material);
  };

  export default createBackground;