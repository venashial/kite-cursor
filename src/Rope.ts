import { Vector2 } from "./Vector2";
import { canvas } from "./canvas";
import type { Pos } from "./types";

//manages a collection of rope points and executes
//the integration
export class Rope {
  points: RopePoint[];
  private _prevDelta: number;
  private readonly _solverIterations: number;

  constructor(
    length: number,
    resolution: number,
    mass: number,
    damping: number,
    solverIterations = 500
  ) {
    this.update = this.update.bind(this);
    this._prevDelta = 0;
    this._solverIterations = solverIterations;

    // Generate points
    let points = [];
    const pointsLen = length / resolution;

    for (let i = 0; i < pointsLen; i++) {
      points[i] = new RopePoint({ x: -20, y: canvas.height / 2 }, resolution);
      points[i].mass = mass;
      points[i].damping = damping;
    }

    // Link nodes into a doubly linked list
    for (let i = 0; i < pointsLen; i++) {
      const prev = i != 0 ? points[i - 1] : null;
      const curr = points[i];
      const next = i != pointsLen - 1 ? points[i + 1] : null;

      curr.prev = prev;
      curr.next = next;
    }

    points[0].isFixed = true;

    this.points = points;
  }

  update(gravity: Pos, dts: number) {
    for (let i = 1; i < this.points.length - 1; i++) {
      let point = this.points[i];

      let accel = { ...gravity };

      RopePoint.integrate(point, accel, dts, this._prevDelta);
    }

    for (let iteration = 0; iteration < this._solverIterations; iteration++)
      for (let i = 1; i < this.points.length - 1; i++) {
        let point = this.points[i];
        RopePoint.constrain(point);
      }

    this._prevDelta = dts;
  }
}

// Each rope part is one of these
// Uses a high precison varient of Störmer–Verlet integration to keep the simulation consistant otherwise it would "explode"!
class RopePoint {
  pos: Pos;
  isFixed: boolean;
  mass: number;
  damping: number;
  prev: RopePoint | null;
  next: RopePoint | null;
  distanceToNextPoint: number;
  oldPos: Pos;
  velocity: Pos;

  // integrates motion equations per node without taking into account relationship with other nodes...
  static integrate(
    point: RopePoint,
    gravity: Pos,
    dt: number,
    previousFrameDt: number
  ) {
    point.velocity = Vector2.sub(point.pos, point.oldPos);
    point.oldPos = { ...point.pos };

    //drastically improves stability
    let timeCorrection = previousFrameDt != 0.0 ? dt / previousFrameDt : 0.0;

    let accel = Vector2.add(gravity, { x: 0, y: point.mass });

    const velCoef = timeCorrection * point.damping;
    const accelCoef = Math.pow(dt, 2);

    point.pos.x += point.velocity.x * velCoef + accel.x * accelCoef;
    point.pos.y += point.velocity.y * velCoef + accel.y * accelCoef;
  }

  //apply constraints related to other nodes next to it
  //(keeps each node within distance)
  static constrain(point: RopePoint) {
    if (point.next) {
      const delta = Vector2.sub(point.next.pos, point.pos);
      const len = Vector2.mag(delta);
      const diff = len - point.distanceToNextPoint;
      const normal = Vector2.normalized(delta);

      if (!point.isFixed) {
        point.pos.x += normal.x * diff * 0.25;
        point.pos.y += normal.y * diff * 0.25;
      }

      if (!point.next.isFixed) {
        point.next.pos.x -= normal.x * diff * 0.25;
        point.next.pos.y -= normal.y * diff * 0.25;
      }
    }
    if (point.prev) {
      const delta = Vector2.sub(point.prev.pos, point.pos);
      const len = Vector2.mag(delta);
      const diff = len - point.distanceToNextPoint;
      const normal = Vector2.normalized(delta);

      if (!point.isFixed) {
        point.pos.x += normal.x * diff * 0.25;
        point.pos.y += normal.y * diff * 0.25;
      }

      if (!point.prev.isFixed) {
        point.prev.pos.x -= normal.x * diff * 0.25;
        point.prev.pos.y -= normal.y * diff * 0.25;
      }
    }
  }

  constructor(initialPos: Pos, distanceToNextPoint: number) {
    this.pos = initialPos;
    this.distanceToNextPoint = distanceToNextPoint;
    this.isFixed = false;
    this.oldPos = { ...initialPos };
    this.velocity = Vector2.zero();
    this.mass = 1.0;
    this.damping = 1.0;
    this.prev = null;
    this.next = null;
  }
}
