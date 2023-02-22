class Polygon {
  constructor(vertexes) {
    this.vertexes = this.vertexes;
    this.vertexColors = vertexes.map((_) => {
      [[0, 0, 0, 1]];
    });
    this.translation = [0, 0];
    this.rotation = 0;
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
    console.log([Math.sin(angleInRadians), Math.cos(angleInRadians)]);
    return [Math.sin(angleInRadians), Math.cos(angleInRadians)];
  }
}
