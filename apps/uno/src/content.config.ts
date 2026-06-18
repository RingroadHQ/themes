import { defineCollection, z } from "astro:content";

const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default("elora"),
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
    seo: z
      .object({
        title: z.string().optional(),
        description: z.string().optional(),
      })
      .optional(),
  }),
});

const pagesCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    seo: z
      .object({
        title: z.string().optional(),
        description: z.string().optional(),
      })
      .optional(),
  }),
});

export const collections = {
  blog: blogCollection,
  pages: pagesCollection,
};
