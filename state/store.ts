import { create } from 'zustand'

import type { Story } from 'react-insta-stories/dist/interfaces'
import type { Comment, Creator, User } from 'types'

type AppGeneralStore = {
  isModalStoryOpen: boolean
  setIsModalStoryOpen: (isModalOpen: boolean) => void
  listStories: Story[]
  setListStories: (stories: Story[]) => void
  lastStoryIndex: number
  setLastStoryIndex: (lastStoryIndex: number) => void
  listComments: Comment[]
  isLoadingComments: boolean
  setIsLoadingComments: (isLoadingComments: boolean) => void
  setListComments: (comments: Comment[]) => void
  addNewCommentToList: (comment: Comment) => void
  removeCommentFromList: (commentId: number) => void
  listCreators: Creator[]
  setListCreators: (creators: Creator[]) => void
  userSession: User | null
  setUserSession: (user: User | null) => void
}

export const useStore = create<AppGeneralStore>()((set, get) => ({
  isModalStoryOpen: false,
  setIsModalStoryOpen: (isModalOpen: boolean) => set({ isModalStoryOpen: isModalOpen }),
  listStories: [],
  setListStories: (stories: Story[]) => set({ listStories: stories }),
  lastStoryIndex: 0,
  setLastStoryIndex: (lastStoryIndex: number) => set({ lastStoryIndex }),
  isLoadingComments: true,
  setIsLoadingComments: (isLoadingComments: boolean) => set({ isLoadingComments }),
  listComments: [],
  setListComments: (listComments: Comment[]) => set({ listComments }),
  addNewCommentToList: (comment: Comment) =>
    set((prevComments) => ({ listComments: prevComments.listComments.concat(comment) })),
  removeCommentFromList: (commentId: number) => {
    const { listComments } = get()
    const comments = listComments.filter((comment) => comment.id !== commentId)
    set({ listComments: comments })
  },
  listCreators: [],
  setListCreators: (listCreators: Creator[]) => set({ listCreators }),
  userSession: null,
  setUserSession: (user: User | null) => set({ userSession: user })
}))
