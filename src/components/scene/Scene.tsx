/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { PerspectiveCamera } from "three";
import debounce from "../../utils/debounce";
import createPostEffect from "./objects/postEffect";
import createWavyPlane from "./objects/WavyPlane";
import createDebris from "./objects/debris";

const debrisCoordinates = [
	[400, -500, 200],
	[-350, -600, -5],
	[-150, -700, -150],
	[-500, -900, 0],
	[-100, -1200, -300],
	[100, -1100, 25],
	[150, -1500, -10],
];

const createScene = () => {
	console.log("creating scene");

	let postEffect: any = null;
	let wavyPlane: any = null;
	let debrisArray: any[] = [];

	let scene = new THREE.Scene();

	const canvas = document.getElementById("canvas") as HTMLCanvasElement;

	const renderer = new THREE.WebGLRenderer({
		antialias: true,
		canvas: canvas,
	});

	renderer.setSize(document.body.clientWidth, window.innerHeight);
	renderer.setClearColor(0xeeeeee, 1.0);

	const renderTarget = new THREE.WebGLRenderTarget(
		document.body.clientWidth,
		window.innerHeight,
	);

	const dummyScene = new THREE.Scene();

	const dummycam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
	const camera = new PerspectiveCamera(
		40,
		window.innerWidth / window.innerHeight,
		1,
		10000,
	);

	postEffect = createPostEffect(renderTarget.texture);
	dummyScene.add(postEffect);

	debrisCoordinates.forEach((coordinateSet) => {
		const newDebris = createDebris();
		newDebris.position.set(
			coordinateSet[0],
			coordinateSet[1],
			coordinateSet[2],
		);

		debrisArray.push(newDebris);
		scene.add(newDebris);
	});

	wavyPlane = createWavyPlane();
	wavyPlane.position.set(0, -128, 0);
	wavyPlane.rotation.set((-90 * Math.PI) / 180, 0, 0);
	scene.add(wavyPlane);

	camera.position.set(0, 0, 1024);
	// camera.lookAt(0, -128, 0);

	return {
		handleWindowScroll: () => {
			camera.position.y = -window.pageYOffset / 4;
		},
		handleWindowResize: () => {
			console.log("resizing");
			canvas.width = document.body.clientWidth;
			canvas.height = window.innerHeight;
			camera.aspect = document.body.clientWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderTarget.setSize(document.body.clientWidth, window.innerHeight);
			renderer.setPixelRatio(window.devicePixelRatio);
			renderer.setSize(document.body.clientWidth, window.innerHeight);
			renderer.setClearColor(0xeeeeee, 1.0);
			postEffect.material.uniforms.resolution.value.set(
				document.body.clientWidth,
				window.innerHeight,
			);
		},
		render: () => {
			wavyPlane.material.uniforms.time.value += 0.01;
			debrisArray.map(
				(debris: any) => (debris.material.uniforms.time.value += 0.01),
			);
			postEffect.material.uniforms.time.value += 0.05;

			renderer.setRenderTarget(renderTarget);
			renderer.render(scene, camera);
			renderer.setRenderTarget(null);
			renderer.render(dummyScene, dummycam);
		},
	};
};

const Scene = () => {
	const didCreateScene = useRef(false);

	useEffect(() => {
		// if (didCreateScene.current) return;

		const { handleWindowScroll, handleWindowResize, render } = createScene();

		didCreateScene.current = true;

		const renderLoop = () => {
			render();
			requestAnimationFrame(renderLoop);
		};

		window.addEventListener("scroll", handleWindowScroll);
		window.addEventListener("resize", handleWindowResize);

		handleWindowResize();
		renderLoop();

		return () => {
			console.log(1);
			window.removeEventListener("scroll", handleWindowScroll);
			window.removeEventListener("resize", handleWindowResize);
		};
	}, []);

	return <canvas css={canvasStyle} id="canvas" />;
};

const canvasStyle = css`
	z-index: -1;
	width: 100%;
	height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
`;

export default Scene;
