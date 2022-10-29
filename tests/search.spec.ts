import { test, expect } from '@playwright/test'
import { api } from 'data/api'

const { describe, beforeEach } = test

const PAGE = 'frontend'

describe('tests for category page', () => {
  beforeEach(async ({ page }) => {
    await page.goto(`http://localhost:3000/category/${PAGE}`)
  })

  test('should display title with search form and categories', async ({ page }) => {
    // TODO: Get this from categories file
    const TOTAL_CATEGORIES = 8
    // Display correct title
    const title = page.locator('h1')
    await expect(title).toHaveText(`${PAGE}`)
    // Checking if there are all categories
    const categoriesList = page.locator('ul:first-child > li')
    await expect(categoriesList).toHaveCount(TOTAL_CATEGORIES)
    // Checking whether there is a search form
    const inputLocator = page.locator('input[type="search"]')
    await expect(inputLocator).toBeVisible()
  })

  test('fill input with wrong query and should display there is no results', async ({ page }) => {
    const QUERY = 'whateverquery'
    const ERROR_MESSAGE = `No se encontraron resultados para ${QUERY}. Sin embargo, puedes agregarlos contribuyendo al 🚀 repositorio 😊.`

    // Filling input with QUERY's value
    const inputLocator = page.locator('input[type="search"]')
    await inputLocator.fill(QUERY)

    // Getting locator "p" which has a span inside and checking against ERROR_MESSAGE
    const errorMessageLocator = page.locator('p', {
      has: page.locator('span')
    })
    await expect(errorMessageLocator).toHaveText(ERROR_MESSAGE)
  })

  test('fill input with query and should display results', async ({ page }) => {
    const queryId = 'mi'

    // Filling input with QUERY's value
    const inputLocator = page.locator('input[type="search"]')
    await inputLocator.fill(queryId)

    // Fetching data
    const response = await api.search(PAGE, queryId)

    // Checking the results with their names and descriptions
    let nameSelector = null,
      descSelector = null

    for (const item of response) {
      const { name, description } = item
      nameSelector = await page.isVisible(`text=${name}`)
      expect(nameSelector).toBeTruthy()
      descSelector = await page.isVisible(`text=${description}`)
      expect(descSelector).toBeTruthy()
    }
  })
})
