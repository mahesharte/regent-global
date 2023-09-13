import { Box, Card, Flex, Text } from '@sanity/ui';
import { Suspense } from 'react';
import trimStart from 'lodash/trimStart';

import type { SanityPage } from '@/sanity/types/documents';
import type { FC } from 'react';
import type { WithPreview } from '../types';

import DeviceSelector from '../DeviceSelector';
import IFrame from '../IFrame';

const documentType = 'page';

type PreviewPageProps = {
  page: SanityPage | null;
} & WithPreview;
const PreviewPage: FC<PreviewPageProps> = ({
  apiVersion,
  device,
  onChangeDevice,
  onLoadIframe,
  page,
  previewSecretId,
}) => {
  const href = `/${trimStart(page?.slug?.current ?? '', '/')}`;

  if (!href) {
    return (
      <Card tone="primary" margin={5} padding={6}>
        <Text align="center">
          Please add a slug to the page to see the preview!
        </Text>
      </Card>
    );
  }

  return (
    <Flex direction="column" className="h-full">
      <Flex>
        <Box>
          <a
            href={href}
            target="_blank"
            className="inline-block text-[13px] py-2 ml-5"
          >
            {`${window.location.origin}${href}`}
          </a>
        </Box>
        <Box flex={1} className="!flex items-center justify-end">
          <DeviceSelector device={device} onChange={onChangeDevice} />
        </Box>
      </Flex>
      <Card scheme="light" className="w-full h-full relative overflow-x-auto">
        <Suspense fallback={null}>
          <IFrame
            apiVersion={apiVersion}
            device={device}
            documentType={documentType}
            previewSecretId={previewSecretId}
            href={href}
            onLoad={onLoadIframe}
          />
        </Suspense>
      </Card>
    </Flex>
  );
};

export default PreviewPage;
