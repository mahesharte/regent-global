import { Box } from '@sanity/ui';
import noop from 'lodash/noop';
import { useState, useEffect } from 'react';

import { useStudioContext } from '@/sanity/context';

import type { ComponentProps, FC } from 'react';
import type { SanityPage } from '@/sanity/types/documents';
import type { UserViewComponent } from 'sanity/desk';

import PreviewPage from './documents/Page';
import { type WithPreview } from './types';

export type PreviewProps = ComponentProps<UserViewComponent> & WithPreview;

export const PreviewPane: FC<PreviewProps> = (props) => {
  const { document, previewSecretId, apiVersion } = props;
  const { displayed, published } = document;
  const documentType = String(displayed._type);
  const pageType = String(displayed.type ?? '');
  // Default device is desktop
  const [device, setDevice] = useState('desktop');
  const [iframe, setIframe] = useState<HTMLIFrameElement | null>(null);
  const [, setStudioState] = useStudioContext();

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

  // Page previews
  if (['basic', 'home', 'notFound'].includes(pageType)) {
    // Basic pages
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
  return <Box />;
};
