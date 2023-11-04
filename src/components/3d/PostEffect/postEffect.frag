precision highp float;

uniform float time;
uniform vec2 resolution;
uniform sampler2D texture;

varying vec2 vUv;

const float duration = 1.0;
const float delay = 1.0;

float random(vec2 c){
  return fract(sin(dot(c.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

void main() {
  float now = clamp((time - delay) / duration, 0.0, 1.0);

  float whiteNoise = random(vUv.xy * time) * 0.1 - 0.1;

  float monitor1 = abs(sin(vUv.y * resolution.y * 2.4 + time * 10.0)) * 0.04;
  float monitor2 = abs(sin(vUv.y * resolution.y * 1.0 + time * 3.0)) * 0.04;

  float monitor = monitor1 - monitor2;

  float vignetteMask = smoothstep(0.8, 1.4, length(vUv * 2.0 - 1.0));
  vec3 vignette = vignetteMask * vec3(1.,1.,1.) * 0.1;

  float r = texture2D(texture, vUv).r;
  float g = texture2D(texture, vUv).g;
  float b = texture2D(texture, vUv).b;

  gl_FragColor = vec4((vec3(r, g, b) + whiteNoise) + monitor + vignette, 1.0);
}

// interesting vignette mask effect:

// vec3 convertHsvToRgb(vec3 c) {
//   vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
//   vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
//   return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
// }

//  float vignetteMask = smoothstep(0.8, 0.4, length(vUv * 2.0 - 1.0));
//  vec3 vignetteColor = convertHsvToRgb(vec3(0.5 + (vUv.x + vUv.y) + time * 0.1, 0.9, 0.2));
//  vec3 vignette = vignetteMask * vignetteColor * 1.0;
