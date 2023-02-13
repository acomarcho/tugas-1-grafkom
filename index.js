/* Inisialisasi WebGL */
var canvas = document.querySelector("#c");
var gl = canvas.getContext("webgl");
if (!gl) {
  throw new Error("Your browser does not support WebGL!");
}

/* Create program dan shader */
/* 1. Untuk line */
lineVertexShader = createShader(gl, gl.VERTEX_SHADER, lineVertexShaderScript);
lineFragmentShader = createShader(gl, gl.FRAGMENT_SHADER, lineFragmentShaderScript);
lineProgram = createProgram(gl, lineVertexShader, lineFragmentShader);
linePositionAttributeLocation = gl.getAttribLocation(lineProgram, "a_position");
lineResolutionUniformLocation = gl.getUniformLocation(lineProgram, "u_resolution");
lineOffsetUniformLocation = gl.getUniformLocation(lineProgram, "u_offset");
lineTranslationUniformLocation = gl.getUniformLocation(lineProgram, "u_translation");
lineRotationUniformLocation = gl.getUniformLocation(lineProgram, "u_rotation");
lineBuffer = gl.createBuffer();

/* Instances menyatakan model-model yang harus digambar di layar */
/* Isinya array of objects, misalkan:
  [
    {
      "type": "LINE",
      "ref": line_object
    }
  ]
*/
var instances = [];

/* Fungsi untuk render WebGL */
function render() {
  /* Boilerplate... */
  resizeCanvasToDisplaySize(gl.canvas);
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  /* Lakukan rendering untuk setiap instance yang ada */
  instances.forEach(instance => {
    if (instance.type === "LINE") {
      /* Gambar garis! */
      gl.useProgram(lineProgram);
      const lineRef = instance.ref;

      /* gl.ARRAY_BUFFER = lineBuffer */
      gl.bindBuffer(gl.ARRAY_BUFFER, lineBuffer);

      /* Masukkan data */
      var positions = [
        lineRef.vertex1[0], lineRef.vertex1[1],
        lineRef.vertex2[0], lineRef.vertex2[1]
      ];
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

      /* Enable attribute */
      gl.enableVertexAttribArray(linePositionAttributeLocation);

      /* Masukkan data ke attribute */
      gl.vertexAttribPointer(linePositionAttributeLocation, 2, gl.FLOAT, false, 0, 0); 

      /* Set resolusi */
      gl.uniform2f(lineResolutionUniformLocation, gl.canvas.width, gl.canvas.height);

      /* Set offset */
      gl.uniform2f(lineOffsetUniformLocation, canvas.getBoundingClientRect().left, canvas.getBoundingClientRect().top);

      /* Set translation */
      gl.uniform2f(lineTranslationUniformLocation, lineRef.translation[0], lineRef.translation[1]);

      /* Set rotation */
      gl.uniform2f(lineRotationUniformLocation, lineRef.rotation[0], lineRef.rotation[1]);

      /* Gambar! */
      gl.drawArrays(gl.LINES, 0, 2);
    }
  })
}

/* ============= */
/* Website logic */
/* ============= */

/* State untuk menyimpan data apakah sedang menggambar sesuatu/tidak */
/* Valid values: NONE, LINE, SQUARE, RECTANGLE, POLYGON */
let currentAction = "NONE";
let clickCount = 0;
let vertexes = [];

/* Click listener untuk button create <xxx> */
function initiateCreateClickListeners() {
  /* Membuat line */
  document.querySelector("#btn-create-line").addEventListener("click", () => {
    currentAction = "LINE";
    clickCount = 0;
    vertexes = [];

    alert(`Untuk membuat sebuah garis:
    1. Klik suatu posisi pada kanvas untuk menandai titik pertama
    2. Klik suatu posisi pada kanvas untuk menandai titik kedua`);

    document.querySelector("#right-title").textContent = "Creating a line..."
  })
}
initiateCreateClickListeners();

/* Refresh left-column agar diisi dengan data yang benar */
function refreshLeftColumn() {
  leftColumnRows = document.querySelector(".left-col-rows");
  htmlContent = "";
  /* Tambahkan button untuk setiap model */
  instances.forEach((instance, idx) => {
    htmlContent += `
      <button id="btn-edit-model-${idx + 1}">Instance ${idx + 1} (${instance.type})</button>
    `
  });
  htmlContent += `
    <button id="btn-cancel-selection">Cancel selection</button>
  `;
  leftColumnRows.innerHTML = htmlContent;

  /* Listener untuk cancel selection */
  document.querySelector("#btn-cancel-selection").addEventListener("click", () => {
    rightColumn = document.querySelector(".right-col");
    rightColumn.innerHTML = `
    <h1 id="right-title">Create a Model</h1>
    <div class="button-div">
      <button id="btn-create-line">Create line</button>
    </div>
    <div class="button-div">
      <button id="btn-create-square">Create square</button>
    </div>
    <div class="button-div">
      <button id="btn-create-rectangle">Create rectangle</button>
    </div>
    <div class="button-div">
      <button id="btn-create-polygon">Create polygon</button>
    </div>`;
    /* Reassign click listeners */
    initiateCreateClickListeners();
  })

  /* Buat listener untuk setiap instance */
  instances.forEach((instance, idx) => {
    document.querySelector(`#btn-edit-model-${idx + 1}`).addEventListener("click", () => {
      rightColumn = document.querySelector(".right-col");
      rightColumn.innerHTML = `
        <h1 id="right-title">Editing instance ${idx + 1} (${instance.type})...</h1>
        <div>
          <h3>Translation</h3>
          <div>
            X:
            <input type="range" min="-${canvas.getBoundingClientRect().width}" max="${canvas.getBoundingClientRect().width}" value="0" step="1" id="x-translate">
          </div>
          <div>
            Y:
            <input type="range" min="-${canvas.getBoundingClientRect().height}" max="${canvas.getBoundingClientRect().height}" value="0" step="1" id="y-translate">
          </div>
          <h3>Rotation</h3>
          <div>
            Angle:
            <input type="range" min="0" max="360" value="0" step="1" id="rotate">
          </div>
        </div>
      `;

      var instanceRef = instance.ref;

      /* Event listener untuk translation (harusnya untuk semua model sama) */
      document.querySelector("#x-translate").addEventListener("input", () => {
        instanceRef.translation[0] = document.querySelector("#x-translate").value;
        render();
      })
      document.querySelector("#y-translate").addEventListener("input", () => {
        instanceRef.translation[1] = document.querySelector("#y-translate").value;
        render();
      })
      document.querySelector("#rotate").addEventListener("input", () => {
        var angleInDegrees = 360 - document.querySelector("#rotate").value;
        var angleInRadians = angleInDegrees * Math.PI / 180;
        instanceRef.rotation[0] = Math.sin(angleInRadians);
        instanceRef.rotation[1] = Math.cos(angleInRadians);
        render();
      })
    })
  })
}
refreshLeftColumn();

/* Click listener untuk canvas */
canvas = document.querySelector("#c");

canvas.addEventListener("click", (e) => {;
  if (currentAction === "LINE") {
    vertexes.push([e.clientX, e.clientY]);
    if (clickCount == 0) {
      clickCount ++
    } else {
      const line = new Line(vertexes[0], vertexes[1]);
      instances.push({
        "type": "LINE",
        "ref": line
      });
      render();
      refreshLeftColumn();

      clickCount = 0;
      vertexes = [];
    }
  }
})