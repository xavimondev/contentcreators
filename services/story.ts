export const saveLastStoryIndexSeen = async (creatorId: string, lastIndexStorySeen: number) => {
  const response = await fetch(`/api/story`, {
    method: 'POST',
    body: JSON.stringify({
      creatorId,
      lastIndexStorySeen
    }),
    headers: {
      'Content-type': 'application/json'
    }
  })
  const result = await response.json()
  return result
}

export const getLastStoryIndexSeenByCreator = async (creatorId: string) => {
  const response = await fetch(`/api/story/?creatorId=${creatorId}`)
  const result = await response.json()
  return result
}
