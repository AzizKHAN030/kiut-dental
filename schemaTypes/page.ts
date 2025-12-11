import { defineType, defineField } from 'sanity';

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'locale',
      title: 'Locale',
      type: 'string',
      options: {
        list: [
          { title: 'English', value: 'en' },
          { title: 'Russian', value: 'ru' },
        ],
        layout: 'radio',
      },
      initialValue: 'en',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
        name: 'sections',
        title: 'Sections',
        type: 'array',
        of: [
          { type: 'heroSection' },
          { type: 'featureCardsSection' },
          { type: 'popularTreatmentsSection' },
          { type: 'processSection' },
        ],
      }),
      defineField({
        name: 'seo',
        title: 'SEO',
        type: 'seo',
      }),
  ],
});
