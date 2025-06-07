import { Point } from './Point'
import { Size } from './Size'

export class Bounds {
  constructor(
    public readonly position: Point,
    public readonly size: Size
  ) {}

  contains(point: Point): boolean {
    const minX = this.position.x
    const minY = this.position.y
    const maxX = this.position.x + this.size.width
    const maxY = this.position.y + this.size.height

    return (
      point.x >= minX && point.x <= maxX && point.y >= minY && point.y <= maxY
    )
  }

  topLeft(): Point {
    return this.position
  }

  topRight(): Point {
    return new Point(this.position.x + this.size.width, this.position.y)
  }

  bottomLeft(): Point {
    return new Point(this.position.x, this.position.y + this.size.height)
  }

  bottomRight(): Point {
    return new Point(
      this.position.x + this.size.width,
      this.position.y + this.size.height
    )
  }

  intersects(other: Bounds): boolean {
    const thisLeft = this.position.x
    const thisRight = this.position.x + this.size.width
    const thisTop = this.position.y
    const thisBottom = this.position.y + this.size.height

    const otherLeft = other.position.x
    const otherRight = other.position.x + other.size.width
    const otherTop = other.position.y
    const otherBottom = other.position.y + other.size.height

    return !(
      thisRight <= otherLeft ||
      thisLeft >= otherRight ||
      thisBottom <= otherTop ||
      thisTop >= otherBottom
    )
  }

  translate(offset: Point): Bounds {
    return new Bounds(this.position.add(offset), this.size)
  }

  expand(amount: number): Bounds {
    return new Bounds(
      new Point(this.position.x - amount, this.position.y - amount),
      new Size(this.size.width + 2 * amount, this.size.height + 2 * amount)
    )
  }
}
