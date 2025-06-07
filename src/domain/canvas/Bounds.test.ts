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

  describe('intersects', () => {
    const bounds1 = new Bounds(new Point(10, 20), new Size(100, 50))

    it.each([
      {
        other: new Bounds(new Point(50, 40), new Size(80, 60)),
        expected: true,
        description: 'overlapping bounds',
      },
      {
        other: new Bounds(new Point(0, 0), new Size(5, 5)),
        expected: false,
        description: 'completely separate bounds (top-left)',
      },
      {
        other: new Bounds(new Point(120, 80), new Size(50, 30)),
        expected: false,
        description: 'completely separate bounds (bottom-right)',
      },
      {
        other: new Bounds(new Point(110, 20), new Size(50, 50)),
        expected: false,
        description: 'adjacent bounds (right edge)',
      },
      {
        other: new Bounds(new Point(10, 70), new Size(100, 50)),
        expected: false,
        description: 'adjacent bounds (bottom edge)',
      },
      {
        other: new Bounds(new Point(10, 20), new Size(100, 50)),
        expected: true,
        description: 'identical bounds',
      },
      {
        other: new Bounds(new Point(20, 30), new Size(50, 20)),
        expected: true,
        description: 'fully contained bounds',
      },
      {
        other: new Bounds(new Point(0, 0), new Size(200, 100)),
        expected: true,
        description: 'containing bounds',
      },
      {
        other: new Bounds(new Point(109, 69), new Size(10, 10)),
        expected: true,
        description: 'corner overlap (bottom-right)',
      },
    ])('should return $expected for $description', ({ other, expected }) => {
      expect(bounds1.intersects(other)).toBe(expected)
    })
  })

  describe('translate', () => {
    it('should move bounds by a given offset', () => {
      const bounds = new Bounds(new Point(10, 20), new Size(100, 50))
      const offset = new Point(15, 25)

      const translated = bounds.translate(offset)

      expect(translated.position.x).toBe(25)
      expect(translated.position.y).toBe(45)
      expect(translated.size.width).toBe(100)
      expect(translated.size.height).toBe(50)
    })

    it('should return a new Bounds instance (immutability)', () => {
      const bounds = new Bounds(new Point(10, 20), new Size(100, 50))
      const offset = new Point(15, 25)

      const translated = bounds.translate(offset)

      expect(translated).not.toBe(bounds)
      expect(bounds.position.x).toBe(10)
      expect(bounds.position.y).toBe(20)
    })
  })

  describe('expand', () => {
    it('should increase bounds size by given amount on all sides', () => {
      const bounds = new Bounds(new Point(10, 20), new Size(100, 50))

      const expanded = bounds.expand(10)

      expect(expanded.position.x).toBe(0)
      expect(expanded.position.y).toBe(10)
      expect(expanded.size.width).toBe(120)
      expect(expanded.size.height).toBe(70)
    })

    it('should contract bounds when given negative amount', () => {
      const bounds = new Bounds(new Point(10, 20), new Size(100, 50))

      const contracted = bounds.expand(-5)

      expect(contracted.position.x).toBe(15)
      expect(contracted.position.y).toBe(25)
      expect(contracted.size.width).toBe(90)
      expect(contracted.size.height).toBe(40)
    })

    it('should return a new Bounds instance (immutability)', () => {
      const bounds = new Bounds(new Point(10, 20), new Size(100, 50))

      const expanded = bounds.expand(10)

      expect(expanded).not.toBe(bounds)
      expect(bounds.position.x).toBe(10)
      expect(bounds.size.width).toBe(100)
    })
  })
})
