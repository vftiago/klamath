import React from "react";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

import fragmentShader from "./box.frag";
import vertexShader from "./box.vert";
import { DEFAULT_TIME_VALUE_UPDATE } from "../scene-defaults";

function Box(props: JSX.IntrinsicElements["mesh"]) {
	const ref = useRef<THREE.Mesh>(null);
	const materialRef = useRef<THREE.RawShaderMaterial>(null);

	useFrame(() => {
		if (!materialRef.current) {
			return;
		}

		const uniforms = materialRef.current.uniforms;

		if (!uniforms.rotate) {
			uniforms.rotate = { value: Math.random() * 10 };
		}

		uniforms.time = uniforms.time || { value: 0 };

		uniforms.time.value += DEFAULT_TIME_VALUE_UPDATE;
	});

	return (
		<mesh {...props} ref={ref}>
			<boxGeometry args={[100, 100, 100]} />
			<rawShaderMaterial
				ref={materialRef}
				vertexShader={vertexShader}
				fragmentShader={fragmentShader}
				transparent={true}
				wireframe={true}
			/>
		</mesh>
	);
}

export default Box;
