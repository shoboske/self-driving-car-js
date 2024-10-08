
const A = { x: 200, y: 150 };
const B = { x: 150, y: 250 };
const C = { x: 50, y: 100 };
const D = { x: 250, y: 200 };

const ctx = myCanvas.getContext("2d");

let angle = 0;
const mouse = { x: 0, y: 0 };
document.onmousemove = (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
};

animate();

function animate() {
  const radius = 50;

  A.x = mouse.x + Math.cos(angle) * radius;
  A.y = mouse.y - Math.sin(angle) * radius;
  B.x = mouse.x - Math.cos(angle) * radius;
  B.y = mouse.y + Math.sin(angle) * radius;

  const I = getIntersection(A, B, C, D);

  angle += 0.02;
  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
  ctx.beginPath();
  ctx.moveTo(A.x, A.y);
  ctx.fillStyle = "white";
  ctx.lineTo(B.x, B.y);
  ctx.moveTo(C.x, C.y);
  ctx.lineTo(D.x, D.y);
  ctx.stroke();

  drawCircle("A", A);
  drawCircle("B", B);
  drawCircle("C", C);
  drawCircle("D", D);

  if (I) {
    drawCircle("I", I);
  }

  requestAnimationFrame(animate);
}

function drawCircle(label, point, isRed) {
  ctx.beginPath();
  ctx.fillStyle = isRed ? "red" : "white";
  ctx.arc(point.x, point.y, 10, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "bold 12px Arial";
  ctx.fillText(label, point.x, point.y);
}