uniform float time;

varying vec3 vColor;

void main(){
  vColor=vec3((position.y/1000.+1.)*.12+.88);
  gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);
}
