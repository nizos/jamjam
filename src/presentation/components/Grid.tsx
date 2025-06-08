import { Line } from 'react-konva'

interface GridProps {
  width?: number
  height?: number
  size?: number
}

export function Grid({ width = 800, height = 600, size = 20 }: GridProps) {
  const lines = []

  // Horizontal lines
  for (let y = 0; y <= height; y += size) {
    lines.push(
      <Line
        key={`h-${y}`}
        points={[0, y, width, y]}
        stroke="#e0e0e0"
        strokeWidth={1}
      />
    )
  }

  // Vertical lines
  for (let x = 0; x <= width; x += size) {
    lines.push(
      <Line
        key={`v-${x}`}
        points={[x, 0, x, height]}
        stroke="#e0e0e0"
        strokeWidth={1}
      />
    )
  }

  return <>{lines}</>
}
