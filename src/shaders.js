// Shader untuk line (garis)
lineVertexShaderScript = `
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
lineFragmentShaderScript = `
precision mediump float;
varying vec4 v_color;

void main() {
  gl_FragColor = v_color;
}
`

// Shader untuk persegi
squareVertexShaderScript = `
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
  vec2 zeroToTwo = zeroToOne * 2.0 - 1.0;
  vec2 clipSpace = zeroToTwo * vec2(1, -1);
  gl_Position = vec4(clipSpace, 0, 1);

  v_color = a_color;
}
`;

squareFragmentShaderScript = `
precision mediump float;
varying vec4 v_color;

void main() {
  gl_FragColor = v_color;
}
`

// Shader untuk persegi panjang
rectVertexShaderScript = `
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
rectFragmentShaderScript = `
precision mediump float;
varying vec4 v_color;

void main() {
  gl_FragColor = v_color;
}
`

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
plgnFragmentShaderScript = `
precision mediump float;
varying vec4 v_color;

void main() {
  gl_FragColor = v_color;
}
`