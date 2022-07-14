#ifdef GL_ES
precision mediump float;
#endif

varying vec2 vCoordinates;
uniform sampler2D t1;
uniform sampler2D mask;

void main() {
  vec4 maskImage = texture2D(mask, gl_PointCoord);
  vec2 myUV = vec2(vCoordinates.x / 512.0, vCoordinates.y / 512.0);

  // gl_FragColor = vec4(myUV, 0.0, 1.0);
  gl_FragColor = texture2D(t1, myUV);
  gl_FragColor.a *= maskImage.r;
}
