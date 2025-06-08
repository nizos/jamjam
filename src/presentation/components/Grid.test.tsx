import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { Stage, Layer } from 'react-konva'
import { Grid } from './Grid'
import type { GridProps } from './Grid'
import Konva from 'konva'
import { setupKonvaContainer } from '../../test/utils/konva'

describe('Grid', () => {
  it('should render a grid pattern', () => {
    const { lineCount } = setupGrid()

    // A grid should have multiple lines
    expect(lineCount).toBeGreaterThan(4)
  })

  it('should render more lines with smaller grid size', () => {
    const { lineCount: smallGrid } = setupGrid({
      width: 100,
      height: 100,
      size: 10,
    })
    const { lineCount: largeGrid } = setupGrid({
      width: 100,
      height: 100,
      size: 50,
    })

    expect(smallGrid).toBeGreaterThan(largeGrid)
  })

  it('should render lines for the specified dimensions', () => {
    const width = 200
    const height = 100
    const size = 50

    const { lineCount } = setupGrid({ width, height, size })

    // Expected: 5 horizontal lines (0, 50, 100) + 5 vertical lines (0, 50, 100, 150, 200)
    const expectedHorizontal = Math.floor(height / size) + 1
    const expectedVertical = Math.floor(width / size) + 1
    const expectedTotal = expectedHorizontal + expectedVertical

    expect(lineCount).toBe(expectedTotal)
  })

  it('should render fewer lines when zoomed in', () => {
    const { lineCount: normalZoom } = setupGrid({
      width: 100,
      height: 100,
      size: 20,
      zoom: 1,
    })
    const { lineCount: zoomedIn } = setupGrid({
      width: 100,
      height: 100,
      size: 20,
      zoom: 2,
    })

    // When zoomed in, we see less of the world, so fewer grid lines
    expect(zoomedIn).toBeLessThan(normalZoom)
  })

  it('should render grid lines for negative coordinates when offset', () => {
    const { lines } = setupGrid({
      width: 100,
      height: 100,
      size: 20,
      offsetX: 50,
      offsetY: 50,
      zoom: 1,
    })

    // With offset (50, 50), we're looking at the negative world coordinates
    const hasNegativeCoordinateLine = lines.some((node: Konva.Node) => {
      if (node instanceof Konva.Line) {
        const points = node.points()
        return points[0] < 0 || points[1] < 0
      }
      return false
    })

    expect(hasNegativeCoordinateLine).toBe(true)
  })
})

function setupGrid(props?: Partial<GridProps>) {
  const width = props?.width ?? 800
  const height = props?.height ?? 600

  setupKonvaContainer(width, height)

  render(
    <Stage width={width} height={height}>
      <Layer>
        <Grid {...props} />
      </Layer>
    </Stage>
  )

  const stage = Konva.stages[Konva.stages.length - 1]
  const layer = stage.getLayers()[0]
  const lines = layer.find('Line')

  return {
    lines,
    lineCount: lines.length,
  }
}
