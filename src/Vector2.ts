import type { Pos } from "./types";

export class Vector2 {
  static zero() {
    return { x: 0, y: 0 };
  }

  static sub(a: Pos, b: Pos) {
    return { x: a.x - b.x, y: a.y - b.y };
  }

  static add(a: Pos, b: Pos) {
    return { x: a.x + b.x, y: a.y + b.y };
  }

  static mag(v: Pos) {
    return Math.sqrt(v.x * v.x + v.y * v.y);
  }

  static normalized(v: Pos) {
    const mag = Vector2.mag(v);

    if (mag === 0) {
      return Vector2.zero();
    }
    return { x: v.x / mag, y: v.y / mag };
  }
}
