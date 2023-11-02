import React from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import fragmentShader from "./postEffect.frag";
import vertexShader from "./postEffect.vert";

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
		if (!rawShaderMaterialRef.current) {
			return;
		}

		window.addEventListener("resize", handleWindowResize);

		const uniforms = rawShaderMaterialRef.current.uniforms;

		uniforms.resolution = {
			value: new THREE.Vector2(document.body.clientWidth, window.innerHeight),
		};

		uniforms.texture = {
			value: target.texture,
		};

		uniforms.time = {
			value: 0,
		};

		return () => {
			window.removeEventListener("resize", handleWindowResize);
		};
	}, []);

	useFrame((state) => {
		if (!rawShaderMaterialRef.current) {
			return;
		}

		const uniforms = rawShaderMaterialRef.current.uniforms;

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
