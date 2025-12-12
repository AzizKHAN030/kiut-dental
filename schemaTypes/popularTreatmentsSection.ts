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
              name: 'nameSource',
              title: 'Treatment name source',
              type: 'string',
              options: {
                list: [
                  { title: 'Use predefined treatment', value: 'predefined' },
                  { title: 'Enter custom name', value: 'custom' },
                ],
                layout: 'radio',
              },
              initialValue: 'predefined',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'treatment',
              title: 'Predefined treatment',
              type: 'reference',
              to: [{ type: 'treatment' }],
              options: {
                filter: 'isActive == true',
              },
              hidden: ({ parent }) => parent?.nameSource !== 'predefined',
              validation: (Rule) =>
                Rule.custom((value, context) => {
                  const parent = context.parent as any;
                  if (parent?.nameSource === 'predefined' && !value) {
                    return 'Please select a treatment';
                  }
                  return true;
                }),
            }),
            defineField({
              name: 'customName',
              title: 'Custom treatment name',
              type: 'string',
              description: 'e.g. "Teeth Whitening", "Dental Implant (per tooth)"',
              hidden: ({ parent }) => parent?.nameSource !== 'custom',
              validation: (Rule) =>
                Rule.custom((value, context) => {
                  const parent = context.parent as any;
                  if (parent?.nameSource === 'custom' && !value) {
                    return 'Please enter a treatment name';
                  }
                  return true;
                }),
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
          preview: {
            select: {
              treatmentName: 'treatment.name',
              customName: 'customName',
              nameSource: 'nameSource',
              startingPrice: 'startingPrice',
            },
            prepare({ treatmentName, customName, nameSource, startingPrice }) {
              const displayName = nameSource === 'predefined' ? treatmentName : customName;
              return {
                title: displayName || 'Unnamed treatment',
                subtitle: startingPrice ? `${startingPrice}${nameSource === 'predefined' ? ' • Predefined' : ' • Custom'}` : (nameSource === 'predefined' ? 'Predefined' : 'Custom'),
              };
            },
          },
        },
      ],
    }),
  ],
});
