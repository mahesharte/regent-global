import { DocumentsIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';
import isUndefined from 'lodash/isUndefined';

import defineRichtextField from '../helpers/richtext';
import { Prepare } from '../../types/utils';

const components: { [value: string]: string } = {
  hero: 'Hero',
};

export default defineType({
  type: 'document',
  name: 'section',
  title: 'Sections',
  icon: DocumentsIcon,
  fields: [
    defineField({
      name: 'component',
      title: 'Component',
      type: 'string',
      validation: (rule) => rule.required(),
      options: {
        list: Object.keys(components).map((value) => ({
          title: components[value],
          value,
        })),
      },
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      hidden: ({ document }) =>
        !['hero'].includes((document?.component as string | undefined) ?? ''),
      validation: (rule) =>
        rule.custom((field, context) => {
          switch (context.document?.component) {
            case 'hero':
              return !isUndefined(field) || 'Title is required';
            default:
              return true;
          }
        }),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      hidden: ({ document }) =>
        !['hero'].includes((document?.component as string | undefined) ?? ''),
    }),
    defineRichtextField(
      {
        name: 'content',
        title: 'Content',
      },
      {
        attachments: ['image'],
      }
    ),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      hidden: ({ document }) =>
        !['hero'].includes((document?.component as string | undefined) ?? ''),
    }),
  ],
  preview: {
    select: {
      component: 'component',
    },
    prepare: ({ component }: Prepare) => ({
      title: components[component],
      subtitle: `Section`,
    }),
  },
});
