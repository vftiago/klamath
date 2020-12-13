precision highp float;

uniform float time;
uniform sampler2D texture;

varying vec2 vUv;

const float interval=8.8;

#pragma glslify:snoise3=require(glsl-noise/simplex/3d)
#pragma glslify:ease=require(glsl-easings/cubic-out)

void main(){
  float now=ease(min(time/interval,1.));
  float opacity=smoothstep(.0,interval-1.,(now*interval)-vUv.y);
  gl_FragColor=texture2D(texture,vUv)*vec4(vec3(1.),opacity);
}
