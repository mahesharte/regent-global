import { DocumentsIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export default defineType({
  type: 'document',
  name: 'pdfGateSubmission',
  title: 'PDF Gate Submissions',
  icon: DocumentsIcon,
  fields: [
    defineField({
      name: 'organisationName',
      title: 'Organisation Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (rule) =>
        rule.required().custom((value: any) => {
          if (!value) return true;
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
            return 'Please enter a valid email address';
          }
          return true;
        }),
    }),
    defineField({
      name: 'pageSlug',
      title: 'Page Slug',
      type: 'string',
      validation: (rule) => rule.required(),
      description: 'The page slug where the PDF was accessed',
    }),
    defineField({
      name: 'pdfLabel',
      title: 'PDF Label',
      type: 'string',
      description: 'Optional label of the PDF link that was clicked',
    }),
    defineField({
      name: 'ipAddress',
      title: 'IP Address',
      type: 'string',
      description: 'Optional IP address of the requester',
    }),
    defineField({
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      validation: (rule) => rule.required(),
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      organisationName: 'organisationName',
      email: 'email',
      submittedAt: 'submittedAt',
    },
    prepare: ({ organisationName, email, submittedAt }) => {
      const date = submittedAt
        ? new Date(submittedAt).toLocaleDateString()
        : 'Unknown date';
      return {
        title: organisationName || 'Unknown',
        subtitle: `${email} • ${date}`,
      };
    },
  },
});
