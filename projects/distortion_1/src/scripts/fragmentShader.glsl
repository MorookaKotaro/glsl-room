varying vec2 vUv;
uniform vec2 resolution;
uniform vec2 imageResolution;
uniform float dispFactor;

uniform sampler2D u_texture;
uniform sampler2D u_texture2;

void main() {
  vec2 ratio = vec2(
  min((resolution.x / resolution.y) / (imageResolution.x / imageResolution.y), 1.0),
  min((resolution.y / resolution.x) / (imageResolution.y / imageResolution.x), 1.0)
);

vec2 uv = vec2(
  vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
  vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
);

  vec2 calcPosition = fract(uv * 10.0);

  vec4 _texture = texture2D(u_texture, calcPosition);
  vec4 _texture2 = texture2D(u_texture2, uv);

  vec4 finalTexture = mix(_texture, _texture2, dispFactor);
  gl_FragColor = finalTexture;
}
