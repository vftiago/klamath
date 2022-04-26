import * as THREE from "three";

import fragmentShader from "../../../assets/glsl/debris.frag";
import vertexShader from "../../../assets/glsl/debris.vert";

const createDebris = (): THREE.Mesh<
	THREE.BoxGeometry,
	THREE.RawShaderMaterial
> => {
	const uniforms = {
		time: {
			type: "f",
			value: 0,
		},
		rotate: {
			type: "f",
			value: Math.random() * 10,
		},
	};

	return new THREE.Mesh(
		new THREE.BoxGeometry(100, 100, 100),
		new THREE.RawShaderMaterial({
			uniforms,
			vertexShader,
			fragmentShader,
			transparent: true,
			wireframe: true,
		}),
	);
};

export default createDebris;
