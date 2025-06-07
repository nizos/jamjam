import { describe, it, expect } from 'vitest'
import { Bounds } from './Bounds'
import { Point } from './Point'
import { Size } from './Size'

describe('Bounds', () => {
  it('should create bounds from position and size', () => {
    const position = new Point(10, 20)
    const size = new Size(100, 50)
    const bounds = new Bounds(position, size)

    expect(bounds.position).toBe(position)
    expect(bounds.size).toBe(size)
  })
})
