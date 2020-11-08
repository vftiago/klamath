precision highp float;

uniform float time;
uniform sampler2D texture;

varying vec2 vUv;

const float interval=2.3;

#pragma glslify:snoise3=require(glsl-noise/simplex/3d)
#pragma glslify:ease=require(glsl-easings/cubic-out)

void main(){
  // float now=ease(min(time/interval,1.));
  // float noise=(snoise3(vec3(vUv.x*4.,vUv.y*4.,1.))+1.);
  // float opacity=smoothstep(.4,.6,((noise-1.)+now*interval)-vUv.x);
  gl_FragColor=texture2D(texture,vUv)*vec4(vec3(1.),1.);
}
