import { Page } from '@playwright/test'

export const getLocator = (page: Page, locator: string) => {
  return page.locator(locator)
}
