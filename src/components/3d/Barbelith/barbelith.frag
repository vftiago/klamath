precision highp float;

uniform float time;

const float duration=2.;
const float delay=2.;
const float radius=.6;

vec3 convertHsvToRgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main() {
  vec3 hsv = vec3(0.5 + time * 0.1, 0.4, 1.0);
  vec3 rgb = convertHsvToRgb(hsv);

  float now=clamp((time-delay)/duration,0.,1.);
  float opacity=(0.6)*0.5*now;

  gl_FragColor=vec4(vec3(.8,.8,.8),opacity);
}
