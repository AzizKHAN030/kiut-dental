import { defineType, defineField } from 'sanity';

export const processSection = defineType({
  name: 'processSection',
  title: 'Process / Steps Section',
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
