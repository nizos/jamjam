import { describe, it, expect, beforeEach } from 'vitest'
import { render } from '@testing-library/react'
import { Canvas } from './Canvas'
import { useCanvasStore } from '../../infrastructure/stores/CanvasStore'
import { Point } from '../../domain/canvas/Point'
import Konva from 'konva'

describe('Canvas', () => {
  let container: HTMLElement
  let canvas: HTMLCanvasElement | null
  let stage: Konva.Stage

  beforeEach(() => {
    // Reset canvas store to initial state
    useCanvasStore.getState().reset()
    ;({ container, canvas, stage } = setupCanvas())
  })

  it('should render without crashing', () => {
    expect(container.firstChild).toBeDefined()
  })

  it('should create a canvas element', () => {
    expect(canvas).not.toBeNull()
  })

  describe('with custom dimensions', () => {
    it('should use provided width', () => {
      expect(canvas?.width).toBe(1024)
    })

    it('should use provided height', () => {
      expect(canvas?.height).toBe(768)
    })
  })

  describe('stage position from store', () => {
    beforeEach(() => {
      useCanvasStore.getState().pan(new Point(50, 30))
      ;({ container, canvas, stage } = setupCanvas())
    })

    it('should set x position from viewport', () => {
      expect(stage.x()).toBe(50)
    })

    it('should set y position from viewport', () => {
      expect(stage.y()).toBe(30)
    })
  })
})

function setupCanvas(width = 1024, height = 768) {
  // Canvas requires a valid container with dimensions
  // In jsdom, we need to mock the container's offsetWidth/offsetHeight
  // which Konva uses to determine if the container is ready
  Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
    configurable: true,
    value: width,
  })
  Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
    configurable: true,
    value: height,
  })

  const container = render(<Canvas width={width} height={height} />).container
  const canvas = container.querySelector('canvas')
  const stage = Konva.stages[Konva.stages.length - 1]

  return { container, canvas, stage }
}
