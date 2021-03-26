import * as THREE from "three";

const createOuterSphere = () => {
  const geometry = new THREE.SphereGeometry(1100, 64, 64);
  const material = new THREE.MeshBasicMaterial({
    color: 0xdcdcdc,
    wireframe: true,
  });
  return new THREE.Mesh(geometry, material);
};

export default createOuterSphere;
