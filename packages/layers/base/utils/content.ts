/* eslint-disable no-redeclare */
import { z } from 'zod'

const ParsedContent = z
  .object({
    type: z.string(),
    children: z.array(z.any()),
    toc: z.object({
      title: z.string(),
      searchDepth: z.number(),
      depth: z.number(),
      links: z.array(z.any())
    })
  })
  .optional()

export const Content = z.object({
  _id: z.string(),
  _path: z.string(),
  _draft: z.boolean().optional(),
  title: z.string(),
  publishedDate: z.preprocess((s) => new Date(s as string), z.date()),
  updatedDate: z.preprocess((s) => new Date(s as string), z.date()).optional(),
  body: ParsedContent,
  cover: z.string(),
  description: z.string().max(200),
  category: z.string().optional(),
  excerpt: z.any()
})

export type Content = z.infer<typeof Content>

export const Tutorial = Content.merge(
  z.object({
    id: z.string().optional(),
    videoLink: z.string().optional()
  })
)

export type Tutorial = z.infer<typeof Tutorial>
