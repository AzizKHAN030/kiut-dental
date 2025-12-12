import { defineType, defineField } from 'sanity';

export const heroSection = defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'object',
  fields: [
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
