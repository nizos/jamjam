import { describe, it, expect } from 'vitest'
import { ObjectType, Style } from './types'

describe('ObjectType', () => {
  it('should have Rectangle type', () => {
    expect(ObjectType.Rectangle).toBe('rectangle')
  })
})

describe('Style', () => {
  it('should allow fill property', () => {
    const style: Style = {
      fill: '#ffffff',
    }
    
    expect(style.fill).toBe('#ffffff')
  })
})