import { defineType, defineField } from 'sanity';

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL-friendly version of the title. Click "Generate" to auto-create from title. If left empty, it will be auto-generated from the title when you publish.',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: (input: string) =>
          input
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '')
            .slice(0, 96),
      },
      // Optional - users can manually enter or use the Generate button
      // For auto-generation on publish, we'll handle it in the frontend or via a simpler approach
    }),
    defineField({
      name: 'locale',
      title: 'Locale',
      type: 'reference',
      to: [{ type: 'locale' }],
      options: {
        filter: 'isActive == true',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'object',
      fields: [
        defineField({
          name: 'name',
          title: 'Name',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
          options: {
            hotspot: true,
          },
        }),
      ],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      description: 'Optional. If not provided, a placeholder will be shown.',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'Short description for blog listing (max ~200 chars)',
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'categories',
      title: 'Categories / Treatments',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'treatment' }],
        },
      ],
      options: {
        filter: 'isActive == true',
      },
      description: 'Select treatments/categories related to this blog post',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
        },
        {
          type: 'image',
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Post',
      type: 'boolean',
      description: 'Show this post in featured section',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'featuredImage',
      publishedAt: 'publishedAt',
    },
    prepare({ title, author, media, publishedAt }) {
      return {
        title,
        subtitle: author && publishedAt
          ? `By ${author} • ${new Date(publishedAt).toLocaleDateString()}`
          : author || publishedAt,
        media,
      };
    },
  },
  orderings: [
    {
      title: 'Published Date, New',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Published Date, Old',
      name: 'publishedAtAsc',
      by: [{ field: 'publishedAt', direction: 'asc' }],
    },
  ],
});

