import { DocumentsIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';
import isUndefined from 'lodash/isUndefined';

import { Prepare } from '../../types/utils';

const pageTypes: { [value: string]: string } = {
  basic: 'Basic',
  home: 'Home',
  notFound: 'Not Found (404)',
};

export default defineType({
  type: 'document',
  name: 'page',
  title: 'Pages',
  icon: DocumentsIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      validation: (rule) => rule.required(),
      options: {
        list: Object.keys(pageTypes).map((value) => ({
          title: pageTypes[value],
          value,
        })),
      },
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      hidden: ({ document }) =>
        !['basic'].includes((document?.type as string | undefined) ?? ''),
      validation: (rule) =>
        rule.custom((field, context) => {
          switch (context.document?.type) {
            case 'basic':
              return !isUndefined(field) || 'Slug is required';
            default:
              return true;
          }
        }),
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {
              type: 'section',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'pageMeta',
      title: 'Page Meta',
      type: 'pageMeta',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      type: 'type',
    },
    prepare: ({ title, type }: Prepare) => ({
      title,
      subtitle: `${pageTypes[type]} Page`,
    }),
  },
});
