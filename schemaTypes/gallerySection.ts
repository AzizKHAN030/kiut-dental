import { defineType, defineField } from 'sanity';

export const gallerySection = defineType({
  name: 'gallerySection',
  title: 'Gallery Section',
  type: 'object',
  fields: [
    defineField({
      name: 'navLinkTitle',
      title: 'Navigation Link Title',
      type: 'string',
      description: 'Text to display in the navigation menu (e.g., "Gallery"). Leave empty to hide from menu.',
    }),
    defineField({
      name: 'navLinkId',
      title: 'Navigation Link ID',
      type: 'string',
      description: 'Anchor ID for navigation (e.g., "gallery"). Should match the section ID on the page.',
      initialValue: 'gallery',
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
      description: 'Show this section on the page. Uncheck to hide it.',
    }),
    defineField({
      name: 'includeInNavbar',
      title: 'Include in Navigation',
      type: 'boolean',
      initialValue: true,
      description: 'Include this section in the navigation menu. Uncheck to hide from menu.',
    }),
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
