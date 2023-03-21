import { create } from 'zustand'

import type { Story } from 'react-insta-stories/dist/interfaces'

type AppGeneralStore = {
  isModalStoryOpen: boolean
  setIsModalStoryOpen: (isModalOpen: boolean) => void
  listStories: Story[]
  setListStories: (stories: Story[]) => void
  lastStoryIndex: number
  setLastStoryIndex: (lastStoryIndex: number) => void
}

export const useStore = create<AppGeneralStore>()((set) => ({
  isModalStoryOpen: false,
  setIsModalStoryOpen: (isModalOpen: boolean) => set({ isModalStoryOpen: isModalOpen }),
  listStories: [],
  setListStories: (stories: Story[]) => set({ listStories: stories }),
  lastStoryIndex: 0,
  setLastStoryIndex: (lastStoryIndex: number) => set({ lastStoryIndex })
}))
