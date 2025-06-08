import { Point } from './Point'

export class Viewport {
  constructor(
    public readonly position: Point,
    public readonly width: number,
    public readonly height: number
  ) {}
}
