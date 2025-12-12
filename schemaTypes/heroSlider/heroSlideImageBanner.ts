import { defineType, defineField } from 'sanity';

export const heroSlideImageBanner = defineType({
  name: 'heroSlideImageBanner',
  title: 'Hero slide – image banner',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Banner image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
        }),
      ],
      description: 'Full-width banner image. Recommended size: 1920x1080px.',
    }),
    defineField({
      name: 'overlay',
      title: 'Overlay darkness',
      type: 'string',
      initialValue: 'none',
      options: {
        list: [
          { title: 'None', value: 'none' },
          { title: 'Light (10%)', value: 'light' },
          { title: 'Medium (30%)', value: 'medium' },
          { title: 'Dark (50%)', value: 'dark' },
        ],
        layout: 'radio',
      },
      description: 'Add a dark overlay to make text more readable.',
    }),
    defineField({
      name: 'contentPosition',
      title: 'Content position',
      type: 'string',
      initialValue: 'center',
      options: {
        list: [
          { title: 'Top', value: 'top' },
          { title: 'Center', value: 'center' },
          { title: 'Bottom', value: 'bottom' },
        ],
        layout: 'radio',
      },
      description: 'Vertical position of CTA buttons.',
    }),
    defineField({
      name: 'primaryCtaLabel',
      title: 'Primary CTA label',
      type: 'string',
      description: 'Optional primary button (e.g., "Book Appointment").',
    }),
    defineField({
      name: 'primaryCtaHref',
      title: 'Primary CTA link',
      type: 'string',
      description: 'Link for primary button (e.g., "#contact").',
    }),
    defineField({
      name: 'secondaryCtaLabel',
      title: 'Secondary CTA label',
      type: 'string',
      description: 'Optional secondary button (e.g., "Learn More").',
    }),
    defineField({
      name: 'secondaryCtaHref',
      title: 'Secondary CTA link',
      type: 'string',
      description: 'Link for secondary button (e.g., "#services").',
    }),
  ],
  preview: {
    select: {
      title: 'primaryCtaLabel',
      media: 'image',
    },
    prepare({ title, media }) {
      return {
        title: title || 'Image Banner',
        subtitle: 'Full-width banner with optional CTAs',
        media,
      };
    },
  },
});
