import { describe, it, expect } from 'vitest'
import { Size } from './Size'

describe('Size', () => {
  it('should create a size with width and height', () => {
    const size = new Size(100, 50)

    expect(size.width).toBe(100)
    expect(size.height).toBe(50)
  })

  it('should scale and return a new size', () => {
    const size = new Size(100, 50)
    const scaled = size.scale(2)

    expect(scaled.width).toBe(200)
    expect(scaled.height).toBe(100)
    expect(scaled).not.toBe(size) // Ensures immutability
  })

  it('should calculate area', () => {
    const size = new Size(10, 5)

    expect(size.area()).toBe(50)
  })

  it('should detect empty size', () => {
    const normalSize = new Size(10, 5)
    const zeroWidth = new Size(0, 5)
    const zeroHeight = new Size(10, 0)
    const bothZero = new Size(0, 0)

    expect(normalSize.isEmpty()).toBe(false)
    expect(zeroWidth.isEmpty()).toBe(true)
    expect(zeroHeight.isEmpty()).toBe(true)
    expect(bothZero.isEmpty()).toBe(true)
  })
})
