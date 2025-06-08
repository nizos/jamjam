import { describe, it, expect, beforeEach } from 'vitest'
import { CoordinateTransformer } from './CoordinateTransformer'
import { Point } from '../canvas/Point'
import { Canvas } from '../canvas/Canvas'

describe('CoordinateTransformer', () => {
  let canvas: Canvas
  let transformer: CoordinateTransformer

  beforeEach(() => {
    canvas = new Canvas()
    transformer = new CoordinateTransformer(canvas)
  })

  describe('screenToCanvas', () => {
    const screenPoint = new Point(200, 150)

    it('should transform screen x-coordinate to canvas x-coordinate', () => {
      const result = transformer.screenToCanvas(screenPoint)

      expect(result.x).toBe(200)
    })

    it('should transform screen y-coordinate to canvas y-coordinate', () => {
      const result = transformer.screenToCanvas(screenPoint)

      expect(result.y).toBe(150)
    })

    it('should account for canvas pan offset when transforming x-coordinate', () => {
      canvas.pan(new Point(50, 0))

      const result = transformer.screenToCanvas(screenPoint)

      expect(result.x).toBe(150) // 200 - 50
    })

    it('should account for canvas pan offset when transforming y-coordinate', () => {
      canvas.pan(new Point(0, 30))

      const result = transformer.screenToCanvas(screenPoint)

      expect(result.y).toBe(120) // 150 - 30
    })

    it('should account for zoom when transforming x-coordinate', () => {
      canvas.zoomTo(2)

      const result = transformer.screenToCanvas(screenPoint)

      expect(result.x).toBe(100) // 200 / 2
    })
  })

  describe('canvasToScreen', () => {
    const canvasPoint = new Point(200, 150)

    it('should transform canvas x-coordinate to screen x-coordinate', () => {
      const result = transformer.canvasToScreen(canvasPoint)

      expect(result.x).toBe(200)
    })

    it('should transform canvas y-coordinate to screen y-coordinate', () => {
      const result = transformer.canvasToScreen(canvasPoint)

      expect(result.y).toBe(150)
    })

    it('should account for canvas pan offset when transforming x-coordinate', () => {
      canvas.pan(new Point(50, 0))

      const result = transformer.canvasToScreen(canvasPoint)

      expect(result.x).toBe(250) // 200 + 50
    })

    it('should account for canvas pan offset when transforming y-coordinate', () => {
      canvas.pan(new Point(0, 30))

      const result = transformer.canvasToScreen(canvasPoint)

      expect(result.y).toBe(180) // 150 + 30
    })

    it('should account for zoom when transforming x-coordinate', () => {
      canvas.zoomTo(2)

      const result = transformer.canvasToScreen(canvasPoint)

      expect(result.x).toBe(400) // 200 * 2
    })
  })
})
