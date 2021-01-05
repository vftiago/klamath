import * as THREE from 'three';

const createInnerSphere = () => {
    const geometry = new THREE.SphereBufferGeometry(160, 32, 32);
    const material = new THREE.MeshBasicMaterial({
      color: 0xff8888,
      wireframe: false,
      transparent: true
    });
    return new THREE.Mesh(geometry, material);
  };

export default createInnerSphere;