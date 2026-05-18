import { defineCollection, defineContentConfig, z } from '@nuxt/content'

const createBaseSchema = () => z.object({
  title: z.string(),
  description: z.string()
})

const createButtonSchema = () => z.object({
  label: z.string(),
  icon: z.string().optional(),
  leadingIcon: z.string().optional(),
  trailingIcon: z.string().optional(),
  to: z.string().optional(),
  color: z.enum(['primary', 'neutral', 'success', 'warning', 'error', 'info']).optional(),
  size: z.enum(['xs', 'sm', 'md', 'lg', 'xl']).optional(),
  variant: z.enum(['solid', 'outline', 'subtle', 'soft', 'ghost', 'link']).optional(),
  target: z.enum(['_blank', '_self']).optional()
})

const createImageSchema = () => z.object({
  src: z.string().editor({ input: 'media' }),
  alt: z.string()
})

const createAuthorSchema = () => z.object({
  name: z.string(),
  description: z.string().optional(),
  username: z.string().optional(),
  twitter: z.string().optional(),
  to: z.string().optional(),
  avatar: createImageSchema().optional()
})

const createTestimonialSchema = () => z.object({
  quote: z.string(),
  author: createAuthorSchema()
})

export default defineContentConfig({
  collections: {
    home: defineCollection({
      type: 'page',
      source: 'home.yml',
      schema: z.object({
        hero: z.object({
          links: z.array(createButtonSchema()),
          images: z.array(createImageSchema()).optional()
        }),
        about: createBaseSchema(),
        experience: createBaseSchema().extend({
          items: z.array(z.object({
            date: z.string(),
            position: z.string(),
            company: z.object({
              name: z.string(),
              url: z.string(),
              logo: z.string().editor({ input: 'icon' }),
              color: z.string()
            })
          }))
        }),
        testimonials: z.array(createTestimonialSchema()),
        blog: createBaseSchema(),
        faq: createBaseSchema().extend({
          categories: z.array(
            z.object({
              title: z.string().nonempty(),
              questions: z.array(
                z.object({
                  label: z.string().nonempty(),
                  content: z.string().nonempty(),
                  icon: z.string().optional().editor({ input: 'icon' })
                })
              )
            }))
        })
      })
    }),
    blog: defineCollection({
      type: 'page',
      source: 'blog/**/*.md',
      schema: z.object({
        minRead: z.number().optional(),
        date: z.date(),
        image: z.string().optional().editor({ input: 'media' }),
        author: createAuthorSchema(),
        category: z.enum(['article', 'case-study', 'side-project']).default('article'),
        client: z.string().optional(),
        year: z.number().optional(),
        pillar: z.string().optional(),
        type: z.enum(['rescue', 'greenfield', 'side-project']).optional(),
        stack: z.array(z.string()).optional(),
        repoUrl: z.string().url().optional(),
        team_size: z.number().optional(),
        role: z.string().optional(),
        outcome_headline: z.string().optional(),
        featured: z.boolean().default(false),
        ogImage: z.string().optional()
      })
    }),
    pages: defineCollection({
      type: 'page',
      source: [
        { include: 'about.md' },
        { include: 'blog.md' },
        { include: 'contact.md' },
        { include: 'now.md' },
        { include: 'uses.md' }
      ],
      schema: z.object({
        updated: z.date().optional(),
        ogImage: z.string().optional(),
        links: z.array(createButtonSchema()).optional()
      })
    })
  }
})
