/**
 * Sets up the DOM environment for Konva tests by mocking container dimensions
 */
export function setupKonvaContainer(width = 800, height = 600) {
  Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
    configurable: true,
    value: width,
  })
  Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
    configurable: true,
    value: height,
  })
}
