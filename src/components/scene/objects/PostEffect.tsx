/** @jsxRuntime classic */
/** @jsx jsx */
import * as THREE from "three";

import { jsx } from "@emotion/core";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import fragmentShader from "../../../assets/glsl/postEffect.frag";
import vertexShader from "../../../assets/glsl/postEffect.vert";

const PostEffect = () => {
	const rawShaderMaterialRef = useRef<THREE.RawShaderMaterial>(null!);

	const target = new THREE.WebGLRenderTarget(
		document.body.clientWidth,
		window.innerHeight,
	);

	const handleWindowResize = () => {
		target.setSize(document.body.clientWidth, window.innerHeight);
		rawShaderMaterialRef.current.uniforms.resolution.value.set(
			document.body.clientWidth,
			window.innerHeight,
		);
	};

	const [camera] = useState(
		() => new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1),
	);

	const [scene] = useState(() => new THREE.Scene());

	useEffect(() => {
		window.addEventListener("resize", handleWindowResize);

		return () => {
			window.removeEventListener("resize", handleWindowResize);
		};
	}, []);

	useFrame((state) => {
		rawShaderMaterialRef.current.uniforms.time.value += 1;
		rawShaderMaterialRef.current.visible = false;
		state.gl.setRenderTarget(target);
		state.gl.render(state.scene, state.camera);
		rawShaderMaterialRef.current.visible = true;
		state.gl.setRenderTarget(null);
		state.gl.render(scene, camera);
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
				ref={rawShaderMaterialRef}
				uniforms={uniforms}
				vertexShader={vertexShader}
				fragmentShader={fragmentShader}
			/>
		</mesh>
	);
};

export default PostEffect;
