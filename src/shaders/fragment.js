// Shader for Fragment (colors)
fragmentShaderScript = `
precision mediump float;
varying vec4 v_color;

void main() {
  gl_FragColor = v_color;
}
`