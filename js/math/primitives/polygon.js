class Polygon {
  constructor(points) {
    this.points = points;
    this.segments = [];

    for (let index = 1; index < points.length; index++) {
      this.segments.push(
        new Segment(points[index - 1], points[index % points.length])
      );
    }
  }

  static break(poly1, poly2) {
    const segs1 = poly1.segments;
    const segs2 = poly2.segments;

    const intersections = [];

    for (let i = 0; i < segs1.length; i++) {
      for (let j = 0; j < segs2.length; j++) {
        const intersection = getIntersection(
          segs1[i].p1,
          segs1[i].p2,
          segs2[j].p1,
          segs2[j].p2
        );

        if (
          intersection &&
          intersection.offset != 1 &&
          intersection.offset != 0
        ) {
          const point = new Point(intersection.x, intersection.y);
          intersections.push(point);
        }
      }
    }

    return intersections;
  }

  draw(
    context,
    { stroke = "blue", lineWidth = 2, fill = "rgba(0, 0, 255, 0.3)" } = {}
  ) {
    if (!this.points.length) return;

    context.beginPath();
    context.fillStyle = fill;
    context.strokeStyle = stroke;
    context.lineWidth = lineWidth;

    context.moveTo(this.points[0].x, this.points[0].y);

    for (let index = 1; index < this.points.length; index++) {
      const point = this.points[index];
      context.lineTo(point.x, point.y);
    }

    context.closePath();
    context.fill();
    context.stroke();
  }
}
