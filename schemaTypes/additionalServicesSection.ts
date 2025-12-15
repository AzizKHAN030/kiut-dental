import { defineType, defineField } from 'sanity';

export const additionalServicesSection = defineType({
  name: 'additionalServicesSection',
  title: 'Additional Services Section',
  type: 'object',
  fields: [
    defineField({
      name: 'navLinkTitle',
      title: 'Navigation Link Title',
      type: 'string',
      description: 'Text to display in the navigation menu. Leave empty to hide from menu.',
    }),
    defineField({
      name: 'navLinkId',
      title: 'Navigation Link ID',
      type: 'string',
      description: 'Anchor ID for navigation. Should match the section ID on the page.',
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
      name: 'badgeText',
      title: 'Badge text',
      type: 'string',
      description: 'Text shown in the badge (e.g., "Complete Care Package")',
    }),
    defineField({
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'serviceItem',
          title: 'Service',
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
                }),
              ],
            }),
            defineField({
              name: 'iconBgColor',
              title: 'Icon background color',
              type: 'color',
              description: 'Background gradient color for the icon',
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
            defineField({
              name: 'included',
              title: 'Included in package',
              type: 'boolean',
              description: 'If true, shows "Included" badge. If false, shows "Available" badge.',
              initialValue: true,
            }),
          ],
          preview: {
            select: {
              title: 'title',
              included: 'included',
            },
            prepare({ title, included }) {
              return {
                title: title || 'Unnamed service',
                subtitle: included ? '✓ Included' : 'Available',
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: 'infoCards',
      title: 'Info cards',
      type: 'array',
      description: 'Featured cards displayed below the services',
      of: [
        {
          type: 'object',
          name: 'infoCard',
          title: 'Info Card',
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
            defineField({
              name: 'bgColor',
              title: 'Background gradient color',
              type: 'color',
              description: 'Start color for the gradient background',
            }),
          ],
          preview: {
            select: {
              title: 'title',
            },
          },
        },
      ],
      validation: (Rule) => Rule.max(2),
    }),
  ],
});

