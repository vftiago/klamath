import * as THREE from "three";

import fragmentShader from "./glsl/logo.frag";
import vertexShader from "./glsl/logo.vert";

const Logo = (textureValue: THREE.Texture) => {
    const uniforms = {
        time: {
            type: "f",
            value: 0,
        },
        resolution: {
            type: "v2",
            value: new THREE.Vector2(),
        },
        texture: {
            type: "t",
            value: textureValue,
            magFilter: THREE.LinearMipmapNearestFilter,
            minFilter: THREE.LinearMipmapNearestFilter,
        },
    };

    const geometry = new THREE.CircleBufferGeometry(128, 64);

    const material = new THREE.RawShaderMaterial({
        uniforms,
        vertexShader,
        fragmentShader,
        transparent: true,
        wireframe: false

    });

    return {
        mesh: new THREE.Mesh(geometry, material),
        material,
    };
};

export default Logo;
