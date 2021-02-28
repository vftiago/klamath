attribute vec3 position;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform float time;

varying vec3 vPosition;

const float weight=.5;

void main(){
  float sin1=sin((position.x+position.y)*.2+time*.5*weight);
  float sin2=sin((position.x-position.y)*.4+time*2.*weight);
  float sin3=sin((position.x+position.y)*-.6+time*weight);
  vec3 updatePosition=vec3(position.x,position.y,position.z+sin1*50.+sin2*10.+sin3*8.);
  vPosition=position;
  gl_Position=projectionMatrix*modelViewMatrix*vec4(updatePosition,1.);
}
