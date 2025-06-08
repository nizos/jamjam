import { describe, it, expect, beforeEach } from 'vitest'
import { Viewport } from './Viewport'
import { Point } from './Point'
import { Bounds } from './Bounds'

describe('Viewport', () => {
  let viewport: Viewport

  beforeEach(() => {
    viewport = new Viewport(new Point(0, 0), 100, 200)
  })

  it('should have a position', () => {
    expect(viewport.position.x).toBe(0)
  })

  it('should have a width', () => {
    expect(viewport.width).toBe(100)
  })

  it('should have a height', () => {
    expect(viewport.height).toBe(200)
  })

  describe('getVisibleBounds', () => {
    let viewport: Viewport
    let bounds: Bounds

    beforeEach(() => {
      viewport = new Viewport(new Point(100, 50), 800, 600)
      bounds = viewport.getVisibleBounds()
    })

    it('should return bounds with x equal to viewport position x', () => {
      expect(bounds.position.x).toBe(100)
    })

    it('should return bounds with y equal to viewport position y', () => {
      expect(bounds.position.y).toBe(50)
    })

    it('should return bounds with width equal to viewport width', () => {
      expect(bounds.size.width).toBe(800)
    })

    it('should return bounds with height equal to viewport height', () => {
      expect(bounds.size.height).toBe(600)
    })
  })

  describe('containsPoint', () => {
    let viewport: Viewport

    beforeEach(() => {
      viewport = new Viewport(new Point(100, 50), 800, 600)
    })

    it('should return true when point is within viewport bounds', () => {
      const point = new Point(150, 100)

      const result = viewport.containsPoint(point)

      expect(result).toBe(true)
    })

    it('should return false when point is outside viewport bounds', () => {
      const point = new Point(50, 25)

      const result = viewport.containsPoint(point)

      expect(result).toBe(false)
    })
  })
})
