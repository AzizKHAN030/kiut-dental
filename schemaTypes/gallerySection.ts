import { defineType, defineField } from 'sanity';

export const gallerySection = defineType({
  name: 'gallerySection',
  title: 'Gallery Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Section title',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Section subtitle',
      type: 'text',
    }),
    defineField({
      name: 'images',
      title: 'Gallery images',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'galleryImage',
          title: 'Gallery Image',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required(),
              fields: [
                defineField({
                  name: 'alt',
                  title: 'Alt text',
                  type: 'string',
                  description: 'Important for SEO and accessibility',
                }),
              ],
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
              media: 'image',
            },
          },
        },
      ],
    }),
  ],
});
