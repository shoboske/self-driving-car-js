class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw(
    ctx,
    { size = 18, color = "black", outline = false, fill = false, transparency = 0.5 } = {}
  ) {
    const rad = size / 2;
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.globalAlpha = transparency;
    ctx.arc(this.x, this.y, rad, 0, Math.PI * 2);
    ctx.fill();

    if (outline) {
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "yellow";
      ctx.arc(this.x, this.y, rad * 0.6, 0, Math.PI * 2);
      ctx.stroke();
    }

    if (fill) {
      ctx.beginPath();
      ctx.fillStyle = "yellow";
      ctx.arc(this.x, this.y, rad * 0.4, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  equals(point) {
    return this.x == point.x && this.y == point.y;
  }
}
