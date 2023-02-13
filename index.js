/* Inisialisasi WebGL */
var canvas = document.querySelector("#c");
var gl = canvas.getContext("webgl");
if (!gl) {
  throw new Error("Your browser does not support WebGL!");
}

/* Create program dan shader */
/* 1. Untuk line */
lineVertexShader = createShader(gl, gl.VERTEX_SHADER, lineVertexShaderScript);
lineFragmentShader = createShader(
  gl,
  gl.FRAGMENT_SHADER,
  lineFragmentShaderScript
);
lineProgram = createProgram(gl, lineVertexShader, lineFragmentShader);
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
lineRotationUniformLocation = gl.getUniformLocation(lineProgram, "u_rotation");
lineRotationOriginUniformLocation = gl.getUniformLocation(
  lineProgram,
  "u_rotation_origin"
);
lineBuffer = gl.createBuffer();
lineColorBuffer = gl.createBuffer();

/* 2. Untuk persegi */

/* 3. Untuk persegi panjang */
rectVertexShader = createShader(gl, gl.VERTEX_SHADER, rectVertexShaderScript);
rectFragmentShader = createShader(
  gl,
  gl.FRAGMENT_SHADER,
  rectFragmentShaderScript
);
rectProgram = createProgram(gl, rectVertexShader, rectFragmentShader);
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

/* 4. Untuk poligon */

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
  instances.forEach((instance) => {
    if (instance.type === "LINE") {
      /* Gambar garis! */
      gl.useProgram(lineProgram);
      const lineRef = instance.ref;

      /* gl.ARRAY_BUFFER = lineBuffer */
      gl.bindBuffer(gl.ARRAY_BUFFER, lineBuffer);

      /* Masukkan data posisi */
      var positions = [
        lineRef.vertex1[0],
        lineRef.vertex1[1],
        lineRef.vertex2[0],
        lineRef.vertex2[1],
      ];
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(positions),
        gl.STATIC_DRAW
      );

      /* Enable attribute */
      gl.enableVertexAttribArray(linePositionAttributeLocation);

      /* Masukkan data ke attribute */
      gl.vertexAttribPointer(
        linePositionAttributeLocation,
        2,
        gl.FLOAT,
        false,
        0,
        0
      );

      /* gl.ARRAY_BUFFER = lineColorBuffer */
      gl.bindBuffer(gl.ARRAY_BUFFER, lineColorBuffer);

      /* Masukkan data warna */
      var colors = [
        lineRef.vertex1_color[0],
        lineRef.vertex1_color[1],
        lineRef.vertex1_color[2],
        lineRef.vertex1_color[3],
        lineRef.vertex2_color[0],
        lineRef.vertex2_color[1],
        lineRef.vertex2_color[2],
        lineRef.vertex2_color[3],
      ];
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

      /* Enable attribute */
      gl.enableVertexAttribArray(lineColorAttributeLocation);

      /* Masukkan data ke attribute */
      gl.vertexAttribPointer(
        lineColorAttributeLocation,
        4,
        gl.FLOAT,
        false,
        0,
        0
      );

      /* Set resolusi */
      gl.uniform2f(
        lineResolutionUniformLocation,
        gl.canvas.width,
        gl.canvas.height
      );

      /* Set offset */
      gl.uniform2f(
        lineOffsetUniformLocation,
        canvas.getBoundingClientRect().left,
        canvas.getBoundingClientRect().top
      );

      /* Set translation */
      gl.uniform2f(
        lineTranslationUniformLocation,
        lineRef.translation[0],
        lineRef.translation[1]
      );

      /* Set rotation */
      gl.uniform2f(
        lineRotationUniformLocation,
        lineRef.getRotationComponents()[0],
        lineRef.getRotationComponents()[1]
      );

      /* Set rotation origin */
      gl.uniform2f(
        lineRotationOriginUniformLocation,
        lineRef.vertex1[0],
        lineRef.vertex1[1]
      );

      /* Gambar! */
      gl.drawArrays(gl.LINES, 0, 2);
    }

    if (instance.type === "RECTANGLE") {
      /* Gambar persegi panjang! */
      gl.useProgram(rectProgram);
      const rectRef = instance.ref;

      /* gl.ARRAY_BUFFER = rectBuffer */
      gl.bindBuffer(gl.ARRAY_BUFFER, rectBuffer);

      /* Masukkan data posisi */
      var positions = rectRef.getFlattenedVertexes();
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(positions),
        gl.STATIC_DRAW
      );

      /* Enable attribute */
      gl.enableVertexAttribArray(rectPositionAttributeLocation);

      /* Masukkan data ke attribute */
      gl.vertexAttribPointer(
        rectPositionAttributeLocation,
        2,
        gl.FLOAT,
        false,
        0,
        0
      );

      /* gl.ARRAY_BUFFER = rectColorBuffer */
      gl.bindBuffer(gl.ARRAY_BUFFER, rectColorBuffer);

      /* Masukkan data warna */
      var colors = rectRef.getFlattenedColors();
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

      /* Enable attribute */
      gl.enableVertexAttribArray(rectColorAttributeLocation);

      /* Masukkan data ke attribute */
      gl.vertexAttribPointer(
        rectColorAttributeLocation,
        4,
        gl.FLOAT,
        false,
        0,
        0
      );

      /* Set resolusi */
      gl.uniform2f(
        rectResolutionUniformLocation,
        gl.canvas.width,
        gl.canvas.height
      );

      /* Set offset */
      gl.uniform2f(
        rectOffsetUniformLocation,
        canvas.getBoundingClientRect().left,
        canvas.getBoundingClientRect().top
      );

      /* Set translation */
      gl.uniform2f(
        rectTranslationUniformLocation,
        rectRef.translation[0],
        rectRef.translation[1]
      );

      /* Set rotation */
      gl.uniform2f(
        rectRotationUniformLocation,
        rectRef.getRotationComponents()[0],
        rectRef.getRotationComponents()[1]
      );

      /* Set rotation origin */
      gl.uniform2f(
        rectRotationOriginUniformLocation,
        rectRef.vertexes[0][0],
        rectRef.vertexes[0][1]
      );

      /* Gambar! */
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    }
  });
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

    document.querySelector("#right-title").textContent = "Creating a line...";
  });

  /* Membuat persegi */

  /* Membuat persegi panjang */
  document
    .querySelector("#btn-create-rectangle")
    .addEventListener("click", () => {
      currentAction = "RECTANGLE";
      clickCount = 0;
      vertexes = [];

      alert(`Untuk membuat sebuah persegi panjang:
    1. Klik suatu posisi pada kanvas untuk menandai titik kiri atas persegi panjang
    2. Isi prompt panjang (1 - ${canvas.getBoundingClientRect().width})
    3. Isi prompt lebar (1 - ${canvas.getBoundingClientRect().height})`);
    });

  /* Membuat poligon */
}
initiateCreateClickListeners();

/* Refresh left-column agar diisi dengan data yang benar */
function refreshLeftColumn() {
  leftColumnRows = document.querySelector(".left-col-rows");
  htmlContent = "";
  /* Tambahkan button untuk setiap model */
  instances.forEach((instance, idx) => {
    htmlContent += `
      <button id="btn-edit-model-${idx + 1}">Instance ${idx + 1} (${
      instance.type
    })</button>
    `;
  });
  htmlContent += `
    <button id="btn-cancel-selection">Cancel selection</button>
  `;
  leftColumnRows.innerHTML = htmlContent;

  /* Listener untuk cancel selection */
  document
    .querySelector("#btn-cancel-selection")
    .addEventListener("click", () => {
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
    });

  /* Buat listener untuk setiap instance */
  instances.forEach((instance, idx) => {
    document
      .querySelector(`#btn-edit-model-${idx + 1}`)
      .addEventListener("click", () => {
        /* Cancel create action */
        currentAction = "NONE";
        clickCount = 0;
        vertexes = [];

        var instanceRef = instance.ref;
        rightColumn = document.querySelector(".right-col");

        if (instance.type === "LINE") {
          /* Semua fungsionalitas LINE! */
          rightColumn.innerHTML = `
          <h1 id="right-title">Editing instance ${idx + 1} (${
            instance.type
          })...</h1>
          <div>
            <h3>Translation</h3>
            <div>
              X:
              <input type="range" min="-${
                canvas.getBoundingClientRect().width
              }" max="${canvas.getBoundingClientRect().width}" value="${
            instanceRef.translation[0]
          }" step="1" id="x-translate">
            </div>
            <div>
              Y:
              <input type="range" min="-${
                canvas.getBoundingClientRect().height
              }" max="${canvas.getBoundingClientRect().height}" value="${
            instanceRef.translation[1]
          }" step="1" id="y-translate">
            </div>
            <h3>Rotation</h3>
            <div>
              Angle:
              <input type="range" min="0" max="360" value="${
                instanceRef.rotation
              }" step="1" id="rotate">
            </div>
            <h3>Vertex 1</h3>
            <div>
              X:
              <input type="range" min="${
                canvas.getBoundingClientRect().left
              }" max="${canvas.getBoundingClientRect().right}" value="${
            instanceRef.vertex1[0]
          }" step="1" id="v1-x">
            </div>
            <div>
              Y:
              <input type="range" min="${
                canvas.getBoundingClientRect().top
              }" max="${canvas.getBoundingClientRect().bottom}" value="${
            instanceRef.vertex1[1]
          }" step="1" id="v1-y">
            </div>
            <h4>Color values (0 - 1)</h4>
            <div>
              R:
              <input type="number" min="0" max="1" value="${
                instanceRef.vertex1_color[0]
              }" id="v1-r">
              G:
              <input type="number" min="0" max="1" value="${
                instanceRef.vertex1_color[1]
              }" id="v1-g">
              B:
              <input type="number" min="0" max="1" value="${
                instanceRef.vertex1_color[2]
              }" id="v1-b">
              A:
              <input type="number" min="0" max="1" value="${
                instanceRef.vertex1_color[3]
              }" id="v1-a">
            </div>
            <h3>Vertex 2</h3>
            <div>
              X:
              <input type="range" min="${
                canvas.getBoundingClientRect().left
              }" max="${canvas.getBoundingClientRect().right}" value="${
            instanceRef.vertex2[0]
          }" step="1" id="v2-x">
            </div>
            <div>
              Y:
              <input type="range" min="${
                canvas.getBoundingClientRect().top
              }" max="${canvas.getBoundingClientRect().bottom}" value="${
            instanceRef.vertex2[1]
          }" step="1" id="v2-y">
            </div>
            <h4>Color values (0 - 1)</h4>
            <div>
              R:
              <input type="number" min="0" max="1" value="${
                instanceRef.vertex2_color[0]
              }" id="v2-r">
              G:
              <input type="number" min="0" max="1" value="${
                instanceRef.vertex2_color[1]
              }" id="v2-g">
              B:
              <input type="number" min="0" max="1" value="${
                instanceRef.vertex2_color[2]
              }" id="v2-b">
              A:
              <input type="number" min="0" max="1" value="${
                instanceRef.vertex2_color[3]
              }" id="v2-a">
            </div>
          </div>
        `;

          /* Event listener untuk translation (harusnya untuk semua model sama) */
          document
            .querySelector("#x-translate")
            .addEventListener("input", () => {
              instanceRef.translation[0] =
                document.querySelector("#x-translate").value;
              render();
            });
          document
            .querySelector("#y-translate")
            .addEventListener("input", () => {
              instanceRef.translation[1] =
                document.querySelector("#y-translate").value;
              render();
            });

          /* Event listener untuk rotation (harusnya untuk semua model sama) */
          document.querySelector("#rotate").addEventListener("input", () => {
            instanceRef.rotation = document.querySelector("#rotate").value;
            render();
          });

          /* Event listener untuk vertex 1 */
          document.querySelector("#v1-x").addEventListener("input", () => {
            instanceRef.vertex1[0] = document.querySelector("#v1-x").value;
            render();
          });
          document.querySelector("#v1-y").addEventListener("input", () => {
            instanceRef.vertex1[1] = document.querySelector("#v1-y").value;
            render();
          });
          document.querySelector("#v1-r").addEventListener("input", () => {
            instanceRef.vertex1_color[0] =
              document.querySelector("#v1-r").value;
            render();
          });
          document.querySelector("#v1-g").addEventListener("input", () => {
            instanceRef.vertex1_color[1] =
              document.querySelector("#v1-g").value;
            render();
          });
          document.querySelector("#v1-b").addEventListener("input", () => {
            instanceRef.vertex1_color[2] =
              document.querySelector("#v1-b").value;
            render();
          });
          document.querySelector("#v1-a").addEventListener("input", () => {
            instanceRef.vertex1_color[3] =
              document.querySelector("#v1-a").value;
            render();
          });

          /* Event listener untuk vertex 2 */
          document.querySelector("#v2-x").addEventListener("input", () => {
            instanceRef.vertex2[0] = document.querySelector("#v2-x").value;
            render();
          });
          document.querySelector("#v2-y").addEventListener("input", () => {
            instanceRef.vertex2[1] = document.querySelector("#v2-y").value;
            render();
          });
          document.querySelector("#v2-r").addEventListener("input", () => {
            instanceRef.vertex2_color[0] =
              document.querySelector("#v2-r").value;
            render();
          });
          document.querySelector("#v2-g").addEventListener("input", () => {
            instanceRef.vertex2_color[1] =
              document.querySelector("#v2-g").value;
            render();
          });
          document.querySelector("#v2-b").addEventListener("input", () => {
            instanceRef.vertex2_color[2] =
              document.querySelector("#v2-b").value;
            render();
          });
          document.querySelector("#v2-a").addEventListener("input", () => {
            instanceRef.vertex2_color[3] =
              document.querySelector("#v2-a").value;
            render();
          });
        } else if (instance.type === "RECTANGLE") {
          /* Semua fungsionalitas LINE! */
          rightColumn.innerHTML = `
          <h1 id="right-title">Editing instance ${idx + 1} (${
            instance.type
          })...</h1>
          <div>
            <h3>Translation</h3>
            <div>
              X:
              <input type="range" min="-${
                canvas.getBoundingClientRect().width
              }" max="${canvas.getBoundingClientRect().width}" value="${
            instanceRef.translation[0]
          }" step="1" id="x-translate">
            </div>
            <div>
              Y:
              <input type="range" min="-${
                canvas.getBoundingClientRect().height
              }" max="${canvas.getBoundingClientRect().height}" value="${
            instanceRef.translation[1]
          }" step="1" id="y-translate">
            </div>
            <h3>Rotation</h3>
            <div>
              Angle:
              <input type="range" min="0" max="360" value="${
                instanceRef.rotation
              }" step="1" id="rotate">
            </div>
          `;

          /* Tambahkan fungsionalitas vertex */
          instanceRef.vertexes.forEach((_, i) => {
            const id = i + 1; // Mempermudah pengerjaan
            rightColumn.innerHTML += `
            <h3>Vertex ${id}</h3>
            <div>
              X:
              <input type="range" min="${
                canvas.getBoundingClientRect().left
              }" max="${canvas.getBoundingClientRect().right}" value="${
              instanceRef.vertexes[i][0]
            }" step="1" id="v${id}-x">
            </div>
            <div>
              Y:
              <input type="range" min="${
                canvas.getBoundingClientRect().top
              }" max="${canvas.getBoundingClientRect().bottom}" value="${
              instanceRef.vertexes[i][1]
            }" step="1" id="v${id}-y">
            </div>
            <h4>Color values (0 - 1)</h4>
            <div>
              R:
              <input type="number" min="0" max="1" value="${
                instanceRef.vertexColors[i][0]
              }" id="v${id}-r">
              G:
              <input type="number" min="0" max="1" value="${
                instanceRef.vertexColors[i][1]
              }" id="v${id}-g">
              B:
              <input type="number" min="0" max="1" value="${
                instanceRef.vertexColors[i][2]
              }" id="v${id}-b">
              A:
              <input type="number" min="0" max="1" value="${
                instanceRef.vertexColors[i][3]
              }" id="v${id}-a">
            </div>
            `;
          });

          /* Event listener untuk translation (harusnya untuk semua model sama) */
          document
            .querySelector("#x-translate")
            .addEventListener("input", () => {
              instanceRef.translation[0] =
                document.querySelector("#x-translate").value;
              render();
            });
          document
            .querySelector("#y-translate")
            .addEventListener("input", () => {
              instanceRef.translation[1] =
                document.querySelector("#y-translate").value;
              render();
            });

          /* Event listener untuk rotation (harusnya untuk semua model sama) */
          document.querySelector("#rotate").addEventListener("input", () => {
            instanceRef.rotation = document.querySelector("#rotate").value;
            render();
          });

          /* Event listener untuk fungsionalitas vertex */
          instanceRef.vertexes.forEach((_, i) => {
            const id = i + 1; // Mempermudah pengerjaan
            document.querySelector(`#v${id}-x`).addEventListener("input", () => {
              instanceRef.vertexes[i][0] = document.querySelector(`#v${id}-x`).value;
              render();
            })
            document.querySelector(`#v${id}-y`).addEventListener("input", () => {
              instanceRef.vertexes[i][1] = document.querySelector(`#v${id}-y`).value;
              render();
            })
            document.querySelector(`#v${id}-r`).addEventListener("input", () => {
              instanceRef.vertexColors[i][0] = document.querySelector(`#v${id}-r`).value;
              render();
            })
            document.querySelector(`#v${id}-g`).addEventListener("input", () => {
              instanceRef.vertexColors[i][1] = document.querySelector(`#v${id}-g`).value;
              render();
            })
            document.querySelector(`#v${id}-b`).addEventListener("input", () => {
              instanceRef.vertexColors[i][2] = document.querySelector(`#v${id}-b`).value;
              render();
            })
            document.querySelector(`#v${id}-a`).addEventListener("input", () => {
              instanceRef.vertexColors[i][3] = document.querySelector(`#v${id}-a`).value;
              render();
            })
          })
        }
      });
  });
}
refreshLeftColumn();

/* Click listener untuk canvas */
canvas = document.querySelector("#c");

canvas.addEventListener("click", (e) => {
  if (currentAction === "LINE") {
    vertexes.push([e.clientX, e.clientY]);
    if (clickCount == 0) {
      clickCount++;
    } else {
      const line = new Line(vertexes[0], vertexes[1]);
      instances.push({
        type: "LINE",
        ref: line,
      });
      render();
      refreshLeftColumn();

      clickCount = 0;
      vertexes = [];
    }
  }

  if (currentAction === "RECTANGLE") {
    vertexes.push([e.clientX, e.clientY]);
    let validLength = 0;
    let validWidth = 0;

    while (!validLength) {
      let length = prompt(
        `Enter length of rectangle: (1-${
          canvas.getBoundingClientRect().width
        }), 0 to cancel`
      );
      if (isNaN(length)) {
        continue;
      }
      if (parseInt(length) === 0) {
        clickCount = 0;
        vertexes = [];
        return;
      }
      if (length < 1 || length > canvas.getBoundingClientRect().width) {
        continue;
      }
      validLength = parseInt(length);
    }

    while (!validWidth) {
      let width = prompt(
        `Enter width of rectangle: (1-${
          canvas.getBoundingClientRect().height
        }), 0 to cancel`
      );
      if (isNaN(width)) {
        continue;
      }
      if (parseInt(width) === 0) {
        clickCount = 0;
        vertexes = [];
        return;
      }
      if (width < 1 || width > canvas.getBoundingClientRect().height) {
        continue;
      }
      validWidth = parseInt(width);
    }

    const rect = new Rectangle(
      [vertexes[0][0], vertexes[0][1]],
      validLength,
      validWidth
    );
    instances.push({
      type: "RECTANGLE",
      ref: rect,
    });

    render();
    refreshLeftColumn();

    clickCount = 0;
    vertexes = [];
  }
});

/* Click listener untuk fitur export model */
document.querySelector("#btn-export-models").addEventListener("click", () => {
  const link = document.createElement("a");
  const file = new Blob([JSON.stringify(instances)], { type: "text/plain" });
  link.href = URL.createObjectURL(file);
  link.download = `model-${new Date().toISOString()}.grafkom`;
  link.click();
  URL.revokeObjectURL(link.href);
});

/* Click listener untuk fitur import model */
document.querySelector("#btn-import-models").addEventListener("click", () => {
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = ".grafkom";

  fileInput.addEventListener("change", () => {
    if (fileInput.files && fileInput.files[0]) {
      var myFile = fileInput.files[0];
      var reader = new FileReader();

      reader.addEventListener("load", (e) => {
        try {
          var _instances = JSON.parse(e.target.result);
          newInstances = [];

          _instances.forEach(({ type, ref }) => {
            if (type === "LINE") {
              /* Proses line */
              const line = new Line(ref.vertex1, ref.vertex2);
              line.vertex1_color = ref.vertex1_color;
              line.vertex2_color = ref.vertex2_color;
              line.translation = ref.translation;
              line.rotation = ref.rotation;
              newInstances.push({
                type: "LINE",
                ref: line,
              });
            }
          });

          instances = newInstances;
          render();
          refreshLeftColumn();
        } catch (error) {
          alert(error);
        }
      });

      reader.readAsBinaryString(myFile);
    }
  });

  fileInput.click();
});
