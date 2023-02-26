class Line {
  constructor(vertex1, vertex2) {
    // Main attributes
    this.vertex1 = vertex1;
    this.vertex2 = vertex2;
    this.vertex1_color = [0, 0, 0, 1];
    this.vertex2_color = [0, 0, 0, 1];
    this.translation = [0, 0];
    this.rotation = 0;
    this.dilation = 1;
    this.shear = [0.0, 0.0];
  }

  findCentroid() {
    return [
      (this.vertex1[0] + this.vertex2[0]) / 2,
      (this.vertex1[1] + this.vertex2[1]) / 2
    ];
  }

  getRotationComponents() {
    var angleInDegrees = 360 - this.rotation;
    var angleInRadians = angleInDegrees * Math.PI / 180;
    return [Math.sin(angleInRadians), Math.cos(angleInRadians)];
  }
}