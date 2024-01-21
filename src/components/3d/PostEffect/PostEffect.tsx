import React from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import fragmentShader from "./postEffect.frag";
import vertexShader from "./postEffect.vert";
import { TIME_SPEED } from "../scene-defaults";
import { useInitialWindowSize } from "../useInitialWindowSize";

const PostEffect = (props: JSX.IntrinsicElements["mesh"]) => {
  const rawShaderMaterialRef = useRef<THREE.RawShaderMaterial>(null);

  const target = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight);

  const { haveBothDimensionsChanged } = useInitialWindowSize();

  const handleWindowResize = () => {
    if (!rawShaderMaterialRef.current || !haveBothDimensionsChanged()) {
      return;
    }

    target.setSize(window.innerWidth, window.innerHeight);

    rawShaderMaterialRef.current.uniforms.resolution.value.set(window.innerWidth, window.innerHeight);
  };

  const [scene] = useState(() => new THREE.Scene());

  useEffect(() => {
    if (!rawShaderMaterialRef.current) {
      return;
    }

    window.addEventListener("resize", handleWindowResize);

    const uniforms = rawShaderMaterialRef.current.uniforms;

    uniforms.resolution = {
      value: new THREE.Vector2(window.innerWidth, window.innerHeight),
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

  useFrame((state, delta) => {
    if (!rawShaderMaterialRef.current) {
      return;
    }

    const uniforms = rawShaderMaterialRef.current.uniforms;

    uniforms.time.value += delta * TIME_SPEED;

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
      <rawShaderMaterial ref={rawShaderMaterialRef} vertexShader={vertexShader} fragmentShader={fragmentShader} />
    </mesh>
  );
};

export default PostEffect;
