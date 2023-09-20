import { defineField, defineType } from 'sanity';

export default defineType({
  type: 'object',
  name: 'padding',
  title: 'Padding',
  description: 'Please append the unit to use (e.g. px, pt, rem)',
  options: {
    collapsible: true,
  },
  fields: [
    defineField({
      name: 'top',
      title: 'Top Padding',
      type: 'string',
    }),
    defineField({
      name: 'bottom',
      title: 'Bottom Padding',
      type: 'string',
    }),
  ],
  preview: {
    prepare: () => ({
      title: 'Padding',
    }),
  },
});
