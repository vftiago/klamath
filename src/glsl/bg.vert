uniform float time;

varying vec3 vColor;

void main(){
  vColor=vec3((position.y/920.+1.)*.12+.9);
  gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);
}
