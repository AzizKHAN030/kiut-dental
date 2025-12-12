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
      description: 'Enter the slug (e.g., "home"). The locale will be automatically appended when you publish (e.g., "home-en", "home-ru") to ensure uniqueness. You can also manually enter "home-en" or "home-ru".',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'locale',
      title: 'Locale',
      type: 'reference',
      to: [{ type: 'locale' }],
      options: {
        filter: 'isActive == true',
      },
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
          { type: 'priceComparisonSection' },
          { type: 'additionalServicesSection' },
          { type: 'processSection' },
          { type: 'gallerySection' },
          { type: 'testimonialsSection' },
        ],
      }),
      defineField({
        name: 'seo',
        title: 'SEO',
        type: 'seo',
      }),
  ],
});
