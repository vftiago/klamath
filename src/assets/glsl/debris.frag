precision highp float;

uniform float time;

vec3 convertHsvToRgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main() {
  vec3 hsv = vec3(0.5 + time * 0.1, 0.4, 1.0);
  vec3 rgb = convertHsvToRgb(hsv);
gl_FragColor=vec4(vec3(.8,.8,.8),0.8);
}
