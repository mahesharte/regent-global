import { defineField, defineType } from 'sanity';

export default defineType({
  type: 'object',
  name: 'gatedPdfLinkAnnotation',
  title: 'Gated PDF Link',
  fields: [
    defineField({
      name: 'pdfFile',
      type: 'file',
      title: 'PDF File',
      description: 'Upload a PDF directly to Sanity',
      options: {
        accept: 'application/pdf',
      },
    }),
    defineField({
      name: 'pdfExternalUrl',
      type: 'url',
      title: 'External PDF URL',
      description: 'Optional: URL to an externally hosted PDF',
    }),
    defineField({
      name: 'label',
      type: 'string',
      title: 'Label (for admin tracking)',
      description: 'Optional label to identify this PDF in submissions',
    }),
  ],
});
