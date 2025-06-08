import { describe, it, expect, beforeEach } from 'vitest'
import { Viewport } from './Viewport'
import { Point } from './Point'

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
})
