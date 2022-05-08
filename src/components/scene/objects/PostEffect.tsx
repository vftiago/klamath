/** @jsxRuntime classic */
/** @jsx jsx */
import * as THREE from "three";

import { jsx } from "@emotion/core";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { useFBO } from "@react-three/drei";
import fragmentShader from "../../../assets/glsl/postEffect.frag";
import vertexShader from "../../../assets/glsl/postEffect.vert";

const PostEffect = () => {
	const materialRef = useRef<THREE.RawShaderMaterial>(null!);

	const target = useFBO();

	const [orthoCamera] = useState(
		() => new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1),
	);

	const [orthoScene] = useState(() => new THREE.Scene());

	useFrame((state) => {
		materialRef.current.uniforms.time.value += 0.05;
		state.gl.setRenderTarget(target);
		state.gl.render(state.scene, state.camera);
		state.gl.setRenderTarget(null);
		state.gl.render(orthoScene, orthoCamera);
	});

	const uniforms = {
		time: {
			type: "f",
			value: 0,
		},
		resolution: {
			type: "v2",
			value: new THREE.Vector2(document.body.clientWidth, window.innerHeight),
		},
		texture: {
			type: "t",
			value: target.texture,
		},
	};

	return (
		<mesh>
			<planeBufferGeometry args={[2, 2]} />
			<rawShaderMaterial
				ref={materialRef}
				uniforms={uniforms}
				vertexShader={vertexShader}
				fragmentShader={fragmentShader}
			/>
		</mesh>
	);
};

export default PostEffect;
