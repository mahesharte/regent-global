import isUndefined from 'lodash/isUndefined';

import type {
  DocumentActionComponent,
  PluginOptions,
  SchemaType,
  TemplateItem,
} from 'sanity';
import type { ListItemBuilder, StructureResolver } from 'sanity/desk';
import type { ReactNode } from 'react';

import { PreviewPane } from './previewPane/PreviewPane';

export const singletonPlugin = (types: string[]): PluginOptions => ({
  name: 'singletonPlugin',
  document: {
    // Hide 'Singletons (such as Home)' from new document options
    // https://user-images.githubusercontent.com/81981/195728798-e0c6cf7e-d442-4e58-af3a-8cd99d7fcc28.png
    newDocumentOptions: (prev, { creationContext }): TemplateItem[] => {
      if (creationContext.type === 'global') {
        return prev.filter(
          (templateItem) => !types.includes(templateItem.templateId)
        );
      }
      return prev;
    },
    // Removes the "duplicate" action on the Singletons (such as Home)
    actions: (prev, { schemaType }): DocumentActionComponent[] => {
      if (types.includes(schemaType)) {
        return prev.filter(({ action }) => action !== 'duplicate');
      }
      return prev;
    },
  },
});

// The StructureResolver is how we're changing the DeskTool structure to linking to document (named Singleton)
// like how "Home" is handled.
export const pageStructure =
  ({
    pageBuilders,
    singletons,
    apiVersion,
    previewSecretId,
  }: {
    pageBuilders: string[];
    singletons: string[];
    apiVersion: string;
    previewSecretId: `${string}.${string}`;
  }): StructureResolver =>
  (S) => {
    const items = S.documentTypeListItems();
    const pageBuilderItems = pageBuilders
      .map((pageBuilder) => items.find((item) => item.getId() === pageBuilder))
      .filter((item) => !isUndefined(item)) as ListItemBuilder[];

    const manuallyOrderedSchemas = [...pageBuilders, ...singletons];

    const contentItems = items
      .filter((item) => !manuallyOrderedSchemas.includes(item.getId() ?? ''))
      .sort((a, b) => {
        const left = a.getTitle() ?? '';
        const right = b.getTitle() ?? '';
        if (left < right) {
          return -1;
        }
        if (left > right) {
          return 1;
        }
        return 0;
      });

    const singletonItems = items
      .filter((item) => singletons.includes(item.getId() ?? ''))
      .map((item) => {
        const typeDef = item.getSchemaType() as SchemaType;
        return S.listItem()
          .title(typeDef.title!)
          .icon(typeDef.icon as ReactNode)
          .child(
            S.editor()
              .id(typeDef.name)
              .schemaType(typeDef.name)
              .documentId(typeDef.name)
              .views([S.view.form()])
          );
      });

    return S.list()
      .title('Content')
      .items([
        ...pageBuilderItems,
        S.divider(),
        ...contentItems,
        S.divider(),
        ...singletonItems,
      ]);
  };
