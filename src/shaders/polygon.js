// Untuk poligon
plgnVertexShaderScript = `
attribute vec4 a_position;
attribute vec4 a_color;
uniform vec2 u_resolution;
uniform vec2 u_offset;
uniform vec2 u_translation;
uniform vec2 u_rotation;
uniform vec2 u_rotation_origin;
varying vec4 v_color;

void main() {
  vec2 substractOrigin = a_position.xy - u_rotation_origin;

  vec2 rotatedPosition = vec2(
    substractOrigin.x * u_rotation.y + substractOrigin.y * u_rotation.x,
    substractOrigin.y * u_rotation.y - substractOrigin.x * u_rotation.x
  );

  vec2 offsetCoordinates = rotatedPosition - u_offset + u_translation + u_rotation_origin;
  vec2 zeroToOne = offsetCoordinates / u_resolution;
  vec2 zeroToTwo = zeroToOne * 2.0;
  vec2 clipSpace = zeroToTwo - 1.0;
  gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);

  v_color = a_color;
}
`;
