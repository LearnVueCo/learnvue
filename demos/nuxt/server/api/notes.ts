import { serverSupabaseUser } from '#supabase/server'

const data = [
  { id: 0, email: 'matt@learnvue.co', content: 'My note 1' },
  { id: 1, email: 'matt@learnvue.co', content: 'Secret stuff' },
  { id: 2, email: 'matt@learnvue.co', content: 'Do not share with not matt' },
  { id: 3, email: 'notmatt@learnvue.co', content: 'Account #2' },
  { id: 4, email: 'notmatt@learnvue.co', content: 'mores tuff' },
]

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  if (!user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }
  return data.filter((note) => note.email === user.email)
})
