import { defineArrayMember, defineField } from 'sanity';
import isUndefined from 'lodash/isUndefined';

type Attachment = 'image';
type DefineFieldParameters = Parameters<typeof defineField>;
type SchemaField = DefineFieldParameters[0];
type DefineOptions = DefineFieldParameters[1];
type DefineOptionsWithAttachments = DefineOptions & {
  attachments?: Attachment[];
};

const defineRichtextField = (
  schemaField: Omit<SchemaField, 'type' | 'of'>,
  { attachments = [], ...defineOptions }: DefineOptionsWithAttachments = {}
) =>
  defineField(
    {
      ...schemaField,
      type: 'array',
      of: [
        defineArrayMember({ type: 'block' }),
        ...attachments
          .map((attachment) => {
            switch (attachment) {
              case 'image':
                return defineArrayMember({
                  type: 'image',
                  fields: [
                    {
                      type: 'text',
                      name: 'alt',
                      title: 'Alternate text',
                      description: 'Enter image alt text',
                    },
                  ],
                });
              default:
                return undefined;
            }
          })
          .filter((arrayMember) => !isUndefined(arrayMember)),
      ],
    } as SchemaField,
    defineOptions as DefineOptions
  );

export default defineRichtextField;
