export const canvas = document.createElement("canvas");
export const context = canvas.getContext("2d") as CanvasRenderingContext2D;

canvas.style.pointerEvents = "none";
canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.zIndex = "9999";

canvas.id = "kite-cursor";

function resizeCanvas() {
  canvas.width = document.documentElement.clientWidth;
  canvas.height = document.documentElement.clientHeight;
}

if (!document.getElementById("kite-cursor")) {
  resizeCanvas();

  document.body.appendChild(canvas);

  window.addEventListener("resize", resizeCanvas);
}
