attribute vec3 position;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform float time;

varying vec3 vPosition;

const float weight=.5;

void main(){
  vPosition=position;
  gl_Position=projectionMatrix*modelViewMatrix*vec4(vec3(position.x,position.y,position.z),1.);
}
