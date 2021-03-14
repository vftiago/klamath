precision highp float;

uniform float time;

varying vec3 vPosition;

const float duration=2.;
const float delay=.8;
const float radius=512.;

vec3 convertHsvToRgb(vec3 c){
  vec4 K=vec4(1.,2./3.,1./3.,3.);
  vec3 p=abs(fract(c.xxx+K.xyz)*6.-K.www);
  return c.z*mix(K.xxx,clamp(p-K.xxx,0.,1.),c.y);
}

void main(){
  float now=clamp((time-delay)/duration,0.,1.);
  float opacity=(1.-length(vPosition.xy/vec2(radius)))*.6*now;
  // vec3 v=normalize(vPosition);
  // vec3 rgb=convertHsvToRgb(vec3(.5+(v.x+v.y+v.x)/40.+time*.1,.4,1.));
  gl_FragColor=vec4(vec3(.8,.8,.8),opacity);
}
