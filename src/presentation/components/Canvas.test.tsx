import { describe, it, expect, beforeEach } from 'vitest'
import { render } from '@testing-library/react'
import { Canvas } from './Canvas'
import { useCanvasStore } from '../../infrastructure/stores/CanvasStore'

describe('Canvas', () => {
  let container: HTMLElement

  beforeEach(() => {
    // Canvas requires a valid container with dimensions
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
      configurable: true,
      value: 800,
    })
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
      configurable: true,
      value: 600,
    })
    // Reset canvas store to initial state
    useCanvasStore.getState().reset()
    // Render the canvas with default props
    container = render(<Canvas />).container
  })

  it('should render without crashing', () => {
    expect(container.firstChild).toBeDefined()
  })

  it('should create a canvas element', () => {
    const canvas = container.querySelector('canvas')
    expect(canvas).not.toBeNull()
  })

  describe('with custom dimensions', () => {
    beforeEach(() => {
      container = render(<Canvas width={1024} height={768} />).container
    })

    it('should use provided width', () => {
      const canvas = container.querySelector('canvas')
      expect(canvas?.width).toBe(1024)
    })

    it('should use provided height', () => {
      const canvas = container.querySelector('canvas')
      expect(canvas?.height).toBe(768)
    })
  })
})
