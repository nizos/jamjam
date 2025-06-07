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

  describe('contains', () => {
    const bounds = new Bounds(new Point(10, 20), new Size(100, 50))

    it.each([
      { point: new Point(50, 40), expected: true, description: 'inside point' },
      {
        point: new Point(5, 40),
        expected: false,
        description: 'left of bounds',
      },
      {
        point: new Point(120, 40),
        expected: false,
        description: 'right of bounds',
      },
      {
        point: new Point(50, 10),
        expected: false,
        description: 'above bounds',
      },
      {
        point: new Point(50, 80),
        expected: false,
        description: 'below bounds',
      },
      // Corners
      {
        point: new Point(10, 20),
        expected: true,
        description: 'top-left corner',
      },
      {
        point: new Point(110, 20),
        expected: true,
        description: 'top-right corner',
      },
      {
        point: new Point(10, 70),
        expected: true,
        description: 'bottom-left corner',
      },
      {
        point: new Point(110, 70),
        expected: true,
        description: 'bottom-right corner',
      },
      // Edges
      { point: new Point(60, 20), expected: true, description: 'top edge' },
      { point: new Point(60, 70), expected: true, description: 'bottom edge' },
      { point: new Point(10, 45), expected: true, description: 'left edge' },
      { point: new Point(110, 45), expected: true, description: 'right edge' },
    ])('should return $expected for $description', ({ point, expected }) => {
      expect(bounds.contains(point)).toBe(expected)
    })
  })

  describe('corner calculations', () => {
    const bounds = new Bounds(new Point(10, 20), new Size(100, 50))

    it.each([
      { method: 'topLeft' as const, expectedX: 10, expectedY: 20 },
      { method: 'topRight' as const, expectedX: 110, expectedY: 20 },
      { method: 'bottomLeft' as const, expectedX: 10, expectedY: 70 },
      { method: 'bottomRight' as const, expectedX: 110, expectedY: 70 },
    ])(
      'should calculate $method corner correctly',
      ({ method, expectedX, expectedY }) => {
        const corner = bounds[method]()
        expect(corner.x).toBe(expectedX)
        expect(corner.y).toBe(expectedY)
      }
    )
  })
})
