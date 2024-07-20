attribute vec3 position;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
uniform float time;
uniform float rotate;

mat4 calcRotateMat4X(float radian){
    return mat4(
        1.,0.,0.,0.,
        0.,cos(radian),-sin(radian),0.,
        0.,sin(radian),cos(radian),0.,
        0.,0.,0.,1.
    );
}

mat4 calcRotateMat4Y(float radian){
    return mat4(
        cos(radian),0.,sin(radian),0.,
        0.,1.,0.,0.,
        -sin(radian),0.,cos(radian),0.,
        0.,0.,0.,1.
    );
}

mat4 calcRotateMat4Z(float radian){
    return mat4(
        cos(radian),-sin(radian),0.,0.,
        sin(radian),cos(radian),0.,0.,
        0.,0.,1.,0.,
        0.,0.,0.,1.
    );
}

mat4 calcRotateMat4(vec3 radian){
    return 1.0*calcRotateMat4Y(radian.y)*1.0;
}

void main(void){
    mat4 rotateMat=calcRotateMat4(vec3(time*.1+rotate));
    vec4 updatePosition=rotateMat*vec4(position,1.);
    gl_Position=projectionMatrix*modelViewMatrix*updatePosition;
}
