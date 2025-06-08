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

  zoomTo(
    factor: number,
    point: Point = new Point(this.viewport.width / 2, this.viewport.height / 2)
  ): void {
    // Calculate the scale change
    const scaleChange = factor / this.zoom

    // Calculate new position to keep the zoom point stationary
    const newX = point.x - (point.x - this.viewport.position.x) * scaleChange
    const newY = point.y - (point.y - this.viewport.position.y) * scaleChange

    this.viewport = new Viewport(
      new Point(newX, newY),
      this.viewport.width,
      this.viewport.height
    )
    this.zoom = factor
  }

  reset(): void {
    this.zoom = 1
    this.viewport = new Viewport(new Point(0, 0), 800, 600)
  }
}
