class Rectangle {
  constructor(ref_vertex, length, width) {
    /*
      Berikut merupakan representasi 4 vertex pembentuk rectangle:
      0   1
      3   2
    */
    this.length = length;
    this.width = width;
    
    this.vertexes = this.generateVertexes(ref_vertex);
    this.vertexColors = [
      [0, 0, 0, 1],
      [0, 0, 0, 1],
      [0, 0, 0, 1],
      [0, 0, 0, 1]
    ];
    this.translation = [0, 0];
    this.rotation = 0;
  }

  findCentroid() {
    return [
      (this.vertexes[0][0] + this.vertexes[1][0] + this.vertexes[2][0] + this.vertexes[3][0]) / 4,
      (this.vertexes[0][1] + this.vertexes[1][1] + this.vertexes[2][1] + this.vertexes[3][1]) / 4
    ]
  }

  generateVertexes(ref_vertex) {
    return [
      [ref_vertex[0], ref_vertex[1]], // Titik 0
      [ref_vertex[0] + this.length, ref_vertex[1]], // Titik 1
      [ref_vertex[0] + this.length, ref_vertex[1] + this.width], // Titik 2
      [ref_vertex[0], ref_vertex[1] + this.width] // Titik 3
    ]
  }

  getFlattenedVertexes() {
    /*
      Suatu persegi panjang dibentuk oleh dua segitiga:
      Segitiga 0 3 2 dan segitiga 0 2 1.
    */
    return [
      /* Segitiga pertama */
      this.vertexes[0][0], this.vertexes[0][1],
      this.vertexes[3][0], this.vertexes[3][1],
      this.vertexes[2][0], this.vertexes[2][1],
      /* Segitiga kedua */
      this.vertexes[0][0], this.vertexes[0][1],
      this.vertexes[2][0], this.vertexes[2][1],
      this.vertexes[1][0], this.vertexes[1][1]
    ];
  }

  getFlattenedColors() {
    /*
      Suatu persegi panjang dibentuk oleh dua segitiga:
      Segitiga 0 3 2 dan segitiga 0 2 1.
    */
    return [
      /* Segitiga pertama */
      this.vertexColors[0][0], this.vertexColors[0][1], this.vertexColors[0][2], this.vertexColors[0][3],
      this.vertexColors[3][0], this.vertexColors[3][1], this.vertexColors[3][2], this.vertexColors[3][3],
      this.vertexColors[2][0], this.vertexColors[2][1], this.vertexColors[2][2], this.vertexColors[2][3],
      /* Segitiga kedua */
      this.vertexColors[0][0], this.vertexColors[0][1], this.vertexColors[0][2], this.vertexColors[0][3],
      this.vertexColors[2][0], this.vertexColors[2][1], this.vertexColors[2][2], this.vertexColors[2][3],
      this.vertexColors[1][0], this.vertexColors[1][1], this.vertexColors[1][2], this.vertexColors[1][3]
    ];
  }

  getRotationComponents() {
    var angleInDegrees = 360 - this.rotation;
    var angleInRadians = angleInDegrees * Math.PI / 180;
    return [Math.sin(angleInRadians), Math.cos(angleInRadians)];
  }
}