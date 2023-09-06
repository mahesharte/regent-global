import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { colorInput } from '@sanity/color-input';
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash';
import { media } from 'sanity-plugin-media';
import { dashboardTool } from '@sanity/dashboard';
import { documentListWidget } from 'sanity-plugin-dashboard-widget-document-list';

import {
  apiVersion,
  dataset,
  previewSecretId,
  projectId,
} from '@/sanity/config';
import previewDocumentNode from '@/sanity/plugins/previewPane';
import { pageStructure, singletonPlugin } from '@/sanity/plugins/settings';
import page from '@/sanity/schemas/documents/builders/page';

const title = process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE ?? 'Regent POC';
const pageBuilders = [page.name];
const previewableTypes = [page.name];
const singletons: string[] = [];

export default defineConfig({
  basePath: '/studio',
  projectId: projectId || '',
  dataset: dataset || '',
  title,
  schema: {
    // Schemas
    types: [
      // Singletons
      // Documents
      page,
      // Objects
    ],
  },
  plugins: [
    deskTool({
      structure: pageStructure({
        pageBuilders,
        singletons,
        apiVersion,
        previewSecretId,
      }),
      // `defaultDocumentNode` is responsible for adding a “Preview” tab to the document pane
      defaultDocumentNode: previewDocumentNode({
        apiVersion,
        previewSecretId,
        types: previewableTypes,
      }),
    }),
    singletonPlugin(singletons),
    // Add an image asset source for Unsplash
    unsplashImageAsset(),
    // Vision lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
    colorInput(),
    dashboardTool({
      widgets: [
        documentListWidget({
          title: 'Most recent edited documents',
          order: '_createdAt desc',
        }),
      ],
    }),
    media(),
  ],
});
