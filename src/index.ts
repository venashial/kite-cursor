import { canvas, context } from "./canvas";
import { Rope } from "./Rope";

const colors = {
  yellow: "hsl(59, 89%, 57%)",
  red: "hsl(12, 87%, 53%)",
  blue: "hsl(209, 85%, 59%)",
  green: "hsl(97, 60%, 47%)",
};

const rope = new Rope(200, 8, 0.88, 0.8);

function draw() {
  let ribbonCount = 0;

  for (let i = 0; i < rope.points.length; i++) {
    let p = rope.points[i];

    const prev = i !== 0 ? rope.points[i - 1] : null;

    if (prev && i !== rope.points.length - 1 && i > 8) {
      context.globalCompositeOperation = "destination-over";
      context.beginPath();
      context.moveTo(prev.pos.x, prev.pos.y);
      context.lineTo(p.pos.x, p.pos.y);
      context.lineWidth = 1;
      context.strokeStyle = "hsl(0,0%,50%)";
      context.stroke();
      context.globalCompositeOperation = "source-over";

      if (i > 4 && (i + 2) % 3 === 0 && ribbonCount < 4) {
        let pMid = rope.points[i + 1];
        let pEnd = rope.points[i + 2];
        context.fillStyle = Object.values(colors)[ribbonCount];
        context.beginPath();
        context.moveTo(pMid.pos.x, pMid.pos.y);
        context.lineTo(p.pos.x - 8, p.pos.y + 4);
        context.lineTo(pEnd.pos.x - 8, pEnd.pos.y - 4);
        context.lineTo(pMid.pos.x, pMid.pos.y);
        context.lineTo(p.pos.x + 8, p.pos.y + 4);
        context.lineTo(pEnd.pos.x + 8, pEnd.pos.y - 4);
        context.lineTo(pMid.pos.x, pMid.pos.y);
        context.fill();

        ribbonCount++;
      }
    }

    if (i === 0) {
      let pEnd = rope.points[i + 9];
      let pMid = rope.points[i + 3];

      context.fillStyle = colors.yellow;
      context.beginPath();
      context.moveTo(p.pos.x, p.pos.y);
      context.lineTo(pMid.pos.x - 20, pMid.pos.y);
      context.lineTo(pMid.pos.x, pMid.pos.y);
      context.fill();

      context.fillStyle = colors.red;
      context.beginPath();
      context.moveTo(pMid.pos.x - 20, pMid.pos.y);
      context.lineTo(pEnd.pos.x, pEnd.pos.y);
      context.lineTo(pMid.pos.x, pMid.pos.y);
      context.fill();

      context.fillStyle = colors.blue;
      context.beginPath();
      context.moveTo(pEnd.pos.x, pEnd.pos.y);
      context.lineTo(pMid.pos.x + 20, pMid.pos.y);
      context.lineTo(pMid.pos.x, pMid.pos.y);
      context.fill();

      context.fillStyle = colors.green;
      context.beginPath();
      context.moveTo(pMid.pos.x + 20, pMid.pos.y);
      context.lineTo(p.pos.x, p.pos.y);
      context.lineTo(pMid.pos.x, pMid.pos.y);
      context.fill();
    }
  }
}

const timing = {
  deltaTime: 0,
  currentTime: 0,
  lastTime: new Date().getTime(),
  interval: 1000 / 60, // 60 is frame rate
};

function animationFrame() {
  window.requestAnimationFrame(animationFrame);

  timing.currentTime = new Date().getTime();
  timing.deltaTime = timing.currentTime - timing.lastTime;

  if (timing.deltaTime > timing.interval) {
    // delta time in seconds
    const dts = timing.deltaTime * 0.001;
    rope.update({ x: 0, y: 3000 }, dts);

    context.clearRect(0, 0, canvas.width, canvas.height);
    draw();

    timing.lastTime = timing.currentTime - (timing.deltaTime % timing.interval);
  }
}

window.addEventListener("mousemove", (e) => {
  rope.points[0].pos = {
    x: e.pageX + window.scrollX,
    y: e.pageY - window.scrollY + 20,
  };
});

animationFrame();
