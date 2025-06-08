import { Stage, Layer } from 'react-konva'
import { useCanvasStore } from '../../infrastructure/stores/CanvasStore'

interface CanvasProps {
  width?: number
  height?: number
}

export function Canvas({ width = 800, height = 600 }: CanvasProps) {
  const canvas = useCanvasStore((state) => state.canvas)

  return (
    <Stage
      width={width}
      height={height}
      x={canvas.viewport.position.x}
      y={canvas.viewport.position.y}
    >
      <Layer />
    </Stage>
  )
}
