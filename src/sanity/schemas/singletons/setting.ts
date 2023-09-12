import { DocumentsIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export default defineType({
  type: 'document',
  name: 'setting',
  title: 'Settings',
  icon: DocumentsIcon,
  fields: [
    defineField({
      name: 'variables',
      title: 'Variables',
      type: 'array',
      of: [
        {
          type: 'keyValue',
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({
      title: 'Settings',
    }),
  },
});
