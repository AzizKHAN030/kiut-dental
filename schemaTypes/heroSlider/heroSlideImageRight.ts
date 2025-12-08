import { defineType, defineField } from 'sanity';

export const heroSlideImageRight = defineType({
  name: 'heroSlideImageRight',
  title: 'Hero slide – image right',
  type: 'object',
  fields: [
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Small label above the heading, e.g. "Premium Dental Care from Uzbekistan".',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body text',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'primaryCtaLabel',
      title: 'Primary CTA label',
      type: 'string',
    }),
    defineField({
      name: 'primaryCtaHref',
      title: 'Primary CTA link',
      type: 'string',
    }),
    defineField({
      name: 'secondaryCtaLabel',
      title: 'Secondary CTA label',
      type: 'string',
    }),
    defineField({
      name: 'secondaryCtaHref',
      title: 'Secondary CTA link',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Main image',
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
    defineField({
      name: 'stats',
      title: 'Stats (under hero)',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'heroStat',
          title: 'Stat',
          fields: [
            defineField({ name: 'value', title: 'Value', type: 'string' }), // e.g. "70%"
            defineField({ name: 'label', title: 'Label', type: 'string' }), // e.g. "Cost savings"
          ],
        },
      ],
    }),
    defineField({
      name: 'badgeTitle',
      title: 'Badge title',
      type: 'string',
      description: 'e.g. "ISO Certified". Shown on the small card on the image.',
    }),
    defineField({
      name: 'badgeSubtitle',
      title: 'Badge subtitle',
      type: 'string',
      description: 'e.g. "International Standards".',
    }),
  ],
});
