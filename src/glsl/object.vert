attribute float radius;
attribute float radian;
attribute float scale;

uniform float time;

varying vec3 vPosition;
varying mat4 vInvertMatrix;

#pragma glslify:snoise3=require(glsl-noise/simplex/3d)

mat4 translateMatrix(vec3 v){
  return mat4(
    1.,0.,0.,0.,
    0.,1.,0.,0.,
    0.,0.,1.,0.,
    v.x,v.y,v.z,1.
  );
}
mat4 rotationMatrixX(float radian){
  return mat4(
    1.,0.,0.,0.,
    0.,cos(radian),-sin(radian),0.,
    0.,sin(radian),cos(radian),0.,
    0.,0.,0.,1.
  );
}
mat4 rotationMatrixY(float radian){
  return mat4(
    cos(radian),0.,sin(radian),0.,
    0.,1.,0.,0.,
    -sin(radian),0.,cos(radian),0.,
    0.,0.,0.,1.
  );
}
mat4 rotationMatrixZ(float radian){
  return mat4(
    cos(radian),-sin(radian),0.,0.,
    sin(radian),cos(radian),0.,0.,
    0.,0.,1.,0.,
    0.,0.,0.,1.
  );
}
mat4 rotationMatrix(float radian_x,float radian_y,float radian_z){
  return rotationMatrixX(radian_x)*rotationMatrixY(radian_y)*rotationMatrixZ(radian_z);
}
mat4 scaleMatrix(vec3 scale){
  return mat4(
    scale.x,0.,0.,0.,
    0.,scale.y,0.,0.,
    0.,0.,scale.z,0.,
    0.,0.,0.,1.
  );
}
vec4 move(vec3 position){
  return translateMatrix(
    vec3(
      cos(radians(time*.5)+radian)*radius,
      sin(radians(time*.5)+radian*10.)*radius*.3,
      sin(radians(time*.5)+radian)*radius
    )
  )*rotationMatrix(
    radians(time*radian)+radian,radians(time)+radian,radians(time)+radian
  )*scaleMatrix(
    vec3(20.*scale)+vec3(10.)*snoise3((position+sin(radian)))
  )*vec4(position,1.);
}

void main(){
  vec4 update_position=move(position);
  vPosition=position;
  vInvertMatrix=inverse(rotationMatrix(
      radians(time*radian)+radian,radians(time)+radian,radians(time)+radian
    ));
    gl_Position=projectionMatrix*modelViewMatrix*update_position;
  }
  