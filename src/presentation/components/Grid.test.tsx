import { describe, it, expect, beforeEach } from 'vitest'
import { render } from '@testing-library/react'
import { Stage, Layer } from 'react-konva'
import { Grid } from './Grid'
import Konva from 'konva'
import { setupKonvaContainer } from '../../test/utils/konva'

describe('Grid', () => {
  let lines: Konva.Node[]
  let horizontalLines: Konva.Node[]
  let verticalLines: Konva.Node[]

  beforeEach(() => {
    ({ lines, horizontalLines, verticalLines } = setupGrid())
  })

  it('should render multiple horizontal lines', () => {
    expect(lines.length).toBeGreaterThan(1)
  })

  it('should render horizontal lines', () => {
    expect(horizontalLines.length).toBeGreaterThan(0)
  })

  it('should render vertical lines', () => {
    expect(verticalLines.length).toBeGreaterThan(0)
  })
})

function setupGrid() {
  setupKonvaContainer()

  render(
    <Stage width={800} height={600}>
      <Layer>
        <Grid />
      </Layer>
    </Stage>
  )

  const stage = Konva.stages[Konva.stages.length - 1]
  const layer = stage.getLayers()[0]
  const lines = layer.find('Line')

  const horizontalLines = lines.filter((line) => {
    const konvaLine = line as Konva.Line
    const points = konvaLine.points()
    return points[1] === points[3]
  })

  const verticalLines = lines.filter((line) => {
    const konvaLine = line as Konva.Line
    const points = konvaLine.points()
    return points[0] === points[2]
  })

  return {
    stage,
    layer,
    lines: Array.from(lines),
    horizontalLines: Array.from(horizontalLines),
    verticalLines: Array.from(verticalLines),
  }
}
