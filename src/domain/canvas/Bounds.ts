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
}
