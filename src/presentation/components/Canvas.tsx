import { Stage, Layer } from 'react-konva'
import { useCanvasStore } from '../../infrastructure/stores/CanvasStore'
import type Konva from 'konva'

interface CanvasProps {
  width?: number
  height?: number
  onPan?: (position: { x: number; y: number }) => void
}

export function Canvas({ width = 800, height = 600, onPan }: CanvasProps) {
  const canvas = useCanvasStore((state) => state.canvas)

  const handleDragEnd = (e: Konva.KonvaEventObject<DragEvent>) => {
    if (onPan) {
      const stage = e.target as Konva.Stage
      const position = stage.position()
      onPan(position)
    }
  }

  return (
    <Stage
      width={width}
      height={height}
      x={canvas.viewport.position.x}
      y={canvas.viewport.position.y}
      draggable
      onDragEnd={handleDragEnd}
    >
      <Layer />
    </Stage>
  )
}
