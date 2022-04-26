varying vec2 vUv;
uniform sampler2D u_texture;

void main() {
  vec3 _texture = texture2D(u_texture, vUv).rgb;
  gl_FragColor = vec4(_texture, 1.0);
}
