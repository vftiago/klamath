import React from "react";
import { css } from "@emotion/css";
import * as THREE from "three";
import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Box from "./Box/Box";
import Plane from "./Plane/Plane";
import PostEffect from "./PostEffect/PostEffect";
import ClearColor from "./ClearColor/ClearColor";

const ThreeScene = () => {
	const [camera] = useState(
		() =>
			new THREE.PerspectiveCamera(
				45,
				window.innerWidth / window.innerHeight,
				1,
				10000,
			),
	);

	camera.position.set(0, 0, 1024);

	const handleWindowScroll = () => {
		camera.position.y = -window.scrollY / 4;
	};

	const handleWindowResize = () => {
		camera.aspect = document.body.clientWidth / window.innerHeight;
		camera.updateProjectionMatrix();
	};

	useEffect(() => {
		window.addEventListener("resize", handleWindowResize);
		window.addEventListener("scroll", handleWindowScroll);

		return () => {
			window.removeEventListener("resize", handleWindowResize);
			window.removeEventListener("scroll", handleWindowScroll);
		};
	}, []);

	return (
		<div className={canvasStyle}>
			<Canvas
				camera={camera}
				gl={{
					antialias: true,
				}}
			>
				<ClearColor />
				<Plane />
				<Box position={[400, -500, 200]}></Box>
				<Box position={[-350, -600, -5]}></Box>
				<Box position={[-150, -700, -150]}></Box>
				<Box position={[-500, -900, 0]}></Box>
				<Box position={[-100, -1200, -300]}></Box>
				<Box position={[100, -1100, 25]}></Box>
				<Box position={[150, -1500, -10]}></Box>
				<PostEffect position={[0, -200, -8000]} />
			</Canvas>
		</div>
	);
};

const canvasStyle = css`
	z-index: -1;
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
`;

export default React.memo(ThreeScene);
