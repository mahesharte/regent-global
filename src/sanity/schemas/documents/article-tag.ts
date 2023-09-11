import { DocumentsIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

import { Prepare } from '../types';

export default defineType({
  type: 'document',
  name: 'articleTag',
  title: 'Article Tags',
  icon: DocumentsIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare: ({ title }: Prepare) => ({
      title,
      subtitle: 'Article Tag',
    }),
  },
});
