class Graph {
  constructor(points = [], segments = []) {
    this.points = points;
    this.segments = segments;
  }

  draw(ctx) {
    for (const segment of this.segments) {
      segment.draw(ctx);
    }

    for (const point of this.points) {
      point.draw(ctx);
    }
  }

  addPoint(point) {
    this.points.push(point);
  }

  addSegment(segment) {
    this.segments.push(segment);
  }

  tryAddSegment(segment) {
    const index = this.segments.findIndex(
      (s) =>
        (s.p1.equals(segment.p1) && s.p2.equals(segment.p2)) ||
        (s.p2.equals(segment.p1) && s.p1.equals(segment.p2))
    );

    if (index > -1) {
      return false;
    }

    this.addSegment(segment);
    return true;
  }

  tryAddPoint(point) {
    const index = this.points.findIndex((p) => p.equals(point));

    if (index > -1) {
      return false;
    }

    this.addPoint(point);
    return true;
  }

  reset() {
    this.points.length = 0;
    this.segments.length = 0;
  }
}
