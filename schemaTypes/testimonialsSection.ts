import { defineType, defineField } from 'sanity';

export const testimonialsSection = defineType({
  name: 'testimonialsSection',
  title: 'Testimonials Section',
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
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'testimonial',
          title: 'Testimonial',
          fields: [
            defineField({
              name: 'name',
              title: 'Patient name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'country',
              title: 'Country',
              type: 'string',
              validation: (Rule) => Rule.required(),
              description: 'e.g. "United Kingdom", "United States", "Germany"',
            }),
            defineField({
              name: 'treatment',
              title: 'Treatment received (optional)',
              type: 'reference',
              to: [{ type: 'treatment' }],
              options: {
                filter: 'isActive == true',
              },
              description: 'Optional. Select the treatment this patient received.',
            }),
            defineField({
              name: 'rating',
              title: 'Rating',
              type: 'number',
              validation: (Rule) => Rule.required().min(1).max(5).integer(),
              description: 'Rating from 1 to 5 stars',
              initialValue: 5,
            }),
            defineField({
              name: 'text',
              title: 'Testimonial text',
              type: 'text',
              validation: (Rule) => Rule.required(),
              rows: 4,
            }),
            defineField({
              name: 'image',
              title: 'Patient photo (optional)',
              type: 'image',
              options: {
                hotspot: true,
              },
              description: 'Optional patient photo. If not provided, will show initial letter.',
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
              title: 'name',
              subtitle: 'country',
              rating: 'rating',
              treatmentName: 'treatment.name',
            },
            prepare({ title, subtitle, rating, treatmentName }) {
              return {
                title: title || 'Unnamed patient',
                subtitle: `${subtitle || ''} • ${rating || 0}⭐ • ${treatmentName || 'No treatment'}`,
              };
            },
          },
        },
      ],
    }),
  ],
});
