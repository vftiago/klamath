/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import * as THREE from "three";
import { useEffect, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import Box from "./objects/Box";
import Plane from "./objects/Plane";
import PostEffect from "./objects/PostEffect";
import ClearColor from "./objects/ClearColor";

const ThreeScene = () => {
	const [camera] = useState(
		() =>
			new THREE.PerspectiveCamera(
				40,
				window.innerWidth / window.innerHeight,
				1,
				10000,
			),
	);

	camera.position.set(0, 0, 1024);

	const handleWindowScroll = () => {
		camera.position.y = -window.pageYOffset / 4;
	};

	useEffect(() => {
		window.addEventListener("scroll", handleWindowScroll);
		return () => window.removeEventListener("scroll", handleWindowScroll);
	}, []);

	return (
		<div css={canvasStyle}>
			<Canvas
				camera={camera}
				gl={{
					antialias: true,
				}}
			>
				<ClearColor></ClearColor>
				<Plane />
				<Box position={[400, -500, 200]}></Box>
				<Box position={[-350, -600, -5]}></Box>
				<Box position={[-150, -700, -150]}></Box>
				<Box position={[-500, -900, 0]}></Box>
				<Box position={[-100, -1200, -300]}></Box>
				<Box position={[100, -1100, 25]}></Box>
				<Box position={[150, -1500, -10]}></Box>
				<PostEffect />
			</Canvas>
		</div>
	);
};

const canvasStyle = css`
	z-index: -1;
	width: 100%;
	height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
`;

export default ThreeScene;
