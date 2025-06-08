import { Stage, Layer } from 'react-konva'

interface CanvasProps {
  width?: number
  height?: number
}

export function Canvas({ width = 800, height = 600 }: CanvasProps) {
  return (
    <Stage width={width} height={height}>
      <Layer />
    </Stage>
  )
}
