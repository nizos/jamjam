export class Point {
  constructor(
    public readonly x: number,
    public readonly y: number
  ) {}

  equals(other: Point): boolean {
    return this.x === other.x && this.y === other.y
  }

  add(other: Point): Point {
    return new Point(this.x + other.x, this.y + other.y)
  }
}
