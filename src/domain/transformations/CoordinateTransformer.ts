import { Point } from '../canvas/Point'
import { Canvas } from '../canvas/Canvas'

export class CoordinateTransformer {
  constructor(private canvas: Canvas) {}

  screenToCanvas(screenPoint: Point): Point {
    const panOffset = this.canvas.viewport.position
    const zoom = this.canvas.zoom
    return new Point(
      (screenPoint.x - panOffset.x) / zoom,
      (screenPoint.y - panOffset.y) / zoom
    )
  }

  canvasToScreen(canvasPoint: Point): Point {
    const panOffset = this.canvas.viewport.position
    const zoom = this.canvas.zoom
    return new Point(
      canvasPoint.x * zoom + panOffset.x,
      canvasPoint.y * zoom + panOffset.y
    )
  }
}
