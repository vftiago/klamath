import * as THREE from 'three';
import Util from './util';
import Force3 from './force3';

export default class ForceCamera extends THREE.PerspectiveCamera {
  force: any;
  // up: THREE.Vector3;

  constructor(fov: any, aspect: any, near: any, far: any) {
    super(fov, aspect, near, far);

    this.force = {
      position: new Force3(),
      look: new Force3(),
    };
    // this.up = new THREE.Vector3();
    // this.up.set(0, 0, 0);
  }

  updatePosition = () => {
    this.position.copy(this.force.position.velocity);
  };

  updateLook= () => {
    this.lookAt(
      this.force.look.velocity.x,
      this.force.look.velocity.y,
      this.force.look.velocity.z
    );
  };

  setPolarCoord = (rad1: number, rad2: number, range: number) => {
    this.force.position.anchor.copy(Util.getPolarCoord(rad1, rad2, range));
  };

  lookAtCenter = () => {
    this.lookAt(0, 0, 0);
  };

  reset = () => {
    this.setPolarCoord(0, 0, 0);
    this.lookAtCenter();
  };

  resize = (width: number, height: number) => {
    this.aspect = width / height;
    this.updateProjectionMatrix();
  };

}