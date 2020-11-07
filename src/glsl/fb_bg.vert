uniform float time;

varying vec3 vColor;

vec3 hsv2rgb(vec3 c){
  vec4 K=vec4(1.,2./3.,1./3.,3.);
  vec3 p=abs(fract(c.xxx+K.xyz)*6.-K.www);
  return c.z*mix(K.xxx,clamp(p-K.xxx,0.,1.),c.y);
}

#pragma glslify:snoise3=require(glsl-noise/simplex/3d)

void main(){
  float noise=snoise3(
    vec3(position.x+time*10.,position.y+cos(time/20.)*100.,position.z+time*10.)/800.
  );
  vColor=hsv2rgb(vec3(noise*.2+.75,.4,noise*.3+.5));
  gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);
}
