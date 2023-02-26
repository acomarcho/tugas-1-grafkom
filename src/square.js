class Square {
  constructor(ref_vertex, size) {
    /*
      Berikut merupakan representasi 4 vertex pembentuk kotak:
      0   1
      3   2
    */
    this.size = size;
    this.vertexes = this.generateVertexes(ref_vertex);
    this.vertexColors = [
      [0, 0, 0, 1],
      [0, 0, 0, 1],
      [0, 0, 0, 1],
      [0, 0, 0, 1],
    ];
    this.translation = [0, 0];
    this.rotation = 0;
  }

  updateVertexes(ref = null) {
    this.vertexes = this.generateVertexes(this.vertexes[ref? ref : 0], ref);
  }

  updateSize() {
    this.size = Math.abs(this.vertexes[0][0] - this.vertexes[1][0]);
  }

  findCentroid() {
    return [
      (this.vertexes[0][0] +
        this.vertexes[1][0] +
        this.vertexes[2][0] +
        this.vertexes[3][0]) /
        4,
      (this.vertexes[0][1] +
        this.vertexes[1][1] +
        this.vertexes[2][1] +
        this.vertexes[3][1]) /
        4,
    ];
  }

  generateVertexes(ref_vertex, ref = null) {
    switch (ref) {
      case 1:
        // Use first vertex as reference
        return [
          [ref_vertex[0] - this.size, ref_vertex[1]], // Titik 0
          [ref_vertex[0], ref_vertex[1]], // Titik 1 -> Reference point
          [ref_vertex[0], ref_vertex[1] + this.size], // Titik 2
          [ref_vertex[0] - this.size, ref_vertex[1] + this.size], // Titik 3
        ];
      case 2:
        // Use second vertex as reference
        return [
          [ref_vertex[0] - this.size, ref_vertex[1] - this.size], // Titik 0
          [ref_vertex[0], ref_vertex[1] - this.size], // Titik 1
          [ref_vertex[0], ref_vertex[1]], // Titik 2 -> Reference Point
          [ref_vertex[0] - this.size, ref_vertex[1]], // Titik 3
        ];
      case 3:
        // Use third vertex as reference
        return [
          [ref_vertex[0], ref_vertex[1] - this.size], // Titik 0
          [ref_vertex[0] + this.size, ref_vertex[1] - this.size], // Titik 1
          [ref_vertex[0] + this.size, ref_vertex[1]], // Titik 2
          [ref_vertex[0], ref_vertex[1]], // Titik 3
        ];
      default:
        // Default method for resizing length (when ref is not given or using 0th vertex)
        return [
          [ref_vertex[0], ref_vertex[1]], // Titik 0
          [ref_vertex[0] + this.size, ref_vertex[1]], // Titik 1
          [ref_vertex[0] + this.size, ref_vertex[1] + this.size], // Titik 2
          [ref_vertex[0], ref_vertex[1] + this.size], // Titik 3
        ];
    }
  }

  getFlattenedVertexes() {
    /*
      Suatu persegi dibentuk oleh dua segitiga:
      Segitiga 0 3 2 dan segitiga 0 2 1.
    */
    return [
      /* Segitiga pertama */
      this.vertexes[0][0],
      this.vertexes[0][1],
      this.vertexes[3][0],
      this.vertexes[3][1],
      this.vertexes[2][0],
      this.vertexes[2][1],
      /* Segitiga kedua */
      this.vertexes[0][0],
      this.vertexes[0][1],
      this.vertexes[2][0],
      this.vertexes[2][1],
      this.vertexes[1][0],
      this.vertexes[1][1],
    ];
  }

  getFlattenedColors() {
    /*
      Suatu persegi dibentuk oleh dua segitiga:
      Segitiga 0 3 2 dan segitiga 0 2 1.
    */
    return [
      /* Segitiga pertama */
      this.vertexColors[0][0],
      this.vertexColors[0][1],
      this.vertexColors[0][2],
      this.vertexColors[0][3],
      this.vertexColors[3][0],
      this.vertexColors[3][1],
      this.vertexColors[3][2],
      this.vertexColors[3][3],
      this.vertexColors[2][0],
      this.vertexColors[2][1],
      this.vertexColors[2][2],
      this.vertexColors[2][3],
      /* Segitiga kedua */
      this.vertexColors[0][0],
      this.vertexColors[0][1],
      this.vertexColors[0][2],
      this.vertexColors[0][3],
      this.vertexColors[2][0],
      this.vertexColors[2][1],
      this.vertexColors[2][2],
      this.vertexColors[2][3],
      this.vertexColors[1][0],
      this.vertexColors[1][1],
      this.vertexColors[1][2],
      this.vertexColors[1][3],
    ];
  }

  getRotationComponents() {
    var angleInDegrees = 360 - this.rotation;
    var angleInRadians = (angleInDegrees * Math.PI) / 180;
    return [Math.sin(angleInRadians), Math.cos(angleInRadians)];
  }
}
