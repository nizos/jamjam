import { Stage, Layer } from 'react-konva'
import { useCanvasStore } from '../../infrastructure/stores/CanvasStore'
import type Konva from 'konva'
import { Grid } from './Grid'
import { useState } from 'react'

interface CanvasProps {
  width?: number
  height?: number
  onPan?: (position: { x: number; y: number }) => void
  onZoom?: (event: {
    factor: number
    position: { x: number; y: number }
  }) => void
}

export function Canvas({
  width = 800,
  height = 600,
  onPan,
  onZoom,
}: CanvasProps) {
  const canvas = useCanvasStore((state) => state.canvas)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })

  const handleDragEnd = (e: Konva.KonvaEventObject<DragEvent>) => {
    if (onPan) {
      const stage = e.target as Konva.Stage
      const position = stage.position()
      onPan(position)
      setDragOffset({ x: 0, y: 0 })
    }
  }

  const handleDragMove = (e: Konva.KonvaEventObject<DragEvent>) => {
    const stage = e.target as Konva.Stage
    const position = stage.position()
    setDragOffset({
      x: position.x - canvas.viewport.position.x,
      y: position.y - canvas.viewport.position.y,
    })
  }

  const handleWheel = (e: Konva.KonvaEventObject<WheelEvent>) => {
    if (onZoom) {
      e.evt.preventDefault()
      const stage = e.target.getStage()
      if (!stage) return

      const scaleBy = 1.1
      const oldScale = stage.scaleX()

      const deltaY = e.evt.deltaY
      const newScale = deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy

      const pointer = stage.getPointerPosition() || { x: 0, y: 0 }

      onZoom({
        factor: newScale / oldScale,
        position: pointer,
      })
    }
  }

  return (
    <Stage
      width={width}
      height={height}
      x={canvas.viewport.position.x}
      y={canvas.viewport.position.y}
      scaleX={canvas.zoom}
      scaleY={canvas.zoom}
      draggable
      onDragEnd={handleDragEnd}
      onDragMove={handleDragMove}
      onWheel={handleWheel}
    >
      <Layer>
        <Grid
          width={width}
          height={height}
          offsetX={canvas.viewport.position.x + dragOffset.x}
          offsetY={canvas.viewport.position.y + dragOffset.y}
          zoom={canvas.zoom}
        />
      </Layer>
    </Stage>
  )
}
