import { test, expect } from '@playwright/test'
import { getLocator, MOCK_LIST_CATEGORIES } from './utils'

const { describe, beforeEach } = test

describe('tests for home page', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/')
  })

  test('index page has content.[creators] in title and introduction paragraph should not empty', async ({
    page
  }) => {
    const title = getLocator(page, 'h1')
    await expect(title).toHaveText('content.[creators]')
    // create a locator
    const paragraph = getLocator(page, 'p').first()
    // Expect paragraph has a value.
    await expect(paragraph).not.toBeEmpty()
  })

  test('index page should display all categories and each category should has its appropiate link', async ({
    page
  }) => {
    // Getting articles selectors inside categories section
    const locator = getLocator(page, 'section >> nth=1 >> article')
    const totalCategories = await locator.count()
    // It makes sure there's at least one category
    expect(totalCategories).toBeGreaterThan(0)

    let link = null
    // Checking whether each category has link
    for (let i = 0; i < totalCategories; i++) {
      link = locator.nth(i).locator('a')
      await expect(link).toHaveAttribute('href', `/category/${MOCK_LIST_CATEGORIES[i].id}`)
    }
  })
})
