import { defineType, defineField } from 'sanity';

export const featureCardsSection = defineType({
  name: 'featureCardsSection',
  title: 'Feature Cards Section',
  type: 'object',
  fields: [
    defineField({
      name: 'navLinkTitle',
      title: 'Navigation Link Title',
      type: 'string',
      description: 'Text to display in the navigation menu (e.g., "Benefits"). Leave empty to hide from menu.',
    }),
    defineField({
      name: 'navLinkId',
      title: 'Navigation Link ID',
      type: 'string',
      description: 'Anchor ID for navigation (e.g., "benefits"). Should match the section ID on the page.',
      initialValue: 'benefits',
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
      name: 'items',
      title: 'Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'featureCard',
          title: 'Feature card',
          fields: [
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
            defineField({
            name: 'iconBgColor',
            title: 'Icon background color',
            type: 'color',
            description: 'Background color behind the icon image',
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
            }),
            defineField({
              name: 'badge',
              title: 'Badge (optional)',
              type: 'string',
            }),
          ],
        },
      ],
    }),
  ],
});
