import { defineType, defineField } from 'sanity';

export const processSection = defineType({
  name: 'processSection',
  title: 'Process / Steps Section',
  type: 'object',
  fields: [
    defineField({
      name: 'navLinkTitle',
      title: 'Navigation Link Title',
      type: 'string',
      description: 'Text to display in the navigation menu (e.g., "Process"). Leave empty to hide from menu.',
    }),
    defineField({
      name: 'navLinkId',
      title: 'Navigation Link ID',
      type: 'string',
      description: 'Anchor ID for navigation (e.g., "process"). Should match the section ID on the page.',
      initialValue: 'process',
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
      name: 'steps',
      title: 'Steps',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'processStep',
          title: 'Step',
          fields: [
            defineField({
              name: 'title',
              title: 'Step title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Step description',
              type: 'text',
            }),
            defineField({
                name: 'icon',
                title: 'Icon image',
                type: 'image',
                options: {
                  hotspot: true,
                },
                fields: [
                  defineField({
                    name: 'alt',
                    title: 'Alt text',
                    type: 'string',
                    description: 'Describe the icon for accessibility / SEO',
                  }),
                ],
              }),
          ],
        },
      ],
    }),
  ],
});
