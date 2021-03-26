import * as THREE from "three";

import fragmentShader from "../glsl/waves.frag";
import vertexShader from "../glsl/waves.vert";

import { Texture } from "three";

const createInnerSphere = (
  envMapTexture: Texture,
): THREE.Mesh<THREE.SphereBufferGeometry, THREE.RawShaderMaterial> => {
  const uniforms = {
    time: {
      type: "f",
      value: 0,
    },
  };

  const geometry = new THREE.SphereBufferGeometry(128, 32, 32);
  const material = new THREE.RawShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader,
    // color: 0xdddddd,
    wireframe: true,
    // emissive: 0xffdddd,
    // envMap: envMapTexture,
    // side: THREE.BackSide
    // metalness: 0,
    // roughness: 0.5,
  });
  return new THREE.Mesh(geometry, material);
};

export default createInnerSphere;
