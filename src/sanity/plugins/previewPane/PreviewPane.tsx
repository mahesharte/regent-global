import type { ComponentProps, FC } from 'react';
import type { UserViewComponent } from 'sanity/desk';
import { useState, useEffect } from 'react';
import { Box } from '@sanity/ui';
import noop from 'lodash/noop';

import { useAppContext } from '@/components/app/context';
import { useStudioContext } from '@/sanity/context';
import type { SanityArticle, SanityPage } from '@/sanity/types/documents';
import PreviewArticle from './documents/Article';
import PreviewPage from './documents/Page';
import { type WithPreview } from './types';
import getArticleSlugPrefix from '@/sanity/utils/getArticleSlugPrefix';

export type PreviewProps = ComponentProps<UserViewComponent> & WithPreview;

export const PreviewPane: FC<PreviewProps> = (props) => {
  const { document, previewSecretId, apiVersion } = props;
  const { displayed, published } = document;
  const documentType = String(displayed._type);
  // Default device is desktop
  const [device, setDevice] = useState('desktop');
  const [iframe, setIframe] = useState<HTMLIFrameElement | null>(null);
  const [, setStudioState] = useStudioContext();
  const [{ setting }] = useAppContext();

  useEffect(() => {
    if (iframe) {
      setStudioState((prev) => ({
        ...prev,
        iframes: [...prev.iframes, iframe],
      }));
      return () => {
        setStudioState((prev) => ({
          ...prev,
          iframes: prev.iframes.filter((preview) => preview !== iframe),
        }));
      };
    }
    return noop;
  }, [iframe, setStudioState]);

  useEffect(() => {
    const deviceOffsets: { [device: string]: number } = {
      mobile: -90,
      desktop: -150,
    };
    setStudioState((prev) => ({
      ...prev,
      scrollOffset: deviceOffsets[device],
    }));
  }, [device, setStudioState]);

  switch (documentType) {
    case 'article':
      const slugPrefix = getArticleSlugPrefix(setting);
      return (
        <PreviewArticle
          apiVersion={apiVersion}
          device={device}
          article={displayed as SanityArticle}
          previewSecretId={previewSecretId}
          onChangeDevice={setDevice}
          onLoadIframe={setIframe}
          slugPrefix={slugPrefix}
        />
      );
    case 'page':
      const pageType = String(displayed.type ?? '');
      // Page previews
      if (['basic', 'home', 'notFound'].includes(pageType)) {
        return (
          <PreviewPage
            apiVersion={apiVersion}
            device={device}
            page={displayed as SanityPage}
            previewSecretId={previewSecretId}
            onChangeDevice={setDevice}
            onLoadIframe={setIframe}
          />
        );
      }
      return (
        <Box>
          <div className="p-5">
            Unsupported page type:&nbsp;
            <em>
              <strong>{pageType}</strong>
            </em>
          </div>
        </Box>
      );
    default:
      return (
        <Box>
          <div className="p-5">
            Unsupported document type:&nbsp;
            <em>
              <strong>{documentType}</strong>
            </em>
          </div>
        </Box>
      );
  }
};
