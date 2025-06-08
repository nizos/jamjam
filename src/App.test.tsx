import { describe, it, expect, beforeEach } from 'vitest'
import { render } from '@testing-library/react'
import App from './App'
import { setupKonvaContainer } from './test/utils/konva'

describe('App', () => {
  let container: HTMLElement
  let canvas: HTMLCanvasElement | null

  beforeEach(() => {
    ;({ container, canvas } = setupApp())
  })

  it('should render without crashing', () => {
    expect(container.firstChild).toBeTruthy()
  })

  it('should render a canvas element', () => {
    expect(canvas).toBeTruthy()
  })
})

function setupApp() {
  setupKonvaContainer()
  const { container } = render(<App />)
  const canvas = container.querySelector('canvas')

  return { container, canvas }
}
