/* 3. Untuk persegi panjang */
rectVertexShader = createShader(gl, gl.VERTEX_SHADER, rectVertexShaderScript);
rectProgram = createProgram(gl, rectVertexShader, fragmentShader);
rectPositionAttributeLocation = gl.getAttribLocation(rectProgram, "a_position");
rectColorAttributeLocation = gl.getAttribLocation(rectProgram, "a_color");
rectResolutionUniformLocation = gl.getUniformLocation(
    rectProgram,
    "u_resolution"
);
rectOffsetUniformLocation = gl.getUniformLocation(rectProgram, "u_offset");
rectTranslationUniformLocation = gl.getUniformLocation(
    rectProgram,
    "u_translation"
);
rectRotationUniformLocation = gl.getUniformLocation(rectProgram, "u_rotation");
rectRotationOriginUniformLocation = gl.getUniformLocation(
    rectProgram,
    "u_rotation_origin"
);
rectBuffer = gl.createBuffer();
rectColorBuffer = gl.createBuffer();
