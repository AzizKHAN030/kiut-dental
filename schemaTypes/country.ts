import { defineType, defineField } from 'sanity';

export const country = defineType({
  name: 'country',
  title: 'Country',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Country name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'e.g. "USA", "UK", "Uzbekistan"',
    }),
    defineField({
      name: 'code',
      title: 'Country code',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Unique identifier (lowercase, no spaces). e.g. "usa", "uk", "uzbekistan"',
    }),
    defineField({
      name: 'flag',
      title: 'Flag emoji (optional)',
      type: 'string',
      description: 'e.g. 🇺🇸, 🇬🇧, 🇺🇿',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'code',
      flag: 'flag',
    },
    prepare({ title, subtitle, flag }) {
      return {
        title: `${flag ? flag + ' ' : ''}${title}`,
        subtitle: subtitle,
      };
    },
  },
});
