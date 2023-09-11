import { DocumentsIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

import { Prepare } from '../types';

export default defineType({
  type: 'document',
  name: 'person',
  title: 'People',
  icon: DocumentsIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'name',
    },
    prepare: ({ title }: Prepare) => ({
      title,
      subtitle: 'People',
    }),
  },
});
