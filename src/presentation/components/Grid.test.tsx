import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { Stage, Layer } from 'react-konva'
import { Grid } from './Grid'
import Konva from 'konva'
import { setupKonvaContainer } from '../../test/utils/konva'

describe('Grid', () => {
  it('should render a grid pattern', () => {
    const { lineCount } = setupGrid()

    // A grid should have multiple lines
    expect(lineCount).toBeGreaterThan(4)
  })

  it('should render more lines with smaller grid size', () => {
    const { lineCount: smallGrid } = setupGrid(100, 100, 10)
    const { lineCount: largeGrid } = setupGrid(100, 100, 50)

    expect(smallGrid).toBeGreaterThan(largeGrid)
  })

  it('should render lines for the specified dimensions', () => {
    const width = 200
    const height = 100
    const size = 50

    const { lineCount } = setupGrid(width, height, size)

    // Expected: 5 horizontal lines (0, 50, 100) + 5 vertical lines (0, 50, 100, 150, 200)
    const expectedHorizontal = Math.floor(height / size) + 1
    const expectedVertical = Math.floor(width / size) + 1
    const expectedTotal = expectedHorizontal + expectedVertical

    expect(lineCount).toBe(expectedTotal)
  })
})

function setupGrid(width = 800, height = 600, size = 20) {
  setupKonvaContainer(width, height)

  render(
    <Stage width={width} height={height}>
      <Layer>
        <Grid width={width} height={height} size={size} />
      </Layer>
    </Stage>
  )

  const stage = Konva.stages[Konva.stages.length - 1]
  const layer = stage.getLayers()[0]

  return {
    lineCount: layer.find('Line').length,
  }
}
