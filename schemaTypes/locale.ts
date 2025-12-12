import { defineType, defineField } from 'sanity';
import { FlagPicker } from './FlagPicker';

export const locale = defineType({
  name: 'locale',
  title: 'Locale',
  type: 'document',
  fields: [
    defineField({
      name: 'code',
      title: 'Locale Code',
      type: 'string',
      description: 'ISO 639-1 language code (e.g., "en", "ru", "uz", "de")',
      validation: (Rule) => 
        Rule.required()
          .min(2)
          .max(5)
          .regex(/^[a-z]{2}(-[A-Z]{2})?$/, {
            name: 'locale code',
            invert: false,
          })
          .error('Locale code must be a valid ISO 639-1 code (e.g., "en", "ru", "uz")'),
    }),
    defineField({
      name: 'name',
      title: 'Display Name',
      type: 'string',
      description: 'Display name for the locale (e.g., "English", "Русский", "O\'zbek")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'flag',
      title: 'Flag Emoji',
      type: 'string',
      description: 'Optional flag emoji for the locale. Click "Choose Flag" button to select from available flags.',
      validation: (Rule) => Rule.max(10),
      components: {
        input: FlagPicker,
      },
    }),
    defineField({
      name: 'isDefault',
      title: 'Default Locale',
      type: 'boolean',
      description: 'Set this as the default locale for the website',
      initialValue: false,
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Whether this locale is currently active and should be shown',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      code: 'code',
      name: 'name',
      flag: 'flag',
      isDefault: 'isDefault',
      isActive: 'isActive',
    },
    prepare({ code, name, flag, isDefault, isActive }) {
      return {
        title: `${flag || '🌐'} ${name || code}`,
        subtitle: `${code}${isDefault ? ' (Default)' : ''}${!isActive ? ' (Inactive)' : ''}`,
      };
    },
  },
  orderings: [
    {
      title: 'Default First',
      name: 'defaultFirst',
      by: [{ field: 'isDefault', direction: 'desc' }],
    },
    {
      title: 'Code',
      name: 'code',
      by: [{ field: 'code', direction: 'asc' }],
    },
  ],
});
