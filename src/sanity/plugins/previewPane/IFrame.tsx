import { memo } from 'react';
import { useClient } from 'sanity';
import { suspend } from 'suspend-react';
import clsx from 'clsx';

import type { SanityClient } from '@/sanity/client';
import getSecret from '@/sanity/utils/getSecret';

type IframeProps = {
  apiVersion: string;
  device?: string;
  documentType: string;
  previewSecretId: `${string}.${string}`;
  href?: string;
  onLoad?: (iframe: HTMLIFrameElement) => void;
};
// Used as a cache key that doesn't risk collision or getting affected by other components that might be using `suspend-react`
const fetchSecret = Symbol('preview.secret');
const IFrame = memo((props: IframeProps) => {
  const {
    apiVersion,
    device = 'mobile',
    documentType,
    previewSecretId,
  } = props;
  const { href, onLoad } = props;
  const client = useClient({ apiVersion }) as unknown as SanityClient;

  const secret = suspend(
    async () => getSecret(client, previewSecretId, true),
    ['getSecret', previewSecretId, fetchSecret],
    // The secret fetch has a TTL of 1 minute, just to check if it's necessary to recreate the secret which has a TTL of 60 minutes
    { lifespan: 60000 }
  );

  const url = new URL('/api/draft', window.location.origin);
  if (documentType) {
    url.searchParams.set('documentType', documentType);
  }
  if (href) {
    url.searchParams.set('href', href);
  }
  if (secret) {
    url.searchParams.set('secret', secret);
  }

  return (
    <iframe
      className={clsx(
        'w-full h-full relative z-[1] mx-auto block border-[1px] border-[var(--card-border-color)]',
        device === 'mobile' && 'max-w-[390px]',
        device === 'desktop' && 'min-w-[1200px] !border-x-0'
      )}
      src={url.toString()}
      title={`Preview ${documentType}`}
      onLoad={(event): void => {
        if (onLoad) {
          onLoad(event.target as HTMLIFrameElement);
        }
      }}
    />
  );
});
IFrame.displayName = 'IFrame';

export default IFrame;
