import React from "react";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

import fragmentShader from "../../../assets/glsl/debris.frag";
import vertexShader from "../../../assets/glsl/debris.vert";
import { DEFAULT_TIME_VALUE_UPDATE } from "../scene-defaults";

function Box(props: JSX.IntrinsicElements["mesh"]) {
	const ref = useRef<THREE.Mesh>(null);
	const materialRef = useRef<THREE.RawShaderMaterial>(null);

	useFrame(() => {
    if (!materialRef.current) {
      return;
    }
    
		materialRef.current.uniforms.time.value += DEFAULT_TIME_VALUE_UPDATE;
	});

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

	return (
		<mesh {...props} ref={ref}>
			<boxGeometry args={[100, 100, 100]} />
			<rawShaderMaterial
				ref={materialRef}
				uniforms={uniforms}
				vertexShader={vertexShader}
				fragmentShader={fragmentShader}
				transparent={true}
				wireframe={true}
			/>
		</mesh>
	);
}

export default Box;
