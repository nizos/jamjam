import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render } from '@testing-library/react'
import { Canvas } from './Canvas'
import { useCanvasStore } from '../../infrastructure/stores/CanvasStore'
import { Point } from '../../domain/canvas/Point'
import Konva from 'konva'
import { setupKonvaContainer } from '../../test/utils/konva'

describe('Canvas', () => {
  let container: HTMLElement
  let canvas: HTMLCanvasElement | null
  let stage: Konva.Stage
  let onPan: ReturnType<typeof vi.fn>
  let onZoom: ReturnType<typeof vi.fn>

  beforeEach(() => {
    // Reset canvas store to initial state
    useCanvasStore.getState().reset()
    ;({ container, canvas, stage, onPan, onZoom } = setupCanvas())
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

  describe('zoom interaction', () => {
    it('should scale stage based on zoom from store', () => {
      useCanvasStore.getState().zoomTo(2)
      const { stage } = setupCanvas()

      expect(stage.scaleX()).toBe(2)
    })

    it('should scale y same as x for uniform zoom', () => {
      useCanvasStore.getState().zoomTo(1.5)
      const { stage } = setupCanvas()

      expect(stage.scaleY()).toBe(1.5)
    })

    it('should call onZoom when wheel event occurs', () => {
      const wheelEvent = {
        evt: {
          deltaY: -100,
          preventDefault: vi.fn(),
        },
      }
      stage.fire('wheel', wheelEvent)

      expect(onZoom).toHaveBeenCalledWith({
        factor: 1.1,
        position: { x: 0, y: 0 },
      })
    })

    it('should zoom out when wheel scrolls down', () => {
      const wheelEvent = {
        evt: {
          deltaY: 100,
          preventDefault: vi.fn(),
        },
      }
      stage.fire('wheel', wheelEvent)

      expect(onZoom).toHaveBeenCalledWith({
        factor: 1 / 1.1,
        position: { x: 0, y: 0 },
      })
    })
  })

  it('should render a grid', () => {
    const lines = stage.find('Line')
    expect(lines.length).toBeGreaterThan(0)
  })

  describe('drag move interaction', () => {
    it('should not call onPan during drag move', () => {
      // Start dragging
      stage.fire('dragstart')

      // Move to a new position
      stage.position({ x: 100, y: 50 })
      stage.fire('dragmove')

      // onPan should NOT be called during drag move
      expect(onPan).not.toHaveBeenCalled()
    })

    it('should call onPan only when drag ends', () => {
      // Start dragging
      stage.fire('dragstart')

      // Move to a new position
      stage.position({ x: 100, y: 50 })
      stage.fire('dragmove')

      // End drag
      stage.fire('dragend')

      // onPan should be called with final position
      expect(onPan).toHaveBeenCalledWith({ x: 100, y: 50 })
    })
  })
})

function setupCanvas(width = 800, height = 600) {
  setupKonvaContainer(width, height)

  const onPan = vi.fn()
  const onZoom = vi.fn()
  const container = render(
    <Canvas width={width} height={height} onPan={onPan} onZoom={onZoom} />
  ).container
  const canvas = container.querySelector('canvas')
  const stage = Konva.stages[Konva.stages.length - 1]

  return { container, canvas, stage, onPan, onZoom }
}
