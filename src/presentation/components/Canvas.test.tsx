import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render } from '@testing-library/react'
import { Canvas } from './Canvas'
import { useCanvasStore } from '../../infrastructure/stores/CanvasStore'
import { Point } from '../../domain/canvas/Point'
import Konva from 'konva'

describe('Canvas', () => {
  let container: HTMLElement
  let canvas: HTMLCanvasElement | null
  let stage: Konva.Stage
  let onPan: ReturnType<typeof vi.fn>

  beforeEach(() => {
    // Reset canvas store to initial state
    useCanvasStore.getState().reset()
    ;({ container, canvas, stage, onPan } = setupCanvas())
  })

  it('should render canvas element', () => {
    expect(container.firstChild).toBeDefined()
    expect(canvas).not.toBeNull()
  })

  describe('with default dimensions', () => {
    it('should use default width', () => {
      expect(canvas?.width).toBe(800)
    })

    it('should use default height', () => {
      expect(canvas?.height).toBe(600)
    })
  })

  describe('with custom dimensions', () => {
    it('should use provided dimensions', () => {
      const { canvas } = setupCanvas(1024, 768)
      expect(canvas?.width).toBe(1024)
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

  describe('pan interaction', () => {
    it('should make stage draggable', () => {
      expect(stage.draggable()).toBe(true)
    })

    it('should call onPan when drag ends with stage position', () => {
      // Simulate dragging stage to position (100, 50)
      stage.position({ x: 100, y: 50 })
      stage.fire('dragend')

      expect(onPan).toHaveBeenCalledWith({ x: 100, y: 50 })
    })
  })
})

function setupCanvas(width = 800, height = 600) {
  // Canvas requires a valid container with dimensions
  Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
    configurable: true,
    value: width,
  })
  Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
    configurable: true,
    value: height,
  })

  const onPan = vi.fn()
  const container = render(
    <Canvas width={width} height={height} onPan={onPan} />
  ).container
  const canvas = container.querySelector('canvas')
  const stage = Konva.stages[Konva.stages.length - 1]

  return { container, canvas, stage, onPan }
}
