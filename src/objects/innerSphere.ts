import * as THREE from 'three';
import { Texture } from 'three';

const createInnerSphere = (envMapTexture: Texture) => {
    const geometry = new THREE.SphereBufferGeometry(192, 64, 64);
    const material = new THREE.MeshLambertMaterial({
      // color: 0xdddddd,
      wireframe: false,
      emissive: 0xdddddd,
      // map: envMapTexture
    });
    return new THREE.Mesh(geometry, material);
  };

export default createInnerSphere;