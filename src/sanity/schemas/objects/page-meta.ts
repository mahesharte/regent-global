import { defineField, defineType } from 'sanity';

import { Prepare } from '../types';

export default defineType({
  type: 'object',
  name: 'pageMeta',
  title: 'Page Meta',
  options: {
    collapsible: true,
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical Url',
      type: 'slug',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare: ({ title }: Prepare) => {
      return {
        title,
        subtitle: 'Page Meta',
      };
    },
  },
});
