/* 2. Untuk persegi */
squareVertexShader = createShader(
    gl,
    gl.VERTEX_SHADER,
    squareVertexShaderScript
  );
  squareProgram = createProgram(gl, squareVertexShader, fragmentShader);
  squarePositionAttributeLocation = gl.getAttribLocation(
    squareProgram,
    "a_position"
  );
  squareColorAttributeLocation = gl.getAttribLocation(squareProgram, "a_color");
  squareResolutionUniformLocation = gl.getUniformLocation(
    squareProgram,
    "u_resolution"
  );
  squareOffsetUniformLocation = gl.getUniformLocation(squareProgram, "u_offset");
  squareTranslationUniformLocation = gl.getUniformLocation(
    squareProgram,
    "u_translation"
  );
  squareRotationUniformLocation = gl.getUniformLocation(
    squareProgram,
    "u_rotation"
  );
  squareRotationOriginUniformLocation = gl.getUniformLocation(
    squareProgram,
    "u_rotation_origin"
  );
  squareBuffer = gl.createBuffer();
  squareColorBuffer = gl.createBuffer();  