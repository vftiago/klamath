/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

import fragmentShader from "../../../assets/glsl/debris.frag";
import vertexShader from "../../../assets/glsl/debris.vert";

function Box(props: JSX.IntrinsicElements["mesh"]) {
	const ref = useRef<THREE.Mesh>(null!);
	const materialRef = useRef<THREE.RawShaderMaterial>(null!);

	useFrame(() => {
		materialRef.current.uniforms.time.value += 0.01;
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
