import { canvas, context } from "./canvas";
import { Rope } from "./Rope";

interface Colors {
  yellow: string;
  red: string;
  blue: string;
  green: string;
  gray: string;
}

const defaultColors = {
  yellow: "hsl(59, 89%, 57%)",
  red: "hsl(12, 87%, 53%)",
  blue: "hsl(209, 85%, 59%)",
  green: "hsl(97, 60%, 47%)",
  gray: "hsl(0,0%,50%)",
};

export class KiteCursor {
  private _rope: Rope;
  private _colors: Colors;
  private _timing: {
    currentTime: number;
    lastTime: number;
    deltaTime: number;
    interval: number;
  };

  constructor(colors: Colors = defaultColors) {
    this._colors = colors;
    this._rope = new Rope(200, 8, 0.88, 0.8);
    this._timing = {
      deltaTime: 0,
      currentTime: 0,
      lastTime: new Date().getTime(),
      interval: 1000 / 60, // 60 is frame rate
    };

    window.addEventListener("mousemove", (e) => {
      this._rope.points[0].pos = {
        x: e.pageX + window.scrollX,
        y: e.pageY - window.scrollY + 20,
      };
    });

    this.animationFrame();
  }

  hide() {
    canvas.style.visibility = "hidden";
  }

  show() {
    canvas.style.visibility = "";
  }

  draw() {
    let ribbonCount = 0;

    for (let i = 0; i < this._rope.points.length; i++) {
      let p = this._rope.points[i];

      const prev = i !== 0 ? this._rope.points[i - 1] : null;

      if (prev && i !== this._rope.points.length - 1 && i > 8) {
        context.globalCompositeOperation = "destination-over";
        context.beginPath();
        context.moveTo(prev.pos.x, prev.pos.y);
        context.lineTo(p.pos.x, p.pos.y);
        context.lineWidth = 1;
        context.strokeStyle = this._colors.gray;
        context.stroke();
        context.globalCompositeOperation = "source-over";

        if (i > 4 && (i + 2) % 3 === 0 && ribbonCount < 4) {
          let pMid = this._rope.points[i + 1];
          let pEnd = this._rope.points[i + 2];
          context.fillStyle = Object.values(this._colors)[ribbonCount];
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
        let pEnd = this._rope.points[i + 9];
        let pMid = this._rope.points[i + 3];

        context.fillStyle = this._colors.yellow;
        context.beginPath();
        context.moveTo(p.pos.x, p.pos.y);
        context.lineTo(pMid.pos.x - 20, pMid.pos.y);
        context.lineTo(pMid.pos.x, pMid.pos.y);
        context.fill();

        context.fillStyle = this._colors.red;
        context.beginPath();
        context.moveTo(pMid.pos.x - 20, pMid.pos.y);
        context.lineTo(pEnd.pos.x, pEnd.pos.y);
        context.lineTo(pMid.pos.x, pMid.pos.y);
        context.fill();

        context.fillStyle = this._colors.blue;
        context.beginPath();
        context.moveTo(pEnd.pos.x, pEnd.pos.y);
        context.lineTo(pMid.pos.x + 20, pMid.pos.y);
        context.lineTo(pMid.pos.x, pMid.pos.y);
        context.fill();

        context.fillStyle = this._colors.green;
        context.beginPath();
        context.moveTo(pMid.pos.x + 20, pMid.pos.y);
        context.lineTo(p.pos.x, p.pos.y);
        context.lineTo(pMid.pos.x, pMid.pos.y);
        context.fill();
      }
    }
  }

  animationFrame() {
    window.requestAnimationFrame(() => this.animationFrame());

    this._timing.currentTime = new Date().getTime();
    this._timing.deltaTime = this._timing.currentTime - this._timing.lastTime;

    if (this._timing.deltaTime > this._timing.interval) {
      // delta time in seconds
      const dts = this._timing.deltaTime * 0.001;
      this._rope.update({ x: 0, y: 3000 }, dts);

      context.clearRect(0, 0, canvas.width, canvas.height);
      this.draw();

      this._timing.lastTime =
        this._timing.currentTime -
        (this._timing.deltaTime % this._timing.interval);
    }
  }
}
