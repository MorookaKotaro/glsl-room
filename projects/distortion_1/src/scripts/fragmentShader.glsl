varying vec2 vUv;
uniform vec2 resolution;
uniform vec2 imageResolution;
uniform float dispFactor;

uniform sampler2D u_texture;
uniform sampler2D u_texture2;

#define PI 3.14159265359

mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle), sin(_angle),cos(_angle));
}

void main() {
  vec2 ratio = vec2(
    min((resolution.x / resolution.y) / (imageResolution.x / imageResolution.y), 1.0),
    min((resolution.y / resolution.x) / (imageResolution.y / imageResolution.x), 1.0)
  );

  vec2 uv = vec2(
    vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
    vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
  );

  vec4 disp = texture2D(u_texture2, uv);

  vec2 calcPosition = uv + rotate2d(PI) * vec2(disp.r, disp.g) * (dispFactor) * 0.1;

  vec4 _texture = texture2D(u_texture, calcPosition);

  // vec4 finalTexture = mix(_texture, _texture2, dispFactor);
  gl_FragColor = _texture;
}
