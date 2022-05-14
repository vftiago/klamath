precision highp float;

uniform float time;

varying vec3 vPosition;

const float duration=2.;
const float delay=2.;
const float radius=512.;

void main(){
  float now=clamp((time-delay)/duration,0.,1.);
  float opacity=(1.-length(vPosition.xy/vec2(radius)))*.6*now;
  gl_FragColor=vec4(vec3(.8,.8,.8),opacity);
}
