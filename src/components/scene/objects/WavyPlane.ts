import * as THREE from "three";

import fragmentShader from "../../../assets/glsl/waves.frag";
import vertexShader from "../../../assets/glsl/waves.vert";

const PLANE_DIMENSIONS = 1024;

const Waves = () => {
	const uniforms = {
		time: {
			type: "f",
			value: 0,
		},
	};

	return new THREE.Mesh(
		new THREE.PlaneBufferGeometry(
			PLANE_DIMENSIONS,
			PLANE_DIMENSIONS,
			PLANE_DIMENSIONS / 32,
			PLANE_DIMENSIONS / 32,
		),
		new THREE.RawShaderMaterial({
			uniforms,
			vertexShader,
			fragmentShader,
			transparent: true,
			wireframe: true,
		}),
	);
};

export default Waves;
