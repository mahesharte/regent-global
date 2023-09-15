import { DocumentsIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export default defineType({
  type: 'document',
  name: 'header',
  title: 'Header',
  icon: DocumentsIcon,
  fields: [
    defineField({
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {
              type: 'link',
              title: 'Link',
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({
      title: 'Header',
    }),
  },
});
