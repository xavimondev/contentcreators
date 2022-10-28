import { test, expect } from '@playwright/test'

// Mockup data, in the future I should take data from categories file
const LIST_CATEGORIES = [
  {
    id: 'frontend',
    name: 'Frontend',
    image: '',
    colorFrom: '#34a193',
    colorTo: '#8ad4b1'
  },
  {
    id: 'backend',
    name: 'Backend',
    image: '',
    colorFrom: '#e8af0d',
    colorTo: '#FF8714'
  },
  {
    id: 'cloud',
    name: 'Cloud',
    image: '',
    colorFrom: '#e27750',
    colorTo: '#e4a981'
  },
  {
    id: 'mobile',
    name: 'Mobile',
    image: '',
    colorFrom: '#7debf2',
    colorTo: '#85b5f6'
  },
  {
    id: 'database',
    name: 'Database',
    image: '',
    colorFrom: '#a887f5',
    colorTo: '#efb67b'
  },
  {
    id: 'datascience',
    name: 'Data Science',
    image: '',
    colorFrom: '#637dc6',
    colorTo: '#44afd0'
  },
  {
    id: 'uiux',
    name: 'UI/UX',
    image: '',
    colorFrom: '#d8848b',
    colorTo: '#cb96da'
  },
  {
    id: 'ciberseguridad',
    name: 'Ciberseguridad',
    image: '',
    colorFrom: '#314b94',
    colorTo: '#5f7dbd'
  }
]
const { describe, beforeEach } = test

describe('tests for home page', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/')
  })

  test('index page has content.[creators] in title and introduction paragraph should not empty', async ({
    page
  }) => {
    const title = page.locator('h1')
    await expect(title).toHaveText('content.[creators]')
    // create a locator
    const paragraph = page.locator('p').first()
    // Expect paragraph has a value.
    await expect(paragraph).not.toBeEmpty()
  })

  test('index page should display all categories and each category should has its appropiate link', async ({
    page
  }) => {
    // Getting articles selectors inside categories section
    const locator = page.locator('section >> nth=1 >> article')
    const totalCategories = await locator.count()
    // It makes sure there's at least one category
    expect(totalCategories).toBeGreaterThan(0)

    let link = null
    // Checking whether each category has link
    for (let i = 0; i < totalCategories; i++) {
      link = locator.nth(i).locator('a')
      await expect(link).toHaveAttribute('href', `/category/${LIST_CATEGORIES[i].id}`)
    }
  })
})
