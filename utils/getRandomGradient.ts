import { GradientColor } from 'types'

import { LIST_BACKGROUNDS_GRADIENTS } from 'global/constants'

export const getRandomGradient = (): GradientColor => {
  const randomIndex = Math.floor(Math.random() * LIST_BACKGROUNDS_GRADIENTS.length)
  return LIST_BACKGROUNDS_GRADIENTS[randomIndex]
}
