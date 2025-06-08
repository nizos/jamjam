import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render } from '@testing-library/react'
import { CanvasContainer } from './CanvasContainer'
import { useCanvasStore } from '../../infrastructure/stores/CanvasStore'
import Konva from 'konva'
import { setupKonvaContainer } from '../../test/utils/konva'

describe('CanvasContainer', () => {
  beforeEach(() => {
    // Reset canvas store to initial state
    useCanvasStore.getState().reset()
  })

  describe('when canvas is panned', () => {
    let stage: Konva.Stage

    beforeEach(() => {
      const setup = setupCanvasContainer()
      stage = setup.stage

      // Simulate dragging the stage
      stage.position({ x: 100, y: 50 })
      stage.fire('dragend')
    })

    it('should update store x position', () => {
      const canvasState = useCanvasStore.getState().canvas
      expect(canvasState.viewport.position.x).toBe(100)
    })

    it('should update store y position', () => {
      const canvasState = useCanvasStore.getState().canvas
      expect(canvasState.viewport.position.y).toBe(50)
    })
  })

  describe('when canvas is zoomed', () => {
    it('should update store zoom factor', () => {
      const { stage } = setupCanvasContainer()

      const wheelEvent = {
        evt: {
          deltaY: -100,
          preventDefault: vi.fn(),
        },
      }
      stage.fire('wheel', wheelEvent)

      const canvasState = useCanvasStore.getState().canvas
      expect(canvasState.zoom).toBe(1.1)
    })
  })

  it('should use window dimensions for canvas', () => {
    Object.defineProperty(window, 'innerWidth', {
      value: 1920,
      configurable: true,
    })
    Object.defineProperty(window, 'innerHeight', {
      value: 1080,
      configurable: true,
    })

    const { container } = render(<CanvasContainer />)
    const stage = container.querySelector('[role="presentation"]')

    expect(stage).toHaveStyle({ width: '1920px', height: '1080px' })
  })
})

function setupCanvasContainer(width = 800, height = 600) {
  setupKonvaContainer(width, height)

  const { container } = render(<CanvasContainer />)
  const stage = Konva.stages[Konva.stages.length - 1]

  return { container, stage }
}
