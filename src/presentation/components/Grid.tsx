import { Line } from 'react-konva'

export interface GridProps {
  width?: number
  height?: number
  size?: number
  offsetX?: number
  offsetY?: number
  zoom?: number
}

export function Grid({
  width = 800,
  height = 600,
  size = 20,
  offsetX = 0,
  offsetY = 0,
  zoom = 1,
}: GridProps) {
  const lines = []

  // Calculate the visible area in world coordinates
  // When panning right (positive viewport.x), we see more of the left side (negative world coords)
  const visibleLeft = -offsetX / zoom
  const visibleTop = -offsetY / zoom
  const visibleRight = visibleLeft + width / zoom
  const visibleBottom = visibleTop + height / zoom

  // Calculate grid line positions to cover the visible area
  const startX = Math.floor(visibleLeft / size) * size
  const endX = Math.ceil(visibleRight / size) * size
  const startY = Math.floor(visibleTop / size) * size
  const endY = Math.ceil(visibleBottom / size) * size

  // Horizontal lines
  for (let y = startY; y <= endY; y += size) {
    lines.push(
      <Line
        key={`h-${y}`}
        points={[startX, y, endX, y]}
        stroke="#e0e0e0"
        strokeWidth={1}
      />
    )
  }

  // Vertical lines
  for (let x = startX; x <= endX; x += size) {
    lines.push(
      <Line
        key={`v-${x}`}
        points={[x, startY, x, endY]}
        stroke="#e0e0e0"
        strokeWidth={1}
      />
    )
  }

  return <>{lines}</>
}
