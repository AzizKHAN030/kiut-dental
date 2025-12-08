import { defineType, defineField } from 'sanity';

export const popularTreatmentsSection = defineType({
  name: 'popularTreatmentsSection',
  title: 'Popular Treatments Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Section title',
      type: 'string',
      description: 'e.g. "Popular treatments for international patients"',
    }),
    defineField({
      name: 'subtitle',
      title: 'Section subtitle',
      type: 'text',
    }),
    defineField({
      name: 'treatments',
      title: 'Treatments',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'treatmentCard',
          title: 'Treatment',
          fields: [
            defineField({
              name: 'name',
              title: 'Treatment name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'shortDescription',
              title: 'Short description',
              type: 'text',
              rows: 3,
            }),
            defineField({
              name: 'startingPrice',
              title: 'Starting price (text)',
              type: 'string',
              description:
                'e.g. "From $450 per implant" (we keep it text so you can include currency).',
            }),
            defineField({
              name: 'duration',
              title: 'Typical duration / visits',
              type: 'string',
              description: 'e.g. "2–3 visits over 7 days"',
            }),
            defineField({
              name: 'badge',
              title: 'Badge (optional)',
              type: 'string',
              description: 'e.g. "Most popular", "Best value"',
            }),
            defineField({
              name: 'image',
              title: 'Icon image',
              type: 'image',
              options: { hotspot: true },
              fields: [
                defineField({
                  name: 'alt',
                  title: 'Alt text',
                  type: 'string',
                }),
              ],
            }),
          ],
        },
      ],
    }),
  ],
});
