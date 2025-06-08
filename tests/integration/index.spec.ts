import { test, expect } from '@playwright/test'

test.describe('index.html', () => {
  test.beforeEach(async ({ page }) => {
    // Log any console errors
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        console.error('Browser console error:', msg.text())
      }
    })

    await page.goto('/')
  })

  test('should have proper DOCTYPE', async ({ page }) => {
    const doctype = await page.evaluate(() => {
      const node = document.doctype
      if (!node) return null
      return `<!DOCTYPE ${node.name}>`
    })

    expect(doctype).toBe('<!DOCTYPE html>')
  })

  test('should have html element with lang attribute', async ({ page }) => {
    const htmlLang = await page.evaluate(() => {
      return document.documentElement.lang
    })

    expect(htmlLang).toBe('en')
  })

  test('should have charset meta tag', async ({ page }) => {
    const charset = await page.evaluate(() => {
      const meta = document.querySelector('meta[charset]')
      return meta?.getAttribute('charset')
    })

    expect(charset).toBe('UTF-8')
  })

  test('should have viewport meta tag for responsive design', async ({
    page,
  }) => {
    const viewport = await page.evaluate(() => {
      const meta = document.querySelector('meta[name="viewport"]')
      return meta?.getAttribute('content')
    })

    expect(viewport).toBe('width=device-width, initial-scale=1.0')
  })

  test('should have title element', async ({ page }) => {
    const title = await page.title()

    expect(title).toBe('JamJam')
  })

  test('should have root div element with id', async ({ page }) => {
    const rootElement = await page.evaluate(() => {
      const root = document.getElementById('root')
      return root?.tagName
    })

    expect(rootElement).toBe('DIV')
  })

  test('should have script tag with module type', async ({ page }) => {
    const hasMainScript = await page.evaluate(() => {
      const scripts = Array.from(
        document.querySelectorAll('script[type="module"]')
      )
      return scripts.some((script) => {
        const src = script.getAttribute('src')
        return src && src.includes('main.tsx')
      })
    })

    expect(hasMainScript).toBe(true)
  })

  test('should render content inside root element', async ({ page }) => {
    // Wait a bit for React to mount
    await page.waitForTimeout(100)

    const rootHasContent = await page.evaluate(() => {
      const root = document.getElementById('root')
      return root !== null && root.children.length > 0
    })

    expect(rootHasContent).toBe(true)
  })
})
