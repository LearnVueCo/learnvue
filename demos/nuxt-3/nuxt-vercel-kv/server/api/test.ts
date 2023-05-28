export default defineEventHandler(async (event) => {
  const storage = useStorage('data')

  // get the existing count or default to 0
  const count = Number((await storage.getItem('count')) ?? 0)

  // store count + 1
  await storage.setItem('count', count + 1)

  // return the count
  return {
    count: await storage.getItem('count')
  }
})
