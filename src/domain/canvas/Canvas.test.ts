import { describe, it, expect, beforeEach } from 'vitest'
import { Canvas } from './Canvas'
import { Point } from './Point'

describe('Canvas', () => {
  let canvas: Canvas

  beforeEach(() => {
    canvas = new Canvas()
  })

  describe('initialization', () => {
    it('should have default zoom level of 1', () => {
      expect(canvas.zoom).toBe(1)
    })

    it('should have viewport at origin', () => {
      expect(canvas.viewport.position.x).toBe(0)
      expect(canvas.viewport.position.y).toBe(0)
    })

    it('should have default viewport dimensions', () => {
      expect(canvas.viewport.width).toBe(800)
      expect(canvas.viewport.height).toBe(600)
    })
  })

  describe('pan', () => {
    it('should update viewport position', () => {
      canvas.pan(new Point(10, 20))

      expect(canvas.viewport.position.x).toBe(10)
      expect(canvas.viewport.position.y).toBe(20)
    })

    it('should accumulate pan offsets', () => {
      canvas.pan(new Point(10, 20))
      canvas.pan(new Point(5, -10))

      expect(canvas.viewport.position.x).toBe(15)
      expect(canvas.viewport.position.y).toBe(10)
    })
  })

  describe('zoomTo', () => {
    it('should update zoom level', () => {
      canvas.zoomTo(2)

      expect(canvas.zoom).toBe(2)
    })

    it('should zoom around center point by default', () => {
      // Default viewport is 800x600, so center is at (400, 300)
      canvas.zoomTo(2)

      expect(canvas.zoom).toBe(2)
      // When zooming 2x around center (400, 300) from origin (0, 0)
      // newX = 400 - (400 - 0) * 2 = 400 - 800 = -400
      // newY = 300 - (300 - 0) * 2 = 300 - 600 = -300
      expect(canvas.viewport.position.x).toBe(-400)
      expect(canvas.viewport.position.y).toBe(-300)
    })

    it('should zoom around specified point', () => {
      const zoomPoint = new Point(100, 100)
      canvas.zoomTo(2, zoomPoint)

      expect(canvas.zoom).toBe(2)
      // When zooming by 2x around point (100, 100), the viewport should shift
      // so that the point stays in the same screen position
      expect(canvas.viewport.position.x).toBe(-100)
      expect(canvas.viewport.position.y).toBe(-100)
    })

    it('should zoom around non-center point with existing pan', () => {
      // Start with a panned position
      canvas.pan(new Point(50, 30))

      // Zoom 2x around point (200, 150)
      const zoomPoint = new Point(200, 150)
      canvas.zoomTo(2, zoomPoint)

      expect(canvas.zoom).toBe(2)
      // newX = 200 - (200 - 50) * 2 = 200 - 300 = -100
      // newY = 150 - (150 - 30) * 2 = 150 - 240 = -90
      expect(canvas.viewport.position.x).toBe(-100)
      expect(canvas.viewport.position.y).toBe(-90)
    })
  })

  describe('reset', () => {
    it('should reset zoom to 1', () => {
      canvas.zoomTo(2.5)
      canvas.reset()

      expect(canvas.zoom).toBe(1)
    })

    it('should reset viewport position to origin', () => {
      canvas.pan(new Point(100, 100))
      canvas.reset()

      expect(canvas.viewport.position.x).toBe(0)
      expect(canvas.viewport.position.y).toBe(0)
    })

    it('should reset all state after multiple operations', () => {
      canvas.pan(new Point(100, 100))
      canvas.zoomTo(2)
      canvas.pan(new Point(50, 50))
      canvas.reset()

      expect(canvas.zoom).toBe(1)
      expect(canvas.viewport.position.x).toBe(0)
      expect(canvas.viewport.position.y).toBe(0)
    })
  })
})
