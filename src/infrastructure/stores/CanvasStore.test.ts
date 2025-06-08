import { describe, it, expect, beforeEach } from 'vitest'
import { useCanvasStore } from './CanvasStore'
import { Point } from '../../domain/canvas/Point'
import { Canvas } from '../../domain/canvas/Canvas'

describe('CanvasStore', () => {
  beforeEach(() => {
    useCanvasStore.setState({ canvas: new Canvas() })
  })

  describe('initial state', () => {
    it('should have a canvas property', () => {
      const store = useCanvasStore.getState()

      expect(store.canvas).toBeDefined()
    })

    it('should have a pan action', () => {
      const store = useCanvasStore.getState()

      expect(store.pan).toBeDefined()
    })

    it('should have a zoomTo action', () => {
      const store = useCanvasStore.getState()

      expect(store.zoomTo).toBeDefined()
    })

    it('should have a reset action', () => {
      const store = useCanvasStore.getState()

      expect(store.reset).toBeDefined()
    })
  })

  describe('pan action', () => {
    it('should update canvas viewport position x when pan is called', () => {
      const offset = new Point(50, 30)

      useCanvasStore.getState().pan(offset)

      const updatedCanvas = useCanvasStore.getState().canvas
      expect(updatedCanvas.viewport.position.x).toBe(50)
    })

    it('should update canvas viewport position y when pan is called', () => {
      const offset = new Point(50, 30)

      useCanvasStore.getState().pan(offset)

      const updatedCanvas = useCanvasStore.getState().canvas
      expect(updatedCanvas.viewport.position.y).toBe(30)
    })
  })

  describe('zoom action', () => {
    it('should update canvas zoom when zoomTo is called', () => {
      const zoomLevel = 2

      useCanvasStore.getState().zoomTo(zoomLevel)

      const updatedCanvas = useCanvasStore.getState().canvas
      expect(updatedCanvas.zoom).toBe(2)
    })
  })

  describe('reset action', () => {
    it('should reset canvas viewport position to initial state', () => {
      // First, modify the canvas state
      useCanvasStore.getState().pan(new Point(100, 50))
      useCanvasStore.getState().zoomTo(2)

      // Then reset
      useCanvasStore.getState().reset()

      // Verify canvas is back to initial state
      const resetCanvas = useCanvasStore.getState().canvas
      expect(resetCanvas.viewport.position.x).toBe(0)
    })

    it('should reset zoom to 1', () => {
      // First, modify the zoom
      useCanvasStore.getState().zoomTo(3)

      // Then reset
      useCanvasStore.getState().reset()

      // Verify zoom is back to 1
      const resetCanvas = useCanvasStore.getState().canvas
      expect(resetCanvas.zoom).toBe(1)
    })
  })
})
