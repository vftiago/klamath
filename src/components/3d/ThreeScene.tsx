import React, { useCallback } from "react";
import * as THREE from "three";
import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Box from "./Box/Box";
import Plane from "./Plane/Plane";
import PostEffect from "./PostEffect/PostEffect";
import ClearColor from "./ClearColor/ClearColor";
import Barbelith from "./Barbelith/Barbelith";

const ThreeScene = () => {
  const [camera] = useState(() => new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000));

  camera.position.set(0, 0, 1024);

  const [counter, setCounter] = useState(0);

  const handleWindowScroll = () => {
    camera.position.y = -window.scrollY / 4;
  };

  const handleWindowResize = useCallback(() => {
    setCounter((prev) => prev + 1);
  }, [camera, counter]);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    window.addEventListener("scroll", handleWindowScroll);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
      window.removeEventListener("scroll", handleWindowScroll);
    };
  }, []);

  return (
    <div className="fixed left-0 top-0 -z-10 h-screen w-full">
      <Canvas
        camera={camera}
        gl={{
          antialias: true,
        }}
      >
        <ClearColor />
        <Barbelith position={[250, 250, -200]} />
        <Plane />
        <Box position={[400, -500, 200]}></Box>
        <Box position={[-350, -600, -5]}></Box>
        <Box position={[-150, -700, -150]}></Box>
        <Box position={[-500, -900, 0]}></Box>
        <Box position={[-100, -1200, -300]}></Box>
        <Box position={[100, -1100, 25]}></Box>
        <Box position={[150, -1500, -10]}></Box>
        <PostEffect key={counter} position={[0, -200, 0]} />
      </Canvas>
    </div>
  );
};

export default React.memo(ThreeScene);
