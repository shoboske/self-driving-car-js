class Segment {
  constructor(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
  }

  equals(segment) {
    return this.includes(segment.p1) && this.includes(segment.p2);
  }

  includes(point) {
    return this.p1.equals(point) || this.p2.equals(point);
  }

  length() {
    return distance(this.p1, this.p2);
  }

  directionVector(){
    return normalize(subtract(this.p1, this.p2))
  }

  draw(
    ctx,
    { width = 2, color = "black", dash = [], transparency = 0.5 } = {}
  ) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.globalAlpha = transparency;
    ctx.setLineDash(dash);
    ctx.moveTo(this.p1.x, this.p1.y);
    ctx.lineTo(this.p2.x, this.p2.y);
    ctx.stroke();
    ctx.setLineDash([]);
  }
}
