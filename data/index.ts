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
    color: 'from-[#42afa1] to-[#78d4a8]'
  },
  {
    id: 'backend',
    name: 'Backend',
    image: BackendImg,
    color: 'from-[#FBBA00] to-[#FF8714]'
  },
  {
    id: 'cloud',
    name: 'Cloud Computing',
    image: CloudImg,
    color: 'from-[#ffa585] to-[#ffeda0]'
  },
  {
    id: 'mobile',
    name: 'Mobile Development',
    image: MobileImg,
    color: 'from-[#7debf2] to-[#60a4ff]'
  },
  {
    id: 'database',
    name: 'Database',
    image: DatabaseImg,
    color: 'from-violet-500 to-orange-300'
  },
  {
    id: 'datascience',
    name: 'Data Science',
    image: DataScienceImg,
    color: 'from-[#a0dec3] to-[#3eadcf]'
  },
  {
    id: 'uiux',
    name: 'UI/UX',
    image: UiuxImg,
    color: 'from-[#d8848b] to-[#cb96da]'
  },
  {
    id: 'ciberseguridad',
    name: 'Ciberseguridad',
    image: CybersecurityImg,
    color: 'from-blue-700 to-gray-900'
  }
]
