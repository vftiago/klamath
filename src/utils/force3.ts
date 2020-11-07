import * as THREE from 'three';

export default class Force3 {
    velocity: THREE.Vector3;
    acceleration: THREE.Vector3;
    anchor: THREE.Vector3;
    mass: number;
    
    constructor() {
        this.velocity = new THREE.Vector3();
        this.acceleration = new THREE.Vector3();
        this.anchor = new THREE.Vector3();
        this.mass = 1;
    }

    updateVelocity() {
        this.acceleration.divideScalar(this.mass);
        this.velocity.add(this.acceleration);
      };

      applyForce (vector: THREE.Vector3) {
        this.acceleration.add(vector);
      };

      applyFriction (mu: any, normal: number) {
        const force = this.acceleration.clone();
        if (!normal) normal = 1;
        force.multiplyScalar(-1);
        force.normalize();
        force.multiplyScalar(mu);
        this.applyForce(force);
      };

      applyDrag (value: number) {
        const force = this.acceleration.clone();
        force.multiplyScalar(-1);
        force.normalize();
        force.multiplyScalar(this.acceleration.length() * value);
        this.applyForce(force);
      };

      applyHook (rest_length: number, k: number) {
        const force = this.velocity.clone().sub(this.anchor);
        const distance = force.length() - rest_length;
        force.normalize();
        force.multiplyScalar(-1 * k * distance);
        this.applyForce(force);
      };

}