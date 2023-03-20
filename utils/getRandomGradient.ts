import { LIST_BACKGROUNDS_GRADIENTS } from 'global/constants'

export const getRandomGradient = () => {
  const randomIndex = Math.floor(Math.random() * LIST_BACKGROUNDS_GRADIENTS.length)
  return LIST_BACKGROUNDS_GRADIENTS[randomIndex]
}
