import { describe, it, expect } from 'vitest'
import { Point } from './Point'

describe('Point', () => {
  it('should create a point with x and y coordinates', () => {
    const point = new Point(10, 20)

    expect(point.x).toBe(10)
    expect(point.y).toBe(20)
  })

  it('should be equal when coordinates are the same', () => {
    const point1 = new Point(10, 20)
    const point2 = new Point(10, 20)

    expect(point1.equals(point2)).toBe(true)
  })

  it('should return a new point when adding', () => {
    const point1 = new Point(10, 20)
    const point2 = new Point(5, 3)
    const result = point1.add(point2)

    expect(result.x).toBe(15)
    expect(result.y).toBe(23)
    expect(result).not.toBe(point1) // Ensures immutability
    expect(result).not.toBe(point2)
  })
})
