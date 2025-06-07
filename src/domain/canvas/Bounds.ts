import { Point } from './Point'
import { Size } from './Size'

export class Bounds {
  constructor(
    public readonly position: Point,
    public readonly size: Size
  ) {}
}
