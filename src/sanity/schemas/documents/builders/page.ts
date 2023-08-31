import { DocumentsIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

const pageTypes: { [value: string]: string } = {
  basic: 'Basic',
  home: 'Home',
  product: 'Product',
  notFound: 'Not Found (404)',
};

export default defineType({
  type: 'document',
  name: 'page',
  title: 'Pages',
  icon: DocumentsIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
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
  ],
  preview: {
    select: {
      title: 'name',
      type: 'type',
    },
    prepare: ({ title, type }: { [select: string]: string }) => ({
      subtitle: `${pageTypes[type]} Page`,
      title,
    }),
  },
});
