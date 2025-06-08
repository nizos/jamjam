import { create } from 'zustand'
import { Canvas } from '../../domain/canvas/Canvas'
import { Point } from '../../domain/canvas/Point'

interface CanvasState {
  canvas: Canvas
  pan: (offset: Point) => void
  zoomTo: (level: number) => void
  reset: () => void
}

export const useCanvasStore = create<CanvasState>((set) => ({
  canvas: new Canvas(),
  pan: (offset: Point) =>
    set((state) => {
      state.canvas.pan(offset)
      return { canvas: state.canvas }
    }),
  zoomTo: (level: number) =>
    set((state) => {
      state.canvas.zoomTo(level)
      return { canvas: state.canvas }
    }),
  reset: () => set(() => ({ canvas: new Canvas() })),
}))
