/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useFBO } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import fragmentShader from "../../../assets/glsl/waves.frag";
import vertexShader from "../../../assets/glsl/waves.vert";

const PLANE_DIMENSIONS = 800;

const Plane = () => {
	const ref = useRef<THREE.Mesh>(null!);
	const materialRef = useRef<THREE.RawShaderMaterial>(null!);

	useEffect(() => {
		ref.current.position.set(0, -128, 0);
		ref.current.rotation.set((-90 * Math.PI) / 180, 0, 0);
	}, []);

	useFrame(() => {
		materialRef.current.uniforms.time.value += 0.01;
	});

	const uniforms = {
		time: {
			type: "f",
			value: 0,
		},
	};

	return (
		<mesh ref={ref}>
			<planeBufferGeometry
				args={[
					PLANE_DIMENSIONS,
					PLANE_DIMENSIONS,
					PLANE_DIMENSIONS / 32,
					PLANE_DIMENSIONS / 32,
				]}
			/>
			<rawShaderMaterial
				ref={materialRef}
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
