import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    metaTitle: z.string(),
    metaDescription: z.string().max(160),
    excerpt: z.string(),
    date: z.string(),
    author: z.string().default('Équipe Le Panneau Solaire'),
    category: z.enum([
      'guide-pratique',
      'prix-financement',
      'technique',
      'rentabilite',
      'aides-subventions',
      'regional',
    ]),
    image: z.string(),
    readTime: z.string(),
    tags: z.array(z.string()).optional(),
    niche: z.string().default('panneaux-solaires'),
    language: z.string().default('fr'),
    relatedPosts: z.array(z.string()).optional(),
    faq: z
      .array(
        z.object({
          question: z.string(),
          answer: z.string(),
        })
      )
      .optional(),
  }),
});

export const collections = {
  blog: blogCollection,
};
