import { DocumentsIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';
import isUndefined from 'lodash/isUndefined';

import defineRichtextField from '../helpers/richtext';
import { Prepare } from '../../types/utils';

const components: { [value: string]: string } = {
  bigNumbers: 'Big Numbers',
  contentBlock: 'Content Block',
  hero: 'Hero',
  logoWall: 'Logo Wall',
  multiColumn: 'Multi Column',
};

const styleAlignments: { [value: string]: string } = {
  left: 'Left',
  center: 'Center',
  right: 'Right',
};

export default defineType({
  type: 'document',
  name: 'section',
  title: 'Sections',
  icon: DocumentsIcon,
  fieldsets: [
    {
      name: 'style',
      title: 'Style',
      options: { collapsible: true },
    },
  ],
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
        ![
          'bigNumbers',
          'contentBlock',
          'hero',
          'logoWall',
          'multiColumn',
        ].includes((document?.component as string | undefined) ?? ''),
      validation: (rule) =>
        rule.custom((field, context) => {
          switch (context.document?.component) {
            // Add required validation here
            // case 'hero':
            //   return !isUndefined(field) || 'Title is required';
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
        hidden: ({ document }) =>
          !['contentBlock'].includes(
            (document?.component as string | undefined) ?? ''
          ),
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
        !['contentBlock', 'hero'].includes(
          (document?.component as string | undefined) ?? ''
        ),
    }),
    defineField({
      name: 'buttons',
      title: 'Buttons',
      type: 'array',
      of: [
        {
          type: 'button',
        },
      ],
      hidden: ({ document }) =>
        !['contentBlock'].includes(
          (document?.component as string | undefined) ?? ''
        ),
    }),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        {
          type: 'sectionItem',
        },
      ],
      hidden: ({ document }) =>
        !['bigNumbers', 'contentBlock', 'hero', 'multiColumn'].includes(
          (document?.component as string | undefined) ?? ''
        ),
      validation: (rule) =>
        rule.custom((field, context) => {
          switch (context.document?.component) {
            case 'bigNumbers':
            case 'multiColumn':
              return !isUndefined(field) || 'Items are required';
            default:
              return true;
          }
        }),
    }),
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
            },
          ],
        },
      ],
      hidden: ({ document }) =>
        !['logoWall'].includes(
          (document?.component as string | undefined) ?? ''
        ),
      validation: (rule) =>
        rule.custom((field, context) => {
          switch (context.document?.component) {
            case 'logoWall':
              return !isUndefined(field) || 'Links are required';
            default:
              return true;
          }
        }),
    }),
    defineField({
      name: 'styleAlignment',
      type: 'string',
      title: 'Alignment',
      fieldset: 'style',
      options: {
        list: Object.keys(styleAlignments).map((value) => ({
          title: styleAlignments[value],
          value,
        })),
      },
      hidden: ({ document }) =>
        !['contentBlock'].includes(
          (document?.component as string | undefined) ?? ''
        ),
    }),
    defineField({
      name: 'stylePadding',
      title: 'Padding',
      type: 'padding',
      fieldset: 'style',
      hidden: ({ document }) =>
        ![
          'bigNumbers',
          'contentBlock',
          'hero',
          'logoWall',
          'multiColumn',
        ].includes((document?.component as string | undefined) ?? ''),
    }),
    defineField({
      name: 'styleGradient',
      title: 'Gradient',
      type: 'reference',
      fieldset: 'style',
      to: [
        {
          type: 'gradient',
        },
      ],
      hidden: ({ document }) =>
        !['bigNumbers', 'hero', 'logoWall', 'multiColumn'].includes(
          (document?.component as string | undefined) ?? ''
        ),
    }),
  ],
  preview: {
    select: {
      component: 'component',
      media: 'image',
      title: 'title',
    },
    prepare: ({ component, media, title }: Prepare) => {
      const subtitle = components[component];
      switch (component) {
        case 'bigNumbers':
        case 'contentBlock':
        case 'hero':
        case 'logoWall':
        case 'multiColumn':
          return {
            title: title ?? (media ? 'Image' : 'Untitled'),
            media,
            subtitle,
          };
        default:
          return {
            title: 'Untitled',
            subtitle: 'Section',
          };
      }
    },
  },
});
