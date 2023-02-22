class Polygon {
  constructor(vertexes) {
    this.vertexes = vertexes;
    this.vertexColors = vertexes.map((_) => {
      return [0, 0, 0, 1];
    });
    this.translation = [0, 0];
    this.rotation = 0;
  }

  deleteVertexAtIndex(idx) {
    let newVertexes = [];
    let newVertexColors = [];
    this.vertexes.forEach((vertex, i) => {
      if (i !== idx) {
        newVertexes.push(vertex);
      }
    });
    this.vertexColors.forEach((color, i) => {
      if (i !== idx) {
        newVertexColors.push(color);
      }
    });
    this.vertexes = newVertexes;
    this.vertexColors = newVertexColors;
  }

  findCentroid() {
    let xSum = 0;
    let ySum = 0;
    this.vertexes.forEach((vertex) => {
      xSum += vertex[0];
      ySum += vertex[1];
    });
    return [xSum / this.vertexes.length, ySum / this.vertexes.length];
  }

  getFlattenedVertexes() {
    /*
      Poligon digambar dengan gl.TRIANGLES_FAN
    */
    let flattenedVertexes = [];
    this.vertexes.forEach((vertex) => {
      flattenedVertexes.push(vertex[0]);
      flattenedVertexes.push(vertex[1]);
    });
    return flattenedVertexes;
  }

  getFlattenedColors() {
    /*
      Poligon digambar dengan gl.TRIANGLES_FAN
    */
    let flattenedColors = [];
    this.vertexColors.forEach((color) => {
      flattenedColors.push(color[0]);
      flattenedColors.push(color[1]);
      flattenedColors.push(color[2]);
      flattenedColors.push(color[3]);
    });
    return flattenedColors;
  }

  getRotationComponents() {
    var angleInDegrees = 360 - this.rotation;
    var angleInRadians = (angleInDegrees * Math.PI) / 180;
    return [Math.sin(angleInRadians), Math.cos(angleInRadians)];
  }
}
