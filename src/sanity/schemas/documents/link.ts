import { DocumentsIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';
import isUndefined from 'lodash/isUndefined';

import { Prepare } from '../../types/utils';

const linkTargets: { [value: string]: string } = {
  _blank: 'Blank',
  _self: 'Self',
};

const linkTypes: { [value: string]: string } = {
  reference: 'Reference',
  url: 'Url',
};

export default defineType({
  type: 'document',
  name: 'link',
  title: 'Links',
  icon: DocumentsIcon,
  fields: [
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      initialValue: 'url',
      options: {
        list: Object.keys(linkTypes).map((value) => ({
          title: linkTypes[value],
          value,
        })),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'reference',
      title: 'Reference',
      type: 'reference',
      to: [
        {
          type: 'article',
        },
        {
          type: 'page',
        },
      ],
      hidden: ({ document }) =>
        !['reference'].includes((document?.type as string | undefined) ?? ''),
      validation: (rule) =>
        rule.custom((field, context) =>
          context.document?.type === 'reference'
            ? !isUndefined(field) || 'Reference is required'
            : true
        ),
    }),
    defineField({
      name: 'url',
      title: 'Url',
      type: 'string',
      hidden: ({ document }) =>
        !['url'].includes((document?.type as string | undefined) ?? ''),
      validation: (rule) =>
        rule.custom((field, context) =>
          context.document?.type === 'url'
            ? !isUndefined(field) || 'Url is required'
            : true
        ),
    }),
    defineField({
      name: 'target',
      title: 'Target',
      type: 'string',
      options: {
        list: Object.keys(linkTargets).map((value) => ({
          title: linkTargets[value],
          value,
        })),
      },
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
    }),

    // ✅ Added for dropdown support
    defineField({
      name: 'children',
      title: 'Sub-links (Optional)',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'link' }],
        },
      ],
    }),
  ],
  preview: {
    select: {
      media: 'image',
      title: 'title',
      type: 'type',
    },
    prepare: ({ media, title, type }: Prepare) => ({
      media,
      title,
      subtitle: linkTypes[type],
    }),
  },
});
