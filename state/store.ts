import { create } from 'zustand'
import type { Creator } from 'types'

type AppGeneralStore = {
  listCreators: Creator[]
  setListCreators: (creators: Creator[]) => void
}

export const useStore = create<AppGeneralStore>()((set) => ({
  listCreators: [],
  setListCreators: (listCreators: Creator[]) => set({ listCreators })
}))
