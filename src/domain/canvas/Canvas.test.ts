import { describe, it, expect, beforeEach } from 'vitest'
import { Canvas } from './Canvas'
import { Point } from './Point'

describe('Canvas', () => {
  let canvas: Canvas

  beforeEach(() => {
    canvas = new Canvas()
  })

  it('should have a zoom level', () => {
    expect(canvas.zoom).toBe(1)
  })

  it('should have a viewport', () => {
    expect(canvas.viewport.position.x).toBe(0)
  })

  it('should pan the viewport', () => {
    canvas.pan(new Point(10, 20))

    expect(canvas.viewport.position.x).toBe(10)
  })

  it('should zoom around a center point', () => {
    canvas.zoomTo(2)

    expect(canvas.zoom).toBe(2)
  })

  it('should reset to initial state', () => {
    canvas.pan(new Point(100, 100))
    canvas.zoomTo(2)
    canvas.reset()

    expect(canvas.zoom).toBe(1)
  })
})
