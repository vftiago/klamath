import * as THREE from 'three';

const createInnerSphere = () => {
    const geometry = new THREE.SphereBufferGeometry(192, 32, 32);
    const material = new THREE.MeshBasicMaterial({
      color: 0xdddddd,
      wireframe: false,
    });
    return new THREE.Mesh(geometry, material);
  };

export default createInnerSphere;