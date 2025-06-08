import { Canvas } from './Canvas'
import { useCanvasStore } from '../../infrastructure/stores/CanvasStore'
import { Point } from '../../domain/canvas/Point'

export function CanvasContainer() {
  const pan = useCanvasStore((state) => state.pan)
  const zoomTo = useCanvasStore((state) => state.zoomTo)
  const zoom = useCanvasStore((state) => state.canvas.zoom)

  const handlePan = (position: { x: number; y: number }) => {
    pan(new Point(position.x, position.y))
  }

  const handleZoom = (event: {
    factor: number
    position: { x: number; y: number }
  }) => {
    zoomTo(zoom * event.factor, new Point(event.position.x, event.position.y))
  }

  return (
    <Canvas
      width={window.innerWidth}
      height={window.innerHeight}
      onPan={handlePan}
      onZoom={handleZoom}
    />
  )
}
