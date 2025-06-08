import { describe, it, expect, beforeEach } from 'vitest'
import { render } from '@testing-library/react'
import { CanvasContainer } from './CanvasContainer'
import { useCanvasStore } from '../../infrastructure/stores/CanvasStore'
import Konva from 'konva'

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
})

function setupCanvasContainer(width = 800, height = 600) {
  // Canvas requires a valid container with dimensions
  Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
    configurable: true,
    value: width,
  })
  Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
    configurable: true,
    value: height,
  })

  const { container } = render(<CanvasContainer />)
  const stage = Konva.stages[Konva.stages.length - 1]

  return { container, stage }
}
