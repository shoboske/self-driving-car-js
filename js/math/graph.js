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

  //#region Points
  addPoint(point) {
    this.points.push(point);
  }

  removePoint(point) {
    const segs = this.getSegmentsWithPoint(point);

    for (const segment of segs) {
      this.removeSegment(segment);
    }

    this.points.splice(this.points.indexOf(point), 1);
  }

  tryAddPoint(point) {
    const index = this.points.findIndex((p) => p.equals(point));

    if (index > -1) {
      return false;
    }

    this.addPoint(point);
    return true;
  }

  //#endregion

  //#region Segments
  addSegment(segment) {
    this.segments.push(segment);
  }

  removeSegment(segment) {
    this.segments.splice(this.segments.indexOf(segment), 1);
  }

  getSegmentsWithPoint(point) {
    return this.segments.filter((s) => s.includes(point));
  }

  tryAddSegment(segment) {
    const index = this.segments.findIndex((s) => s.equals(segment));

    if (index > -1 || segment.p1.equals(segment.p2)) {
      return false;
    }

    this.addSegment(segment);
    return true;
  }
  //#endregion

  reset() {
    this.points.length = 0;
    this.segments.length = 0;
  }
}
