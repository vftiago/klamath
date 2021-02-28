precision highp float;

uniform float time;
uniform vec2 resolution;
uniform sampler2D texture;

varying vec2 vUv;

float random(vec2 c){
  return fract(sin(dot(c.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

void main() {
  float whiteNoise = random(vUv.xy * time) * 0.1 - 0.1;

  float r = texture2D(texture, vUv).r;
  float g = texture2D(texture, vUv).g;
  float b = texture2D(texture, vUv).b;

  gl_FragColor = vec4((vec3(r, g, b) + whiteNoise), 1.0);
}