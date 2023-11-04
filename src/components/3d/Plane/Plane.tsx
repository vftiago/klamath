import React from "react";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import fragmentShader from "./plane.frag";
import vertexShader from "./plane.vert";
import { TIME_SPEED } from "../scene-defaults";

const PLANE_DIMENSIONS = 1024;

const Plane = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const rawShaderMaterialRef = useRef<THREE.RawShaderMaterial>(null);

  useEffect(() => {
    if (!meshRef.current) {
      return;
    }

    meshRef.current.position.set(0, -128, 0);
    meshRef.current.rotation.set((-90 * Math.PI) / 180, 0, 0);
  }, []);

  useFrame((_, delta) => {
    if (!rawShaderMaterialRef.current) {
      return;
    }

    const uniforms = rawShaderMaterialRef.current.uniforms;

    uniforms.time = uniforms.time || { value: 0 };

    uniforms.time.value += delta * TIME_SPEED;
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[PLANE_DIMENSIONS, PLANE_DIMENSIONS, PLANE_DIMENSIONS / 32, PLANE_DIMENSIONS / 32]} />
      <rawShaderMaterial
        ref={rawShaderMaterialRef}
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
