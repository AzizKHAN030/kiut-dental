import { defineType, defineField } from 'sanity';

export const treatment = defineType({
  name: 'treatment',
  title: 'Treatment',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Treatment name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'e.g. "Dental Implants", "Veneers", "Teeth Whitening"',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      description: 'URL-friendly identifier (auto-generated from name)',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Short description of the treatment (optional)',
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Only active treatments will appear in dropdowns',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'description',
      active: 'isActive',
    },
    prepare({ title, subtitle, active }) {
      return {
        title: title || 'Unnamed treatment',
        subtitle: subtitle ? `${subtitle}${!active ? ' (Inactive)' : ''}` : (!active ? '(Inactive)' : ''),
      };
    },
  },
  orderings: [
    {
      title: 'Name, A-Z',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
  ],
});
