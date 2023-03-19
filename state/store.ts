import { create } from 'zustand'

type AppGeneralStore = {
  isModalStoryOpen: boolean
  setIsModalStoryOpen: (isModalOpen: boolean) => void
}

export const useStore = create<AppGeneralStore>()((set) => ({
  isModalStoryOpen: false,
  setIsModalStoryOpen: (isModalOpen: boolean) => set({ isModalStoryOpen: isModalOpen })
}))
