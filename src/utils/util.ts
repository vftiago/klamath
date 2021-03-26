import * as THREE from "three";

const Util = {
  getRandomInt: (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min)) + min;
  },
  getDegree: (radian: number) => {
    return (radian / Math.PI) * 180;
  },
  getRadian: (degrees: number) => {
    return (degrees * Math.PI) / 180;
  },
  getPolarCoord: (rad1: number, rad2: number, r: number) => {
    var x = Math.cos(rad1) * Math.cos(rad2) * r;
    var z = Math.cos(rad1) * Math.sin(rad2) * r;
    var y = Math.sin(rad1) * r;
    return new THREE.Vector3(x, y, z);
  },
};

export default Util;
