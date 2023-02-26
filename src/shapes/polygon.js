class Polygon {
  constructor(vertexes) {
    this.vertexes = vertexes;
    this.vertexColors = vertexes.map((_) => {
      return [0, 0, 0, 1];
    });
    this.toConvexHull()
    this.translation = [0, 0];
    this.rotation = 0;
    this.dilation = 1;
    this.shear = [0.0, 0.0];
  }

  getPolygonData() {
    let polygonData = [];
    this.vertexes.forEach((_, i) => {
      polygonData.push({
        vertex: this.vertexes[i],
        color: this.vertexColors[i],
      });
    })
    return polygonData;
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

  addVertex(vertex) {
    this.vertexes.push(vertex);
    this.vertexColors.push([0, 0, 0, 1]);
    this.toConvexHull();
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

  toConvexHull() {
    let newVertexes = []
    let newVertexColors = []
    this.convexHull().forEach(data => {
      newVertexes.push(data.vertex);
      newVertexColors.push(data.color);
    })
    this.vertexes = newVertexes;
    this.vertexColors = newVertexColors;
  }

  convexHull() {
    var points = this.getPolygonData();
    points.sort(function (a, b) {
      return a.vertex[0] != b.vertex[0]
        ? a.vertex[0] - b.vertex[0]
        : a.vertex[1] - b.vertex[1];
    });

    var n = points.length;
    var hull = [];

    for (var i = 0; i < 2 * n; i++) {
      var j = i < n ? i : 2 * n - 1 - i;
      while (
        hull.length >= 2 &&
        this.removeMiddle(
          hull[hull.length - 2],
          hull[hull.length - 1],
          points[j]
        )
      )
        hull.pop();
      hull.push(points[j]);
    }

    hull.pop();
    return hull;
  }

  removeMiddle(a, b, c) {
    var cross =
      (a.vertex[0] - b.vertex[0]) * (c.vertex[1] - b.vertex[1]) -
      (a.vertex[1] - b.vertex[1]) * (c.vertex[0] - b.vertex[0]);
    var dot =
      (a.vertex[0] - b.vertex[0]) * (c.vertex[0] - b.vertex[0]) +
      (a.vertex[1] - b.vertex[1]) * (c.vertex[1] - b.vertex[1]);
    return cross < 0 || (cross == 0 && dot <= 0);
  }
}
