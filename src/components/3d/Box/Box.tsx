import React from "react";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

import fragmentShader from "./box.frag";
import vertexShader from "./box.vert";
import { TIME_SPEED } from "../scene-defaults";

const Box = (props: JSX.IntrinsicElements["mesh"]) => {
  const ref = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.RawShaderMaterial>(null);

  useFrame((_, delta) => {
    if (!materialRef.current) {
      return;
    }

    const uniforms = materialRef.current.uniforms;

    if (!uniforms.rotate) {
      uniforms.rotate = { value: Math.random() * 10 };
    }

    uniforms.time = uniforms.time || { value: 0 };

    uniforms.time.value += delta * TIME_SPEED;
  });

  return (
    <mesh {...props} ref={ref}>
      <boxGeometry args={[100, 100, 100]} />
      <rawShaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent={true}
        wireframe={true}
      />
    </mesh>
  );
};

export default Box;
