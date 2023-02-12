// Shader untuk line (garis)
this.lineVertexShaderScript = `
attribute vec4 a_position;
uniform vec2 u_resolution;
uniform vec2 u_offset;
uniform vec2 u_translation;

void main() {
  vec2 offsetCoordinates = a_position.xy - u_offset + u_translation;
  vec2 zeroToOne = offsetCoordinates / u_resolution;
  vec2 zeroToTwo = zeroToOne * 2.0;
  vec2 clipSpace = zeroToTwo - 1.0;
  gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
}
`;
this.lineFragmentShaderScript = `
precision mediump float;

void main() {
  gl_FragColor = vec4(1, 0, 0.5, 1);
}
`