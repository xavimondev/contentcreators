import { create } from 'zustand'

import { CreatorStory } from 'types'

type AppGeneralStore = {
  isModalStoryOpen: boolean
  setIsModalStoryOpen: (isModalOpen: boolean) => void
  listStories: CreatorStory[]
  setListStories: (stories: CreatorStory[]) => void
}

export const useStore = create<AppGeneralStore>()((set) => ({
  isModalStoryOpen: false,
  setIsModalStoryOpen: (isModalOpen: boolean) => set({ isModalStoryOpen: isModalOpen }),
  listStories: [],
  setListStories: (stories: CreatorStory[]) => set({ listStories: stories })
}))
