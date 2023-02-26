/* 4. Untuk poligon */
plgnVertexShader = createShader(gl, gl.VERTEX_SHADER, plgnVertexShaderScript);
plgnProgram = createProgram(gl, plgnVertexShader, fragmentShader);
plgnPositionAttributeLocation = gl.getAttribLocation(plgnProgram, "a_position");
plgnColorAttributeLocation = gl.getAttribLocation(plgnProgram, "a_color");
plgnResolutionUniformLocation = gl.getUniformLocation(
    plgnProgram,
    "u_resolution"
);
plgnOffsetUniformLocation = gl.getUniformLocation(plgnProgram, "u_offset");
plgnTranslationUniformLocation = gl.getUniformLocation(
    plgnProgram,
    "u_translation"
);
plgnDilationUniformLocation = gl.getUniformLocation(
    plgnProgram,
    "u_dilation"
);
plgnRotationUniformLocation = gl.getUniformLocation(plgnProgram, "u_rotation");
plgnRotationOriginUniformLocation = gl.getUniformLocation(
    plgnProgram,
    "u_rotation_origin"
);
plgnBuffer = gl.createBuffer();
plgnColorBuffer = gl.createBuffer();
