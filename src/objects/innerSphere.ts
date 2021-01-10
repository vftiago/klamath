import * as THREE from 'three';

const createInnerSphere = () => {
    const geometry = new THREE.SphereBufferGeometry(300, 24, 24);
    const material = new THREE.MeshBasicMaterial({
      color: 0xdddddd,
      wireframe: true,
    });
    return new THREE.Mesh(geometry, material);
  };

export default createInnerSphere;