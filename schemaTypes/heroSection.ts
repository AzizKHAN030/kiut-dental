import { defineType, defineField } from 'sanity';

export const heroSection = defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'object',
  fields: [
    defineField({
      name: 'navLinkTitle',
      title: 'Navigation Link Title',
      type: 'string',
      description: 'Text to display in the navigation menu (e.g., "Home"). Leave empty to hide from menu.',
    }),
    defineField({
      name: 'navLinkId',
      title: 'Navigation Link ID',
      type: 'string',
      description: 'Anchor ID for navigation (e.g., "home"). Should match the section ID on the page.',
      initialValue: 'home',
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
      name: 'displayMode',
      title: 'Display mode',
      type: 'string',
      initialValue: 'single',
      options: {
        list: [
          { title: 'Single hero (no slider)', value: 'single' },
          { title: 'Slider (multiple slides)', value: 'slider' },
        ],
        layout: 'radio',
      },
      description:
        'If set to "single", frontend can hide slider controls even if there are multiple slides.',
    }),
    defineField({
      name: 'autoplay',
      title: 'Autoplay',
      type: 'boolean',
      initialValue: false,
      description: 'Enable automatic slide transitions (only applies when display mode is "Slider")',
      hidden: ({ parent }) => parent?.displayMode !== 'slider',
    }),
    defineField({
      name: 'autoplayInterval',
      title: 'Autoplay Interval (seconds)',
      type: 'number',
      initialValue: 5,
      validation: (Rule) => Rule.min(2).max(30),
      description: 'Time in seconds between automatic slide transitions',
      hidden: ({ parent }) => parent?.displayMode !== 'slider' || !parent?.autoplay,
    }),
    defineField({
      name: 'slides',
      title: 'Slides',
      type: 'array',
      of: [
        { type: 'heroSlideImageLeft' },
        { type: 'heroSlideImageRight' },
        { type: 'heroSlideBackground' },
        { type: 'heroSlideImageBanner' },
      ],
      validation: (Rule) => Rule.min(1),
      options: {
        insertMenu: {
          views: [
            {
              name: 'grid',
              previewImageUrl: (schemaType) =>
                `/static/block-previews/hero/${schemaType}.png`,
            },
          ],
        },
      },
    }),
  ],
});
