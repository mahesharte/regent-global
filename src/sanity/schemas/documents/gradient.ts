import { DocumentsIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

import { Prepare } from '../../types/utils';

export default defineType({
  type: 'document',
  name: 'gradient',
  title: 'Gradients',
  icon: DocumentsIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Enter a description for this gradient',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'colors',
      title: 'Colors',
      type: 'array',
      of: [
        {
          type: 'color',
        },
      ],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare: ({ title }: Prepare) => ({
      title,
      subtitle: 'Gradient',
    }),
  },
});
