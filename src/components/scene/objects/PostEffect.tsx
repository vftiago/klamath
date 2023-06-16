import React from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import fragmentShader from "../glsl/postEffect.frag";
import vertexShader from "../glsl/postEffect.vert";

const PostEffect = (props: JSX.IntrinsicElements["mesh"]) => {
	const rawShaderMaterialRef = useRef<THREE.RawShaderMaterial>(null);

	const target = new THREE.WebGLRenderTarget(
		document.body.clientWidth,
		window.innerHeight,
	);

	const handleWindowResize = () => {
		if (!rawShaderMaterialRef.current) {
			return;
		}

		target.setSize(document.body.clientWidth, window.innerHeight);

		rawShaderMaterialRef.current.uniforms.resolution.value.set(
			document.body.clientWidth,
			window.innerHeight,
		);
	};

	const [scene] = useState(() => new THREE.Scene());

	useEffect(() => {
		window.addEventListener("resize", handleWindowResize);

		return () => {
			window.removeEventListener("resize", handleWindowResize);
		};
	}, []);

	useFrame((state) => {
		if (!rawShaderMaterialRef.current) {
			return;
		}

		const uniforms = rawShaderMaterialRef.current.uniforms;

		if (!uniforms.resolution) {
			uniforms.resolution = {
				value: new THREE.Vector2(document.body.clientWidth, window.innerHeight),
			};
		}

		if (!uniforms.texture) {
			uniforms.texture = {
				value: target.texture,
			};
		}

		uniforms.time = uniforms.time || { value: 0 };

		uniforms.time.value += 1;

		rawShaderMaterialRef.current.visible = false;
		state.gl.setRenderTarget(target);
		state.gl.render(state.scene, state.camera);
		rawShaderMaterialRef.current.visible = true;
		state.gl.setRenderTarget(null);
		state.gl.render(scene, state.camera);
	});

	return (
		<mesh {...props}>
			<planeGeometry args={[2, 2]} />
			<rawShaderMaterial
				ref={rawShaderMaterialRef}
				vertexShader={vertexShader}
				fragmentShader={fragmentShader}
			/>
		</mesh>
	);
};

export default PostEffect;
