import { Page } from '@playwright/test'

export const getLocator = (page: Page, locator: string) => {
  return page.locator(locator)
}

export const MOCK_LIST_CATEGORIES = [
  {
    id: 'all',
    name: 'Todos',
    image: '',
    colorFrom: '#9749bb',
    colorTo: '#cb8fd5'
  },
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
    name: 'Móvil',
    image: '',
    colorFrom: '#7debf2',
    colorTo: '#85b5f6'
  },
  {
    id: 'database',
    name: 'Base Datos',
    image: '',
    colorFrom: '#a887f5',
    colorTo: '#efb67b'
  },
  {
    id: 'datascience',
    name: 'Ciencia Datos',
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
