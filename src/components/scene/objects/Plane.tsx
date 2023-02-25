/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import fragmentShader from "../../../assets/glsl/waves.frag";
import vertexShader from "../../../assets/glsl/waves.vert";
import { DEFAULT_TIME_VALUE_UPDATE } from "../scene-defaults";

const PLANE_DIMENSIONS = 1024;

const Plane = () => {
	const meshRef = useRef<THREE.Mesh>(null!);
	const rawShaderMaterialRef = useRef<THREE.RawShaderMaterial>(null!);

	useEffect(() => {
		meshRef.current.position.set(0, -128, 0);
		meshRef.current.rotation.set((-90 * Math.PI) / 180, 0, 0);
	}, []);

	useFrame(() => {
		rawShaderMaterialRef.current.uniforms.time.value += DEFAULT_TIME_VALUE_UPDATE;
	});

	const uniforms = {
		time: {
			type: "f",
			value: 0,
		},
	};

	return (
		<mesh ref={meshRef}>
			<planeGeometry
				args={[
					PLANE_DIMENSIONS,
					PLANE_DIMENSIONS,
					PLANE_DIMENSIONS / 32,
					PLANE_DIMENSIONS / 32,
				]}
			/>
			<rawShaderMaterial
				ref={rawShaderMaterialRef}
				uniforms={uniforms}
				vertexShader={vertexShader}
				fragmentShader={fragmentShader}
				transparent={true}
				wireframe={true}
				lights={false}
			/>
		</mesh>
	);
};

export default Plane;
