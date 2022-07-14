varying vec2 vUv;
varying vec2 vCoordinates;
attribute vec3 aCoordinates;
attribute float aSpeed;
attribute float aOffset;

uniform float move;
uniform float time;

void main() {
  vUv = uv;

  vec3 pos = position;
  pos.z = position.z + move * aSpeed + aOffset;

  vec4 mvPositioin = modelViewMatrix * vec4( pos, 1.0 );

  gl_PointSize = 2000.0 * (1.0 / -mvPositioin.z);
  gl_Position = projectionMatrix * mvPositioin;

  vCoordinates = aCoordinates.xy;
}
