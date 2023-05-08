export default defineEventHandler(async (event) => {
  const storage = useStorage('data')
  let count = Number((await storage.getItem('count')) ?? 0)
  await storage.setItem('count', count + 1)

  return {
    id: await storage.getItem('count')
  }
})
