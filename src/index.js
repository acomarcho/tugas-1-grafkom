/* Inisialisasi WebGL */
var canvas = document.querySelector("#c");
var gl = canvas.getContext("webgl");
if (!gl) {
  throw new Error("Your browser does not support WebGL!");
}

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

      /* Set dilation */
      gl.uniform2f(
        lineDilationUniformLocation,
        lineRef.dilation,
        lineRef.dilation
      );

      /* Set shear */
      gl.uniform2f(
        lineShearUniformLocation,
        lineRef.shear[0],
        lineRef.shear[1]
      );


      /* Set rotation */
      gl.uniform2f(
        lineRotationUniformLocation,
        lineRef.getRotationComponents()[0],
        lineRef.getRotationComponents()[1]
      );

      /* Set rotation origin */
      const origin = lineRef.findCentroid();
      gl.uniform2f(lineRotationOriginUniformLocation, origin[0], origin[1]);

      /* Gambar! */
      gl.drawArrays(gl.LINES, 0, 2);
    }

    if (instance.type === "SQUARE") {
      /* Gambar persegi! */
      gl.useProgram(squareProgram);
      const squareRef = instance.ref;

      /* gl.ARRAY_BUFFER = squareBuffer */
      gl.bindBuffer(gl.ARRAY_BUFFER, squareBuffer);

      /* Masukkan data posisi */
      var positions = squareRef.getFlattenedVertexes();
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(positions),
        gl.STATIC_DRAW
      );

      /* Enable attribute */
      gl.enableVertexAttribArray(squarePositionAttributeLocation);

      /* Masukkan data ke attribute */
      gl.vertexAttribPointer(
        squarePositionAttributeLocation,
        2,
        gl.FLOAT,
        false,
        0,
        0
      );

      /* gl.ARRAY_BUFFER = squareColorBuffer */
      gl.bindBuffer(gl.ARRAY_BUFFER, squareColorBuffer);

      /* Masukkan data warna */
      var colors = squareRef.getFlattenedColors();
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

      /* Enable attribute */
      gl.enableVertexAttribArray(squareColorAttributeLocation);

      /* Masukkan data ke attribute */
      gl.vertexAttribPointer(
        squareColorAttributeLocation,
        4,
        gl.FLOAT,
        false,
        0,
        0
      );

      /* Set resolusi */
      gl.uniform2f(
        squareResolutionUniformLocation,
        gl.canvas.width,
        gl.canvas.height
      );

      /* Set offset */
      gl.uniform2f(
        squareOffsetUniformLocation,
        canvas.getBoundingClientRect().left,
        canvas.getBoundingClientRect().top
      );

      /* Set translation */
      gl.uniform2f(
        squareTranslationUniformLocation,
        squareRef.translation[0],
        squareRef.translation[1]
      );


      /* Set dilation */
      gl.uniform2f(
        squareDilationUniformLocation,
        squareRef.dilation,
        squareRef.dilation
      );

      /* Set shear */
      gl.uniform2f(
        squareShearUniformLocation,
        squareRef.shear[0],
        squareRef.shear[1]
      );

      /* Set rotation */
      gl.uniform2f(
        squareRotationUniformLocation,
        squareRef.getRotationComponents()[0],
        squareRef.getRotationComponents()[1]
      );

      /* Set rotation origin */
      const origin = squareRef.findCentroid();
      gl.uniform2f(squareRotationOriginUniformLocation, origin[0], origin[1]);

      /* Gambar! */
      gl.drawArrays(gl.TRIANGLES, 0, 6);
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

      /* Set dilation */
      gl.uniform2f(
        rectDilationUniformLocation,
        rectRef.dilation,
        rectRef.dilation
      );

      /* Set shear */
      gl.uniform2f(
        rectShearUniformLocation,
        rectRef.shear[0],
        rectRef.shear[1]
      );

      /* Set rotation */
      gl.uniform2f(
        rectRotationUniformLocation,
        rectRef.getRotationComponents()[0],
        rectRef.getRotationComponents()[1]
      );

      /* Set rotation origin */
      const origin = rectRef.findCentroid();
      gl.uniform2f(rectRotationOriginUniformLocation, origin[0], origin[1]);

      /* Gambar! */
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    }

    if (instance.type === "POLYGON") {
      /* Gambar polygon! */
      gl.useProgram(plgnProgram);
      const plgnRef = instance.ref;

      /* gl.ARRAY_BUFFER = plgnBuffer */
      gl.bindBuffer(gl.ARRAY_BUFFER, plgnBuffer);

      /* Masukkan data posisi */
      var positions = plgnRef.getFlattenedVertexes();
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(positions),
        gl.STATIC_DRAW
      );

      /* Enable attribute */
      gl.enableVertexAttribArray(plgnPositionAttributeLocation);

      /* Masukkan data ke attribute */
      gl.vertexAttribPointer(
        plgnPositionAttributeLocation,
        2,
        gl.FLOAT,
        false,
        0,
        0
      );

      /* gl.ARRAY_BUFFER = plgnColorBuffer */
      gl.bindBuffer(gl.ARRAY_BUFFER, plgnColorBuffer);

      /* Masukkan data warna */
      var colors = plgnRef.getFlattenedColors();
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

      /* Enable attribute */
      gl.enableVertexAttribArray(plgnColorAttributeLocation);

      /* Masukkan data ke attribute */
      gl.vertexAttribPointer(
        plgnColorAttributeLocation,
        4,
        gl.FLOAT,
        false,
        0,
        0
      );

      /* Set resolusi */
      gl.uniform2f(
        plgnResolutionUniformLocation,
        gl.canvas.width,
        gl.canvas.height
      );

      /* Set offset */
      gl.uniform2f(
        plgnOffsetUniformLocation,
        canvas.getBoundingClientRect().left,
        canvas.getBoundingClientRect().top
      );

      /* Set translation */
      gl.uniform2f(
        plgnTranslationUniformLocation,
        plgnRef.translation[0],
        plgnRef.translation[1]
      );

      /* Set dilation */
      gl.uniform2f(
        plgnDilationUniformLocation,
        plgnRef.dilation,
        plgnRef.dilation
      );

      /* Set shear */
      gl.uniform2f(
        plgnShearUniformLocation,
        plgnRef.shear[0],
        plgnRef.shear[1]
      );

      /* Set rotation */
      gl.uniform2f(
        plgnRotationUniformLocation,
        plgnRef.getRotationComponents()[0],
        plgnRef.getRotationComponents()[1]
      );

      /* Set rotation origin */
      const origin = plgnRef.findCentroid();
      gl.uniform2f(plgnRotationOriginUniformLocation, origin[0], origin[1]);

      /* Gambar! */
      gl.drawArrays(gl.TRIANGLE_FAN, 0, plgnRef.vertexes.length);
    }
  });
  refreshLeftColumn();
}

/* ============= */
/* Website logic */
/* ============= */

/* State untuk menyimpan data apakah sedang menggambar sesuatu/tidak */
/* Valid values: NONE, LINE, SQUARE, RECTANGLE, POLYGON, ADD_VERTEX */
let currentAction = "NONE";
let clickCount = 0;
let polygonN = 0;
let targetPolygon = -1;
let vertexes = [];

/* Click listener untuk button create <xxx> */
function initiateCreateClickListeners() {
  /* Membuat line */
  document.querySelector("#btn-create-line").addEventListener("click", () => {
    currentAction = "LINE";
    clickCount = 0;
    polygonN = 0;
    vertexes = [];

    alert(`Untuk membuat sebuah garis:
    1. Klik suatu posisi pada kanvas untuk menandai titik pertama
    2. Klik suatu posisi pada kanvas untuk menandai titik kedua`);

    document.querySelector("#right-title").textContent = "Creating a line...";
  });

  /* Membuat persegi */
  document.querySelector("#btn-create-square").addEventListener("click", () => {
    currentAction = "SQUARE";
    clickCount = 0;
    polygonN = 0;
    vertexes = [];

    alert(`Untuk membuat sebuah persegi:
  1. Klik suatu posisi pada kanvas untuk menandai titik kiri atas persegi
  2. Isi prompt besar sisi (1 - ${canvas.getBoundingClientRect().width})`);

    document.querySelector("#right-title").textContent = "Creating a square...";
  });

  /* Membuat persegi panjang */
  document
    .querySelector("#btn-create-rectangle")
    .addEventListener("click", () => {
      currentAction = "RECTANGLE";
      clickCount = 0;
      polygonN = 0;
      vertexes = [];

      alert(`Untuk membuat sebuah persegi panjang:
    1. Klik suatu posisi pada kanvas untuk menandai titik kiri atas persegi panjang
    2. Isi prompt panjang (1 - ${canvas.getBoundingClientRect().width})
    3. Isi prompt lebar (1 - ${canvas.getBoundingClientRect().height})`);

      document.querySelector("#right-title").textContent =
        "Creating a rectangle...";
    });

  /* Membuat poligon */
  /* Membuat persegi panjang */
  document
    .querySelector("#btn-create-polygon")
    .addEventListener("click", () => {
      currentAction = "POLYGON";
      clickCount = 0;
      polygonN = 0;
      vertexes = [];

      alert(`Untuk membuat poligon:
    1. Isi berapa banyak titik sudut poligon (>= 3)
    2. Klik pada layar sebanyak titik sudut yang diinginkan`);

      while (!polygonN) {
        let N = prompt(`Enter number of vertexes: (>= 3)`);
        if (isNaN(N)) {
          continue;
        }
        if (N < 3) {
          continue;
        }
        polygonN = parseInt(N);
      }

      document.querySelector(
        "#right-title"
      ).textContent = `Creating a polygon of N = ${polygonN}...`;
    });
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
            <h3>Dilation</h3>
            <div>
              Scale:
              <input type="range" min="0.01" max="5.0" value="${
                instanceRef.dilation
              }" step="0.01" id="dilate">
            </div>
            <h3>Shear</h3>
            <div>
              X:
              <input type="range" min="-3.0" max="3.0" value="${
                instanceRef.shear[0]
              }" step="0.01" id="shearx">
            </div>
            <div>
              Y:
              <input type="range" min="-3.0" max="3.0" value="${
                instanceRef.shear[1]
              }" step="0.01" id="sheary">
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
              <input type="number" min="0" max="1" step="0.1" value="${
                instanceRef.vertex1_color[0]
              }" id="v1-r">
              G:
              <input type="number" min="0" max="1" step="0.1" value="${
                instanceRef.vertex1_color[1]
              }" id="v1-g">
              B:
              <input type="number" min="0" max="1" step="0.1" value="${
                instanceRef.vertex1_color[2]
              }" id="v1-b">
              A:
              <input type="number" min="0" max="1" step="0.1" value="${
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
              <input type="number" min="0" max="1" step="0.1" value="${
                instanceRef.vertex2_color[0]
              }" id="v2-r">
              G:
              <input type="number" min="0" max="1" step="0.1" value="${
                instanceRef.vertex2_color[1]
              }" id="v2-g">
              B:
              <input type="number" min="0" max="1" step="0.1" value="${
                instanceRef.vertex2_color[2]
              }" id="v2-b">
              A:
              <input type="number" min="0" max="1" step="0.1" value="${
                instanceRef.vertex2_color[3]
              }" id="v2-a">
            </div>
          </div>
        `;

          /* Event listener untuk translation (harusnya untuk semua model sama) */
          document
            .querySelector("#x-translate")
            .addEventListener("input", () => {
              instanceRef.translation[0] = parseInt(
                document.querySelector("#x-translate").value
              );
              render();
            });
          document
            .querySelector("#y-translate")
            .addEventListener("input", () => {
              instanceRef.translation[1] = parseInt(
                document.querySelector("#y-translate").value
              );
              render();
            });

          /* Event listener untuk rotation (harusnya untuk semua model sama) */
          document.querySelector("#rotate").addEventListener("input", () => {
            instanceRef.rotation = parseInt(
              document.querySelector("#rotate").value
            );
            render();
          });
          
          /* Event listener untuk dilation (harusnya untuk semua model sama) */
          document.querySelector("#dilate").addEventListener("input", () => {
            instanceRef.dilation = parseFloat(
              document.querySelector("#dilate").value
            );
            render();
          });
          
          /* Event listener untuk shear x axis (harusnya untuk semua model sama) */
          document.querySelector("#shearx").addEventListener("input", () => {
            instanceRef.shear[0] = parseFloat(
              document.querySelector("#shearx").value
            );
            render();
          });
          
          /* Event listener untuk shear y axis (harusnya untuk semua model sama) */
          document.querySelector("#sheary").addEventListener("input", () => {
            instanceRef.shear[1] = parseFloat(
              document.querySelector("#sheary").value
            );
            render();
          });

          /* Event listener untuk vertex 1 */
          document.querySelector("#v1-x").addEventListener("input", () => {
            instanceRef.vertex1[0] = parseInt(
              document.querySelector("#v1-x").value
            );
            render();
          });
          document.querySelector("#v1-y").addEventListener("input", () => {
            instanceRef.vertex1[1] = parseInt(
              document.querySelector("#v1-y").value
            );
            render();
          });
          document.querySelector("#v1-r").addEventListener("input", () => {
            instanceRef.vertex1_color[0] = parseFloat(
              document.querySelector("#v1-r").value
            );
            render();
          });
          document.querySelector("#v1-g").addEventListener("input", () => {
            instanceRef.vertex1_color[1] = parseFloat(
              document.querySelector("#v1-g").value
            );
            render();
          });
          document.querySelector("#v1-b").addEventListener("input", () => {
            instanceRef.vertex1_color[2] = parseFloat(
              document.querySelector("#v1-b").value
            );
            render();
          });
          document.querySelector("#v1-a").addEventListener("input", () => {
            instanceRef.vertex1_color[3] = parseFloat(
              document.querySelector("#v1-a").value
            );
            render();
          });

          /* Event listener untuk vertex 2 */
          document.querySelector("#v2-x").addEventListener("input", () => {
            instanceRef.vertex2[0] = parseInt(
              document.querySelector("#v2-x").value
            );
            render();
          });
          document.querySelector("#v2-y").addEventListener("input", () => {
            instanceRef.vertex2[1] = parseInt(
              document.querySelector("#v2-y").value
            );
            render();
          });
          document.querySelector("#v2-r").addEventListener("input", () => {
            instanceRef.vertex2_color[0] = parseFloat(
              document.querySelector("#v2-r").value
            );
            render();
          });
          document.querySelector("#v2-g").addEventListener("input", () => {
            instanceRef.vertex2_color[1] = parseFloat(
              document.querySelector("#v2-g").value
            );
            render();
          });
          document.querySelector("#v2-b").addEventListener("input", () => {
            instanceRef.vertex2_color[2] = parseFloat(
              document.querySelector("#v2-b").value
            );
            render();
          });
          document.querySelector("#v2-a").addEventListener("input", () => {
            instanceRef.vertex2_color[3] = parseFloat(
              document.querySelector("#v2-a").value
            );
            render();
          });
        } else if (instance.type === "SQUARE") {
          rightColumn.innerHTML = `
            <h1 id="right-title">Editing instance ${idx + 1} (${
            instance.type
          })...</h1>
            <div>
              <h3>Length</h3>
              <div>
                Length:
                <input type="range" min="0" max="${
                  canvas.getBoundingClientRect().width
                }" value="${instanceRef.size}" id="length-slider" />
              </div>
            </div>
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
              <h3>Dilation</h3>
              <div>
                Scale:
                <input type="range" min="0.01" max="5.0" value="${
                  instanceRef.dilation
                }" step="0.01" id="dilate">
              </div>
              <h3>Shear</h3>
              <div>
                X:
                <input type="range" min="-3.0" max="3.0" value="${
                  instanceRef.shear[0]
                }" step="0.01" id="shearx">
              </div>
              <div>
                Y:
                <input type="range" min="-3.0" max="3.0" value="${
                  instanceRef.shear[1]
                }" step="0.01" id="sheary">
              </div>
              <h3>Rotation</h3>
              <div>
                Angle:
                <input type="range" min="0" max="360" value="${
                  instanceRef.rotation
                }" step="1" id="rotate">
              </div>
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
              <input type="number" min="0" max="1" step="0.1" value="${
                instanceRef.vertexColors[i][0]
              }" id="v${id}-r">
              G:
              <input type="number" min="0" max="1" step="0.1" value="${
                instanceRef.vertexColors[i][1]
              }" id="v${id}-g">
              B:
              <input type="number" min="0" max="1" step="0.1" value="${
                instanceRef.vertexColors[i][2]
              }" id="v${id}-b">
              A:
              <input type="number" min="0" max="1" step="0.1" value="${
                instanceRef.vertexColors[i][3]
              }" id="v${id}-a">
            </div>
            `;
          });

          /* Special model functions */
          function syncSlidersWithNewSize() {
            instanceRef.vertexes.forEach((v, i) => {
              const id = i + 1;
              document.querySelector(`#v${id}-x`).value = v[0];
              document.querySelector(`#v${id}-y`).value = v[1];
            });
          }

          document
            .querySelector("#length-slider")
            .addEventListener("input", () => {
              instanceRef.size = parseInt(
                document.querySelector("#length-slider").value
              );
              instanceRef.updateVertexes();
              syncSlidersWithNewSize();
              render();
            });

          /* Event listener untuk translation (harusnya untuk semua model sama) */
          document
            .querySelector("#x-translate")
            .addEventListener("input", () => {
              instanceRef.translation[0] = parseInt(
                document.querySelector("#x-translate").value
              );
              render();
            });
          document
            .querySelector("#y-translate")
            .addEventListener("input", () => {
              instanceRef.translation[1] = parseInt(
                document.querySelector("#y-translate").value
              );
              render();
            });

          /* Event listener untuk rotation (harusnya untuk semua model sama) */
          document.querySelector("#rotate").addEventListener("input", () => {
            instanceRef.rotation = parseInt(
              document.querySelector("#rotate").value
            );
            render();
          });
          
          /* Event listener untuk dilation (harusnya untuk semua model sama) */
          document.querySelector("#dilate").addEventListener("input", () => {
            instanceRef.dilation = parseFloat(
              document.querySelector("#dilate").value
            );
            render();
          });
          
          /* Event listener untuk shear x axis (harusnya untuk semua model sama) */
          document.querySelector("#shearx").addEventListener("input", () => {
            instanceRef.shear[0] = parseFloat(
              document.querySelector("#shearx").value
            );
            render();
          });
          
          /* Event listener untuk shear y axis (harusnya untuk semua model sama) */
          document.querySelector("#sheary").addEventListener("input", () => {
            instanceRef.shear[1] = parseFloat(
              document.querySelector("#sheary").value
            );
            render();
          });

          /* Event listener untuk fungsionalitas vertex */
          instanceRef.vertexes.forEach((_, i) => {
            const id = i + 1; // Mempermudah pengerjaan
            document
              .querySelector(`#v${id}-x`)
              .addEventListener("input", () => {
                // Reference for counting distance
                oldVertexX = instanceRef.vertexes[i][0];

                instanceRef.vertexes[i][0] = parseInt(
                  document.querySelector(`#v${id}-x`).value
                );
                // Keeping integrity
                instanceRef.size +=
                  i == 0 || i == 3
                    ? oldVertexX - instanceRef.vertexes[i][0]
                    : instanceRef.vertexes[i][0] - oldVertexX;
                instanceRef.updateVertexes(i);
                instanceRef.updateSize();

                document.querySelector("#length-slider").value =
                  instanceRef.size.toString();

                render();
              });
            document
              .querySelector(`#v${id}-y`)
              .addEventListener("input", () => {
                // Reference for counting distance
                oldVertexY = instanceRef.vertexes[i][1];

                instanceRef.vertexes[i][1] = parseInt(
                  document.querySelector(`#v${id}-y`).value
                );
                // Keeping integrity
                instanceRef.size +=
                  i == 0 || i == 1
                    ? oldVertexY - instanceRef.vertexes[i][1]
                    : instanceRef.vertexes[i][1] - oldVertexY;
                instanceRef.updateVertexes(i);

                render();
              });
            document
              .querySelector(`#v${id}-r`)
              .addEventListener("input", () => {
                instanceRef.vertexColors[i][0] = parseFloat(
                  document.querySelector(`#v${id}-r`).value
                );
                render();
              });
            document
              .querySelector(`#v${id}-g`)
              .addEventListener("input", () => {
                instanceRef.vertexColors[i][1] = parseFloat(
                  document.querySelector(`#v${id}-g`).value
                );
                render();
              });
            document
              .querySelector(`#v${id}-b`)
              .addEventListener("input", () => {
                instanceRef.vertexColors[i][2] = parseFloat(
                  document.querySelector(`#v${id}-b`).value
                );
                render();
              });
            document
              .querySelector(`#v${id}-a`)
              .addEventListener("input", () => {
                instanceRef.vertexColors[i][3] = parseFloat(
                  document.querySelector(`#v${id}-a`).value
                );
                render();
              });
          });
        } else if (instance.type === "RECTANGLE") {
          /* Semua fungsionalitas RECTANGLE! */
          rightColumn.innerHTML = `
          <h1 id="right-title">Editing instance ${idx + 1} (${
            instance.type
          })...</h1>
          <div>
            <h3>Length & width</h3>
            <div>
              Length:
              <input type="range" min="0" max="${
                canvas.getBoundingClientRect().width
              }" value="${instanceRef.length}" id="length-slider" />
            </div>
            <div>
              Width:
              <input type="range" min="0" max="${
                canvas.getBoundingClientRect().height
              }" value="${instanceRef.width}" id="width-slider" />
            </div>
          </div>
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
            <h3>Dilation</h3>
            <div>
              Scale:
              <input type="range" min="0.01" max="5.0" value="${
                instanceRef.dilation
              }" step="0.01" id="dilate">
            </div>
            <h3>Shear</h3>
            <div>
              X:
              <input type="range" min="-3.0" max="3.0" value="${
                instanceRef.shear[0]
              }" step="0.01" id="shearx">
            </div>
            <div>
              Y:
              <input type="range" min="-3.0" max="3.0" value="${
                instanceRef.shear[1]
              }" step="0.01" id="sheary">
            </div>
            <h3>Rotation</h3>
            <div>
              Angle:
              <input type="range" min="0" max="360" value="${
                instanceRef.rotation
              }" step="1" id="rotate">
            </div>
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
              <input type="number" min="0" max="1" step="0.1" value="${
                instanceRef.vertexColors[i][0]
              }" id="v${id}-r">
              G:
              <input type="number" min="0" max="1" step="0.1" value="${
                instanceRef.vertexColors[i][1]
              }" id="v${id}-g">
              B:
              <input type="number" min="0" max="1" step="0.1" value="${
                instanceRef.vertexColors[i][2]
              }" id="v${id}-b">
              A:
              <input type="number" min="0" max="1" step="0.1" value="${
                instanceRef.vertexColors[i][3]
              }" id="v${id}-a">
            </div>
            `;
          });

          /* Event listener untuk translation (harusnya untuk semua model sama) */
          document
            .querySelector("#x-translate")
            .addEventListener("input", () => {
              instanceRef.translation[0] = parseInt(
                document.querySelector("#x-translate").value
              );
              render();
            });
          document
            .querySelector("#y-translate")
            .addEventListener("input", () => {
              instanceRef.translation[1] = parseInt(
                document.querySelector("#y-translate").value
              );
              render();
            });

          /* Special model functions */
          function syncSlidersWithNewWidthLength() {
            instanceRef.vertexes.forEach((v, i) => {
              const id = i + 1;
              document.querySelector(`#v${id}-x`).value = v[0];
              document.querySelector(`#v${id}-y`).value = v[1];
            });
          }

          document
            .querySelector("#length-slider")
            .addEventListener("input", () => {
              instanceRef.length = parseInt(
                document.querySelector("#length-slider").value
              );
              instanceRef.updateVertexes();
              syncSlidersWithNewWidthLength();
              render();
            });
          document
            .querySelector("#width-slider")
            .addEventListener("input", () => {
              instanceRef.width = parseInt(
                document.querySelector("#width-slider").value
              );
              instanceRef.updateVertexes();
              syncSlidersWithNewWidthLength();
              render();
            });

          /* Event listener untuk rotation (harusnya untuk semua model sama) */
          document.querySelector("#rotate").addEventListener("input", () => {
            instanceRef.rotation = parseInt(
              document.querySelector("#rotate").value
            );
            render();
          });
          
          /* Event listener untuk dilation (harusnya untuk semua model sama) */
          document.querySelector("#dilate").addEventListener("input", () => {
            instanceRef.dilation = parseFloat(
              document.querySelector("#dilate").value
            );
            render();
          });
          
          /* Event listener untuk shear x axis (harusnya untuk semua model sama) */
          document.querySelector("#shearx").addEventListener("input", () => {
            instanceRef.shear[0] = parseFloat(
              document.querySelector("#shearx").value
            );
            render();
          });
          
          /* Event listener untuk shear y axis (harusnya untuk semua model sama) */
          document.querySelector("#sheary").addEventListener("input", () => {
            instanceRef.shear[1] = parseFloat(
              document.querySelector("#sheary").value
            );
            render();
          });

          /* Event listener untuk fungsionalitas vertex */
          instanceRef.vertexes.forEach((_, i) => {
            const id = i + 1; // Mempermudah pengerjaan
            document
              .querySelector(`#v${id}-x`)
              .addEventListener("input", () => {
                // Reference for counting distance
                oldVertexX = instanceRef.vertexes[i][0];

                instanceRef.vertexes[i][0] = parseInt(
                  document.querySelector(`#v${id}-x`).value
                );

                // Keeping integrity
                instanceRef.length +=
                  i == 0 || i == 3
                    ? oldVertexX - instanceRef.vertexes[i][0]
                    : instanceRef.vertexes[i][0] - oldVertexX;
                instanceRef.updateVertexes(i);
                instanceRef.updateWidthLength();

                document.querySelector("#length-slider").value =
                  instanceRef.length.toString();
                document.querySelector("#width-slider").value =
                  instanceRef.width.toString();

                render();
              });
            document
              .querySelector(`#v${id}-y`)
              .addEventListener("input", () => {
                // Reference for counting distance
                oldVertexY = instanceRef.vertexes[i][1];

                instanceRef.vertexes[i][1] = parseInt(
                  document.querySelector(`#v${id}-y`).value
                );

                // Keeping integrity
                instanceRef.width +=
                  i == 0 || i == 1
                    ? oldVertexY - instanceRef.vertexes[i][1]
                    : instanceRef.vertexes[i][1] - oldVertexY;
                instanceRef.updateVertexes(i);
                instanceRef.updateWidthLength();

                document.querySelector("#length-slider").value =
                  instanceRef.length.toString();
                document.querySelector("#width-slider").value =
                  instanceRef.width.toString();

                render();
              });
            document
              .querySelector(`#v${id}-r`)
              .addEventListener("input", () => {
                instanceRef.vertexColors[i][0] = parseFloat(
                  document.querySelector(`#v${id}-r`).value
                );
                render();
              });
            document
              .querySelector(`#v${id}-g`)
              .addEventListener("input", () => {
                instanceRef.vertexColors[i][1] = parseFloat(
                  document.querySelector(`#v${id}-g`).value
                );
                render();
              });
            document
              .querySelector(`#v${id}-b`)
              .addEventListener("input", () => {
                instanceRef.vertexColors[i][2] = parseFloat(
                  document.querySelector(`#v${id}-b`).value
                );
                render();
              });
            document
              .querySelector(`#v${id}-a`)
              .addEventListener("input", () => {
                instanceRef.vertexColors[i][3] = parseFloat(
                  document.querySelector(`#v${id}-a`).value
                );
                render();
              });
          });
        } else if (instance.type === "POLYGON") {
          const clickMyself = () => {
            document.querySelector(`#btn-edit-model-${idx + 1}`).click();
          };

          /* Semua fungsionalitas POLYGON! */
          rightColumn.innerHTML = `
          <h1 id="right-title">Editing instance ${idx + 1} (${
            instance.type
          })...</h1>
          <div>
            <button id="add-vertex">Add vertex</button>
          </div>
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
            <h3>Dilation</h3>
            <div>
              Scale:
              <input type="range" min="0.01" max="5.0" value="${
                instanceRef.dilation
              }" step="0.01" id="dilate">
            </div>
            <h3>Shear</h3>
            <div>
              X:
              <input type="range" min="-3.0" max="3.0" value="${
                instanceRef.shear[0]
              }" step="0.01" id="shearx">
            </div>
            <div>
              Y:
              <input type="range" min="-3.0" max="3.0" value="${
                instanceRef.shear[1]
              }" step="0.01" id="sheary">
            </div>
            <h3>Rotation</h3>
            <div>
              Angle:
              <input type="range" min="0" max="360" value="${
                instanceRef.rotation
              }" step="1" id="rotate">
            </div>
          </div>
          `;

          /* Tambahkan fungsionalitas vertex */
          instanceRef.vertexes.forEach((_, i) => {
            const id = i + 1; // Mempermudah pengerjaan
            rightColumn.innerHTML += `
            <h3>Vertex ${id}</h3>
            <div>
              <button id="v${id}-delete">Delete</button>
            </div>
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
              <input type="number" min="0" max="1" step="0.1" value="${
                instanceRef.vertexColors[i][0]
              }" id="v${id}-r">
              G:
              <input type="number" min="0" max="1" step="0.1" value="${
                instanceRef.vertexColors[i][1]
              }" id="v${id}-g">
              B:
              <input type="number" min="0" max="1" step="0.1" value="${
                instanceRef.vertexColors[i][2]
              }" id="v${id}-b">
              A:
              <input type="number" min="0" max="1" step="0.1" value="${
                instanceRef.vertexColors[i][3]
              }" id="v${id}-a">
            </div>
            `;
          });

          /* Event listener untuk add vertex */
          document
            .querySelector("#add-vertex")
            .addEventListener("click", () => {
              window.alert(
                "Untuk menambah vertex, silakan klik suatu titik pada canvas."
              );
              currentAction = "ADD_VERTEX";
              targetPolygon = idx;
            });

          /* Event listener untuk translation (harusnya untuk semua model sama) */
          document
            .querySelector("#x-translate")
            .addEventListener("input", () => {
              instanceRef.translation[0] = parseInt(
                document.querySelector("#x-translate").value
              );
              render();
            });
          document
            .querySelector("#y-translate")
            .addEventListener("input", () => {
              instanceRef.translation[1] = parseInt(
                document.querySelector("#y-translate").value
              );
              render();
            });

          /* Event listener untuk rotation (harusnya untuk semua model sama) */
          document.querySelector("#rotate").addEventListener("input", () => {
            instanceRef.rotation = parseInt(
              document.querySelector("#rotate").value
            );
            render();
          });
          
          /* Event listener untuk dilation (harusnya untuk semua model sama) */
          document.querySelector("#dilate").addEventListener("input", () => {
            instanceRef.dilation = parseFloat(
              document.querySelector("#dilate").value
            );
            render();
          });
          
          /* Event listener untuk shear x axis (harusnya untuk semua model sama) */
          document.querySelector("#shearx").addEventListener("input", () => {
            instanceRef.shear[0] = parseFloat(
              document.querySelector("#shearx").value
            );
            render();
          });
          
          /* Event listener untuk shear y axis (harusnya untuk semua model sama) */
          document.querySelector("#sheary").addEventListener("input", () => {
            instanceRef.shear[1] = parseFloat(
              document.querySelector("#sheary").value
            );
            render();
          });

          /* Event listener untuk fungsionalitas vertex */
          instanceRef.vertexes.forEach((_, i) => {
            const id = i + 1; // Mempermudah pengerjaan
            document
              .querySelector(`#v${id}-delete`)
              .addEventListener("click", () => {
                if (instanceRef.vertexes.length <= 3) {
                  window.alert(
                    "Cannot delete vertex. N of polygon must be >= 3!"
                  );
                } else {
                  instanceRef.deleteVertexAtIndex(i);
                  render();
                  clickMyself();
                }
              });
            document
              .querySelector(`#v${id}-x`)
              .addEventListener("input", () => {
                oldX = instanceRef.vertexes[i][0];
                instanceRef.vertexes[i][0] = parseInt(
                  document.querySelector(`#v${id}-x`).value
                );

                // If we move vertex to a point where convex hull throws away the point
                if (
                  instanceRef.convexHull().length < instanceRef.vertexes.length
                ) {
                  instanceRef.vertexes[i][0] = oldX;
                  document.querySelector(`#v${id}-x`).value = oldX;
                  window.alert(
                    "Cannot move this vertex further on the X-axis as a vertex will be deleted"
                  );
                }

                render();
              });
            document
              .querySelector(`#v${id}-y`)
              .addEventListener("input", () => {
                oldY = instanceRef.vertexes[i][1];
                instanceRef.vertexes[i][1] = parseInt(
                  document.querySelector(`#v${id}-y`).value
                );

                // If we move vertex to a point where convex hull throws away the point
                if (
                  instanceRef.convexHull().length < instanceRef.vertexes.length
                ) {
                  instanceRef.vertexes[i][1] = oldY;
                  document.querySelector(`#v${id}-y`).value = oldY;
                  window.alert(
                    "Cannot move this vertex further on the Y-axis as a vertex will be deleted"
                  );
                }

                render();
              });
            document
              .querySelector(`#v${id}-r`)
              .addEventListener("input", () => {
                instanceRef.vertexColors[i][0] = parseFloat(
                  document.querySelector(`#v${id}-r`).value
                );
                render();
              });
            document
              .querySelector(`#v${id}-g`)
              .addEventListener("input", () => {
                instanceRef.vertexColors[i][1] = parseFloat(
                  document.querySelector(`#v${id}-g`).value
                );
                render();
              });
            document
              .querySelector(`#v${id}-b`)
              .addEventListener("input", () => {
                instanceRef.vertexColors[i][2] = parseFloat(
                  document.querySelector(`#v${id}-b`).value
                );
                render();
              });
            document
              .querySelector(`#v${id}-a`)
              .addEventListener("input", () => {
                instanceRef.vertexColors[i][3] = parseFloat(
                  document.querySelector(`#v${id}-a`).value
                );
                render();
              });
          });
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

      clickCount = 0;
      vertexes = [];
    }
  }

  if (currentAction === "SQUARE") {
    vertexes.push([e.clientX, e.clientY]);
    let validLength = 0;

    while (!validLength) {
      let length = prompt(
        `Enter size of square: (1-${
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

    const square = new Square([vertexes[0][0], vertexes[0][1]], validLength);
    instances.push({
      type: "SQUARE",
      ref: square,
    });

    render();
    clickCount = 0;
    vertexes = [];
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

    clickCount = 0;
    vertexes = [];
  }

  if (currentAction === "POLYGON") {
    vertexes.push([e.clientX, e.clientY]);

    if (vertexes.length >= polygonN) {
      const plgn = new Polygon(vertexes);
      instances.push({
        type: "POLYGON",
        ref: plgn,
      });

      render();

      clickCount = 0;
      vertexes = [];
    }
  }

  if (currentAction === "ADD_VERTEX") {
    const plgnRef = instances[targetPolygon].ref;
    const initVertexes = [...plgnRef.vertexes];
    plgnRef.addVertex([
      e.clientX - plgnRef.translation[0],
      e.clientY - plgnRef.translation[1],
    ]);
    render();

    // Vertex check
    if (plgnRef.vertexes.length <= initVertexes.length) {
      // Check if all previous vertexes are in the new polygon
      if (
        plgnRef.vertexes.every((elmt) => {
          return initVertexes.includes(elmt);
        })
      ) {
        // If all the old vertices are in and the new one is not
        window.alert(
          "Invalid vertex, vertex is located inside the convex hull"
        );
        return;
      }
      // else a vertex was deleted to accomodate convex hull
      window.alert(
        "A previous vertex was deleted to accomodate the new vertex"
      );
    }
    document.querySelector(`#btn-edit-model-${targetPolygon + 1}`).click();

    currentAction = "NONE";
    targetPolygon = -1;
  }
});

/* Click listener untuk fitur export model */
document.querySelector("#btn-export-models").addEventListener("click", () => {
  const link = document.createElement("a");
  const file = new Blob([JSON.stringify(instances, undefined, 2)], { type: "text/plain" });
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
            } else if (type === "SQUARE") {
              /* proses kotak */
              const square = new Square([1, 1], 1);
              square.length = ref.length;
              square.vertexes = ref.vertexes;
              square.vertexColors = ref.vertexColors;
              square.translation = ref.translation;
              square.rotation = ref.rotation;
              newInstances.push({
                type: "SQUARE",
                ref: square,
              });
            } else if (type === "RECTANGLE") {
              /* Proses rectangle */
              const rect = new Rectangle([1, 1], 1, 1);
              rect.length = ref.length;
              rect.width = ref.width;
              rect.vertexes = ref.vertexes;
              rect.vertexColors = ref.vertexColors;
              rect.translation = ref.translation;
              rect.rotation = ref.rotation;
              newInstances.push({
                type: "RECTANGLE",
                ref: rect,
              });
            } else if (type === "POLYGON") {
              /* Proses polygon */
              const plgn = new Polygon([]);
              plgn.vertexes = ref.vertexes;
              plgn.vertexColors = ref.vertexColors;
              plgn.translation = ref.translation;
              plgn.rotation = ref.rotation;
              newInstances.push({
                type: "POLYGON",
                ref: plgn,
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
