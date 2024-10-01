class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.arc(this.x, this.y, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }

  equals(point) {
    return this.x == point.x && this.y == point.y;
  }
}
