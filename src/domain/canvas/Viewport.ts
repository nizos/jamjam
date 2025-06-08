import { Point } from './Point'
import { Bounds } from './Bounds'
import { Size } from './Size'

export class Viewport {
  constructor(
    public readonly position: Point,
    public readonly width: number,
    public readonly height: number
  ) {}

  getVisibleBounds(): Bounds {
    return new Bounds(this.position, new Size(this.width, this.height))
  }

  containsPoint(point: Point): boolean {
    return this.getVisibleBounds().contains(point)
  }
}
