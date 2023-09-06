// This plugin is responsible for adding a “Preview” tab to the document pane
// You can add any React component to `S.view.component` and it will be rendered in the pane
// and have access to content in the form in real-time.
// It's part of the Studio's “Structure Builder API” and is documented here:
// https://www.sanity.io/docs/structure-builder-reference
import type { DefaultDocumentNodeResolver } from 'sanity/desk';

import { PreviewPane } from './PreviewPane';

const previewDocumentNode =
  ({
    apiVersion,
    previewSecretId,
    types,
  }: {
    apiVersion: string;
    previewSecretId: `${string}.${string}`;
    types: string[];
  }): DefaultDocumentNodeResolver =>
  (S, { schemaType }) => {
    if (types.includes(schemaType)) {
      return S.document().views([
        // Default form view
        S.view.form(),
        S.view
          .component((props) => (
            <PreviewPane
              previewSecretId={previewSecretId}
              apiVersion={apiVersion}
              {...props}
            />
          ))
          .title('Preview'),
      ]);
    }

    return null;
  };

export default previewDocumentNode;
