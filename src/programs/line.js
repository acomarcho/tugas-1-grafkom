/* Create program dan shader */
/* 1. Untuk line */
lineVertexShader = createShader(gl, gl.VERTEX_SHADER, lineVertexShaderScript);
lineProgram = createProgram(gl, lineVertexShader, fragmentShader);
linePositionAttributeLocation = gl.getAttribLocation(lineProgram, "a_position");
lineColorAttributeLocation = gl.getAttribLocation(lineProgram, "a_color");
lineResolutionUniformLocation = gl.getUniformLocation(
    lineProgram,
    "u_resolution"
);
lineOffsetUniformLocation = gl.getUniformLocation(lineProgram, "u_offset");
lineTranslationUniformLocation = gl.getUniformLocation(
    lineProgram,
    "u_translation"
);
lineDilationUniformLocation = gl.getUniformLocation(
    lineProgram,
    "u_dilation"
);
lineRotationUniformLocation = gl.getUniformLocation(lineProgram, "u_rotation");
lineShearUniformLocation = gl.getUniformLocation(
    lineProgram,
    "u_shear"
);
lineRotationOriginUniformLocation = gl.getUniformLocation(
    lineProgram,
    "u_rotation_origin"
);
lineBuffer = gl.createBuffer();
lineColorBuffer = gl.createBuffer();
