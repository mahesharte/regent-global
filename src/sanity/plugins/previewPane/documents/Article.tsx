import { Box, Card, Flex, Text } from '@sanity/ui';
import { Suspense } from 'react';
import type { FC } from 'react';
import trimStart from 'lodash/trimStart';

import type { SanityArticle } from '@/sanity/types/documents';
import type { WithPreview } from '../types';
import DeviceSelector from '../DeviceSelector';
import IFrame from '../IFrame';

const documentType = 'article';

type PreviewArticleProps = {
  article: SanityArticle | null;
  slugPrefix: string;
} & WithPreview;

const PreviewArticle: FC<PreviewArticleProps> = ({
  apiVersion,
  device,
  onChangeDevice,
  onLoadIframe,
  article,
  slugPrefix,
  previewSecretId,
}) => {
  const href = `${slugPrefix}${trimStart(article?.slug?.current ?? '', '/')}`;

  if (!href) {
    return (
      <Card tone="primary" margin={5} padding={6}>
        <Text align="center">
          Please add a slug to the article to see the preview!
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

export default PreviewArticle;
