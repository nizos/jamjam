import { describe, it, expect, beforeEach } from 'vitest'
import { CanvasObject } from './CanvasObject'
import { ObjectType } from './types'
import { Point } from '../canvas/Point'
import { Size } from '../canvas/Size'

describe('CanvasObject', () => {
  let object: CanvasObject

  beforeEach(() => {
    object = {
      id: 'test-id',
      type: ObjectType.Rectangle,
      position: new Point(10, 20),
      size: new Size(100, 50),
      rotation: 0,
      style: {
        fill: '#ffffff',
      },
      zIndex: 0,
    }
  })

  it('should have an id', () => {
    expect(object.id).toBe('test-id')
  })

  it('should have a type', () => {
    expect(object.type).toBe(ObjectType.Rectangle)
  })

  it('should have a position', () => {
    expect(object.position.x).toBe(10)
  })

  it('should have a size', () => {
    expect(object.size.width).toBe(100)
  })

  it('should have a rotation', () => {
    expect(object.rotation).toBe(0)
  })

  it('should have a style', () => {
    expect(object.style.fill).toBe('#ffffff')
  })

  it('should have a zIndex', () => {
    expect(object.zIndex).toBe(0)
  })
})
