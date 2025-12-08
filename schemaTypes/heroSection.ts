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
      name: 'slides',
      title: 'Slides',
      type: 'array',
      of: [
        { type: 'heroSlideImageLeft' },
        { type: 'heroSlideImageRight' },
        { type: 'heroSlideBackground' },
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
