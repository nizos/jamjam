import { Viewport } from './Viewport'
import { Point } from './Point'

export class Canvas {
  zoom = 1
  viewport = new Viewport(new Point(0, 0), 800, 600)

  pan(delta: Point): void {
    this.viewport = new Viewport(
      this.viewport.position.add(delta),
      this.viewport.width,
      this.viewport.height
    )
  }

  zoomTo(factor: number): void {
    // TODO: Implement zoom around center point
    this.zoom = factor
  }

  reset(): void {
    this.zoom = 1
    this.viewport = new Viewport(new Point(0, 0), 800, 600)
  }
}
