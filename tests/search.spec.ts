import { test, expect } from '@playwright/test'
import { api } from '../data/api'
import { getLocator, MOCK_LIST_CATEGORIES } from './utils'

const { describe, beforeEach } = test

const PAGE_NAME = 'frontend'

describe('tests for category page', () => {
  beforeEach(async ({ page }) => {
    await page.goto(`http://localhost:3000/category/${PAGE_NAME}`)
  })

  test('should display search form', async ({ page }) => {
    // Checking whether there is a search form
    const inputLocator = getLocator(page, 'input[type="search"]')
    await expect(inputLocator).toBeVisible()
  })

  test('should display nav with categories', async ({ page }) => {
    const TOTAL_CATEGORIES = MOCK_LIST_CATEGORIES.length
    // Checking if nav is visible
    const nav = getLocator(page, 'nav')
    await expect(nav).toBeVisible()
    // Checking if there are all categories
    const listCategories = getLocator(page, 'nav > div > div:nth-child(2) > a')
    const totalCategories = await listCategories.count()
    expect(totalCategories).toBe(TOTAL_CATEGORIES)
  })

  test('fill input with wrong query and should display there are no results', async ({ page }) => {
    const QUERY = 'whateverquery'
    const ERROR_MESSAGE = `No se encontraron resultados para ${QUERY}. Sin embargo, puedes agregarlos contribuyendo al 🚀 repositorio 😊.`

    // Filling input with QUERY's value
    const inputLocator = getLocator(page, 'input[type="search"]')
    await inputLocator.fill(QUERY)

    // Getting locator "p" which has a span inside and checking against ERROR_MESSAGE
    const errorMessageLocator = page.locator('p', {
      has: getLocator(page, 'span')
    })
    await expect(errorMessageLocator).toHaveText(ERROR_MESSAGE)
  })

  test('fill input with query and should display results', async ({ page }) => {
    const queryId = 'mi'

    // Filling input with QUERY's value
    const inputLocator = getLocator(page, 'input[type="search"]')
    await inputLocator.fill(queryId)

    // Fetching data
    const response = await api.search(PAGE_NAME, queryId)

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
