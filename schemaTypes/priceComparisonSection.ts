import { defineType, defineField } from 'sanity';

export const priceComparisonSection = defineType({
  name: 'priceComparisonSection',
  title: 'Price Comparison Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Section title',
      type: 'string',
      description: 'e.g. "Price Comparison"',
    }),
    defineField({
      name: 'subtitle',
      title: 'Section subtitle',
      type: 'text',
      description: 'e.g. "See how much you can save with dental treatments in Uzbekistan"',
    }),
    defineField({
      name: 'countries',
      title: 'Countries',
      type: 'array',
      description: 'Select countries to compare prices. Order matters for table columns.',
      of: [
        {
          type: 'object',
          name: 'countryReference',
          title: 'Country',
          fields: [
            defineField({
              name: 'country',
              title: 'Country',
              type: 'reference',
              to: [{ type: 'country' }],
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'isHighlighted',
              title: 'Highlight this country',
              type: 'boolean',
              description: 'If true, this column will be highlighted (typically your country)',
              initialValue: false,
            }),
          ],
          preview: {
            select: {
              countryName: 'country.name',
              countryCode: 'country.code',
              countryFlag: 'country.flag',
              highlighted: 'isHighlighted',
            },
            prepare({ countryName, countryCode, countryFlag, highlighted }) {
              return {
                title: `${countryFlag ? countryFlag + ' ' : ''}${countryName || 'Select a country'}`,
                subtitle: `${countryCode || ''}${highlighted ? ' (Highlighted)' : ''}`,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: 'treatments',
      title: 'Treatments / Services',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'treatmentPrice',
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
              description: 'e.g. "Dental Implant (per tooth)", "Full Mouth Reconstruction"',
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
              name: 'prices',
              title: 'Prices by country',
              type: 'array',
              description: 'Add a price for each country. Select from the countries you created.',
              of: [
                {
                  type: 'object',
                  name: 'countryPrice',
                  title: 'Country Price',
                  fields: [
                    defineField({
                      name: 'country',
                      title: 'Country',
                      type: 'reference',
                      to: [{ type: 'country' }],
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'price',
                      title: 'Price',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                      description: 'e.g. "$3,500", "£2,500", "€2,000". The numeric value will be extracted automatically for calculations.',
                    }),
                  ],
                  preview: {
                    select: {
                      countryName: 'country.name',
                      countryFlag: 'country.flag',
                      price: 'price',
                    },
                    prepare({ countryName, countryFlag, price }) {
                      return {
                        title: `${countryFlag ? countryFlag + ' ' : ''}${countryName || 'Select country'}: ${price || 'No price'}`,
                      };
                    },
                  },
                },
              ],
            }),
          ],
          preview: {
            select: {
              treatmentName: 'treatment.name',
              customName: 'customName',
              nameSource: 'nameSource',
            },
            prepare({ treatmentName, customName, nameSource }) {
              const displayName = nameSource === 'predefined' ? treatmentName : customName;
              return {
                title: displayName || 'Unnamed treatment',
                subtitle: nameSource === 'predefined' ? 'Predefined' : 'Custom',
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: 'baseCountry',
      title: 'Base country for savings calculation',
      type: 'reference',
      to: [{ type: 'country' }],
      description: 'Country to use as base for "You Save" calculation (typically your highlighted country)',
    }),
    defineField({
      name: 'footerNotes',
      title: 'Footer notes',
      type: 'array',
      description: 'Add informational notes to display below the price comparison table',
      of: [
        {
          type: 'object',
          name: 'footerNote',
          title: 'Note',
          fields: [
            defineField({
              name: 'title',
              title: 'Note title',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Note description',
              type: 'text',
              rows: 3,
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
            },
            prepare({ title, subtitle }) {
              return {
                title: title || 'Untitled note',
                subtitle: subtitle ? subtitle.substring(0, 50) + '...' : '',
              };
            },
          },
        },
      ],
    }),
  ],
});

