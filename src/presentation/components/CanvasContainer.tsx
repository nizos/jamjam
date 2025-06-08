import { Canvas } from './Canvas'
import { useCanvasStore } from '../../infrastructure/stores/CanvasStore'
import { Point } from '../../domain/canvas/Point'

export function CanvasContainer() {
  const pan = useCanvasStore((state) => state.pan)

  const handlePan = (position: { x: number; y: number }) => {
    pan(new Point(position.x, position.y))
  }

  return <Canvas onPan={handlePan} />
}
