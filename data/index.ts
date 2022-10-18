import BackendImg from '../public/illutrations/backend.svg'
import FrontendImg from '../public/illutrations/frontend.svg'
import CloudImg from '../public/illutrations/cloud.svg'
import DatabaseImg from '../public/illutrations/database.svg'
import MobileImg from '../public/illutrations/mobile.svg'
import DataScienceImg from '../public/illutrations/data-science.svg'
import UiuxImg from '../public/illutrations/ui-ux.svg'
import CybersecurityImg from '../public/illutrations/cybersecurity.svg'

export const LIST_CATEGORIES = [
  {
    id: 'frontend',
    name: 'Frontend',
    image: FrontendImg,
    colorFrom: '#42afa1',
    colorTo: '#78d4a8'
  },
  {
    id: 'backend',
    name: 'Backend',
    image: BackendImg,
    colorFrom: '#FBBA00',
    colorTo: '#FF8714'
  },
  {
    id: 'cloud',
    name: 'Cloud',
    image: CloudImg,
    colorFrom: '#ffa585',
    colorTo: '#ffeda0'
  },
  {
    id: 'mobile',
    name: 'Mobile',
    image: MobileImg,
    colorFrom: '#7debf2',
    colorTo: '#60a4ff'
  },
  {
    id: 'database',
    name: 'Database',
    image: DatabaseImg,
    colorFrom: 'rgb(139 92 246)',
    colorTo: 'rgb(253 186 116)'
  },
  {
    id: 'datascience',
    name: 'Data Science',
    image: DataScienceImg,
    colorFrom: '#a0dec3',
    colorTo: '#3eadcf'
  },
  {
    id: 'uiux',
    name: 'UI/UX',
    image: UiuxImg,
    colorFrom: '#d8848b',
    colorTo: '#cb96da'
  },
  {
    id: 'ciberseguridad',
    name: 'Ciberseguridad',
    image: CybersecurityImg,
    colorFrom: 'rgb(48 83 180)',
    colorTo: 'rgb(119 142 191)'
  }
]
