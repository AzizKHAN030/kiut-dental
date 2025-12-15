import { defineType, defineField } from 'sanity';

export const footer = defineType({
  name: 'footer',
  title: 'Footer',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Main footer title (e.g., company name).',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 2,
      description: 'Footer subtitle or tagline.',
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'object',
      fields: [
        defineField({
          name: 'number',
          title: 'Phone Number',
          type: 'string',
          description: 'Phone number (e.g., +998 90 123 45 67)',
        }),
        defineField({
          name: 'href',
          title: 'Phone Link',
          type: 'string',
          description: 'tel: link (e.g., tel:+998901234567)',
        }),
        defineField({
          name: 'show',
          title: 'Show Phone Number',
          type: 'boolean',
          initialValue: true,
        }),
      ],
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'object',
      fields: [
        defineField({
          name: 'address',
          title: 'Email Address',
          type: 'string',
          description: 'Email address (e.g., info@kiutdental.com)',
        }),
        defineField({
          name: 'show',
          title: 'Show Email',
          type: 'boolean',
          initialValue: true,
        }),
      ],
    }),
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp',
      type: 'object',
      fields: [
        defineField({
          name: 'number',
          title: 'WhatsApp Number',
          type: 'string',
          description: 'WhatsApp number (e.g., +998 90 123 45 67)',
        }),
        defineField({
          name: 'href',
          title: 'WhatsApp Link',
          type: 'string',
          description: 'WhatsApp link (e.g., https://wa.me/998901234567)',
        }),
        defineField({
          name: 'show',
          title: 'Show WhatsApp',
          type: 'boolean',
          initialValue: true,
        }),
      ],
    }),
    defineField({
      name: 'telegram',
      title: 'Telegram',
      type: 'object',
      fields: [
        defineField({
          name: 'username',
          title: 'Telegram Username',
          type: 'string',
          description: 'Telegram username (e.g., @kiutdental or kiutdental)',
        }),
        defineField({
          name: 'href',
          title: 'Telegram Link',
          type: 'string',
          description: 'Telegram link (e.g., https://t.me/kiutdental)',
        }),
        defineField({
          name: 'show',
          title: 'Show Telegram',
          type: 'boolean',
          initialValue: true,
        }),
      ],
    }),
    defineField({
      name: 'facebook',
      title: 'Facebook',
      type: 'object',
      fields: [
        defineField({
          name: 'url',
          title: 'Facebook URL',
          type: 'url',
          description: 'Facebook page URL (e.g., https://facebook.com/kiutdental)',
        }),
        defineField({
          name: 'show',
          title: 'Show Facebook',
          type: 'boolean',
          initialValue: true,
        }),
      ],
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'object',
      fields: [
        defineField({
          name: 'text',
          title: 'Address Text',
          type: 'text',
          rows: 3,
          description: 'Physical address',
        }),
        defineField({
          name: 'show',
          title: 'Show Address',
          type: 'boolean',
          initialValue: true,
        }),
      ],
    }),
    defineField({
      name: 'googleMaps',
      title: 'Google Maps',
      type: 'object',
      fields: [
        defineField({
          name: 'show',
          title: 'Show Google Maps',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'iframeCode',
          title: 'Google Maps Iframe Code',
          type: 'text',
          rows: 4,
          description: 'Paste the full iframe embed code from Google Maps. You can get this by clicking "Share" → "Embed a map" on Google Maps.',
          validation: (Rule) => 
            Rule.custom((iframeCode, context) => {
              const parent = context.parent as any;
              if (parent?.show && !iframeCode) {
                return 'Iframe code is required when map is shown';
              }
              if (iframeCode && !iframeCode.includes('<iframe')) {
                return 'Please paste the complete iframe code including <iframe> tags';
              }
              return true;
            }),
        }),
      ],
    }),
  ],
});
