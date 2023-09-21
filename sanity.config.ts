import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { colorInput } from "@sanity/color-input";
import { unsplashImageAsset } from "sanity-plugin-asset-source-unsplash";
import { media } from "sanity-plugin-media";
import { dashboardTool } from "@sanity/dashboard";
import { documentListWidget } from "sanity-plugin-dashboard-widget-document-list";

import {
  apiVersion,
  dataset,
  previewSecretId,
  projectId,
} from "@/sanity/config";
import previewDocumentNode from "@/sanity/plugins/previewPane";
import { pageStructure, singletonPlugin } from "@/sanity/plugins/settings";
import article from "@/sanity/schemas/documents/article";
import articleTag from "@/sanity/schemas/documents/article-tag";
import gradient from "@/sanity/schemas/documents/gradient";
import link from "@/sanity/schemas/documents/link";
import page from "@/sanity/schemas/documents/page";
import people from "@/sanity/schemas/documents/people";
import section from "@/sanity/schemas/documents/section";
import button from "@/sanity/schemas/objects/button";
import keyValue from "@/sanity/schemas/objects/key-value";
import measurements from "@/sanity/schemas/objects/measurements";
import pageMeta from "@/sanity/schemas/objects/page-meta";
import sectionItem from "@/sanity/schemas/objects/section-item";
import footer from "@/sanity/schemas/singletons/footer";
import header from "@/sanity/schemas/singletons/header";
import setting from "@/sanity/schemas/singletons/setting";

const title = process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE ?? "Regent POC";
const pageBuilders = [article.name, page.name, header.name, footer.name];
const previewableTypes = [article.name, page.name, header.name, footer.name];
const singletons = [setting.name, header.name, footer.name];

export default defineConfig({
  basePath: "/studio",
  projectId: projectId || "",
  dataset: dataset || "",
  title,
  schema: {
    // Schemas
    types: [
      // Singletons
      footer,
      header,
      setting,
      // Documents
      article,
      articleTag,
      gradient,
      link,
      page,
      people,
      section,
      // Objects
      button,
      keyValue,
      measurements,
      pageMeta,
      sectionItem,
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
          title: "Most recent edited documents",
          order: "_createdAt desc",
        }),
      ],
    }),
    media(),
  ],
});
