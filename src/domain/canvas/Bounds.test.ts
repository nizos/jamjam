import { describe, it, expect } from 'vitest'
import { Bounds } from './Bounds'
import { Point } from './Point'
import { Size } from './Size'

describe('Bounds', () => {
  // Default test bounds: position (10, 20), size 100x50
  const createBounds = (x = 10, y = 20, width = 100, height = 50) =>
    new Bounds(new Point(x, y), new Size(width, height))

  const getCenter = (bounds: Bounds): Point =>
    new Point(
      bounds.position.x + bounds.size.width / 2,
      bounds.position.y + bounds.size.height / 2
    )

  describe('construction', () => {
    it('should create bounds from position and size', () => {
      const position = new Point(10, 20)
      const size = new Size(100, 50)
      const bounds = new Bounds(position, size)

      expect(bounds.position).toBe(position)
      expect(bounds.size).toBe(size)
    })

    it('should handle bounds with zero dimensions', () => {
      const bounds = createBounds(10, 20, 0, 0)

      expect(bounds.position).toEqual(new Point(10, 20))
      expect(bounds.size).toEqual(new Size(0, 0))
    })

    it('should handle bounds at origin', () => {
      const bounds = createBounds(0, 0, 100, 50)

      expect(bounds.position).toEqual(new Point(0, 0))
      expect(bounds.topLeft()).toEqual(new Point(0, 0))
      expect(bounds.bottomRight()).toEqual(new Point(100, 50))
    })
  })

  describe('contains', () => {
    const bounds = createBounds() // Default: position (10, 20), size 100x50

    describe('points inside bounds', () => {
      it.each([
        { point: new Point(50, 40), description: 'center point' },
        { point: new Point(10, 20), description: 'top-left corner' },
        { point: new Point(110, 20), description: 'top-right corner' },
        { point: new Point(10, 70), description: 'bottom-left corner' },
        { point: new Point(110, 70), description: 'bottom-right corner' },
        { point: new Point(60, 20), description: 'top edge' },
        { point: new Point(60, 70), description: 'bottom edge' },
        { point: new Point(10, 45), description: 'left edge' },
        { point: new Point(110, 45), description: 'right edge' },
      ])('should contain $description', ({ point }) => {
        expect(bounds.contains(point)).toBe(true)
      })
    })

    describe('points outside bounds', () => {
      it.each([
        { point: new Point(5, 40), description: 'left of bounds' },
        { point: new Point(120, 40), description: 'right of bounds' },
        { point: new Point(50, 10), description: 'above bounds' },
        { point: new Point(50, 80), description: 'below bounds' },
        { point: new Point(0, 0), description: 'far top-left' },
        { point: new Point(200, 200), description: 'far bottom-right' },
      ])('should not contain $description', ({ point }) => {
        expect(bounds.contains(point)).toBe(false)
      })
    })

    it('should handle zero-sized bounds', () => {
      const zeroBounds = createBounds(10, 20, 0, 0)

      // Only the exact position should be contained
      expect(zeroBounds.contains(new Point(10, 20))).toBe(true)
      expect(zeroBounds.contains(new Point(10.1, 20))).toBe(false)
      expect(zeroBounds.contains(new Point(10, 20.1))).toBe(false)
    })
  })

  describe('corner calculations', () => {
    const bounds = createBounds() // Default: position (10, 20), size 100x50

    it('should calculate all corners correctly', () => {
      expect(bounds.topLeft()).toEqual(new Point(10, 20))
      expect(bounds.topRight()).toEqual(new Point(110, 20))
      expect(bounds.bottomLeft()).toEqual(new Point(10, 70))
      expect(bounds.bottomRight()).toEqual(new Point(110, 70))
    })
  })

  describe('intersects', () => {
    const bounds = createBounds() // Default: position (10, 20), size 100x50

    describe('intersecting bounds', () => {
      it.each([
        { other: createBounds(50, 40, 80, 60), description: 'partial overlap' },
        {
          other: createBounds(10, 20, 100, 50),
          description: 'identical bounds',
        },
        { other: createBounds(20, 30, 50, 20), description: 'fully contained' },
        {
          other: createBounds(0, 0, 200, 100),
          description: 'fully containing',
        },
        { other: createBounds(109, 69, 10, 10), description: 'corner overlap' },
      ])('should intersect with $description', ({ other }) => {
        expect(bounds.intersects(other)).toBe(true)
        expect(other.intersects(bounds)).toBe(true) // Verify symmetry
      })
    })

    describe('non-intersecting bounds', () => {
      it.each([
        { other: createBounds(0, 0, 5, 5), description: 'far top-left' },
        {
          other: createBounds(120, 80, 50, 30),
          description: 'far bottom-right',
        },
        { other: createBounds(110, 20, 50, 50), description: 'adjacent right' },
        {
          other: createBounds(10, 70, 100, 50),
          description: 'adjacent bottom',
        },
      ])('should not intersect with $description', ({ other }) => {
        expect(bounds.intersects(other)).toBe(false)
        expect(other.intersects(bounds)).toBe(false) // Verify symmetry
      })
    })
  })

  describe('translate', () => {
    const bounds = createBounds() // Default: position (10, 20), size 100x50

    it('should move bounds by positive offset', () => {
      const translated = bounds.translate(new Point(15, 25))

      expect(translated.position).toEqual(new Point(25, 45))
      expect(translated.size).toEqual(new Size(100, 50))
    })

    it('should move bounds by negative offset', () => {
      const translated = bounds.translate(new Point(-5, -10))

      expect(translated.position).toEqual(new Point(5, 10))
      expect(translated.size).toEqual(new Size(100, 50))
    })

    it('should handle zero offset', () => {
      const translated = bounds.translate(new Point(0, 0))

      expect(translated.position).toEqual(bounds.position)
      expect(translated.size).toEqual(bounds.size)
    })

    it('should return a new instance (immutability)', () => {
      const translated = bounds.translate(new Point(15, 25))

      expect(translated).not.toBe(bounds)
      expect(bounds.position).toEqual(new Point(10, 20)) // Original unchanged
    })
  })

  describe('expand', () => {
    const bounds = createBounds() // Default: position (10, 20), size 100x50

    it('should expand bounds uniformly on all sides', () => {
      const expanded = bounds.expand(10)

      expect(expanded.position).toEqual(new Point(0, 10))
      expect(expanded.size).toEqual(new Size(120, 70))
    })

    it('should contract bounds with negative amount', () => {
      const contracted = bounds.expand(-5)

      expect(contracted.position).toEqual(new Point(15, 25))
      expect(contracted.size).toEqual(new Size(90, 40))
    })

    it('should handle zero expansion', () => {
      const unchanged = bounds.expand(0)

      expect(unchanged.position).toEqual(bounds.position)
      expect(unchanged.size).toEqual(bounds.size)
    })

    it('should maintain center point after expansion', () => {
      const originalCenter = getCenter(bounds)
      const expanded = bounds.expand(10)
      const expandedCenter = getCenter(expanded)

      expect(expandedCenter).toEqual(originalCenter)
    })

    it('should return a new instance (immutability)', () => {
      const expanded = bounds.expand(10)

      expect(expanded).not.toBe(bounds)
      expect(bounds.position).toEqual(new Point(10, 20)) // Original unchanged
      expect(bounds.size).toEqual(new Size(100, 50)) // Original unchanged
    })
  })
})
