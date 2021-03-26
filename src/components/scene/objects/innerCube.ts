import * as THREE from "three";
import { Texture } from "three";

const createInnerCube = (envMapTexture?: Texture) => {
  const geometry = new THREE.BoxBufferGeometry(300, 300, 300, 5, 5, 5);
  const material = new THREE.MeshStandardMaterial({
    color: 0x666666,
    // wireframe: false,
    emissive: 0x666666,
    // emissiveIntensity: 0.2,
    metalness: 0,
    roughness: 0.1,
    envMap: envMapTexture,
    // side: THREE.BackSide
  });
  return new THREE.Mesh(geometry, material);
};

export default createInnerCube;
