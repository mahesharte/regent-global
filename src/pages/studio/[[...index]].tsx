import Head from 'next/head';
import { NextStudio } from 'next-sanity/studio';
import { metadata } from 'next-sanity/studio/metadata';
import { useEffect, useMemo, useState, type FC } from 'react';
import isFunction from 'lodash/isFunction';
import noop from 'lodash/noop';

import StudioContext, {
  type StudioContextValue,
  type StudioState,
} from '@/sanity/context';
import config from '@/../sanity.config';

type CallbackArgs = (string | number | boolean)[];

const sleep = async (ms: number): Promise<void> =>
  new Promise((resolve) => {
    // eslint-disable-next-line
    setTimeout(resolve, ms);
  });

const waitUntil = async (
  condition: () => boolean,
  timeout = 5000,
  waitMs = 100
): Promise<void> => {
  const now = Date.now();
  while (!condition() && Date.now() - now < timeout) {
    // eslint-disable-next-line
    await sleep(waitMs);
  }
};

const callIframeMethod = async (
  iframe: HTMLIFrameElement,
  method: string,
  args: CallbackArgs = []
): Promise<void> => {
  const getCallback = (): ((...params: CallbackArgs) => void) =>
    // eslint-disable-next-line
    (iframe.contentWindow as any)?.[method];
  await waitUntil(() => !!getCallback());
  const callback = getCallback();
  if (isFunction(callback)) {
    callback(...args);
  }
};

const StudioPage: FC = () => {
  const [state, setState] = useState<StudioState>({
    iframes: [],
    scrollOffset: 0,
  });
  const value = useMemo<StudioContextValue>(() => [state, setState], [state]);
  const { scrollOffset } = value[0];
  const iframes = useMemo(() => state.iframes, [state]);

  useEffect(() => {
    if (iframes.length > 0) {
      const status = {
        path: '',
      };
      const interval = setInterval(() => {
        const path = window.location.pathname;
        if (path !== status.path) {
          // eslint-disable-next-line
          status.path = path;
          // Product Page preview
          if (
            path.startsWith('/studio/desk/page') &&
            path.includes('type%3DproductSection')
          ) {
            const [, , preview] = path.split(';');
            const id = preview.substring(0, preview.indexOf('%'));
            iframes.forEach((iframe) => {
              // eslint-disable-next-line
              callIframeMethod(iframe, 'scrollToProductSection', [
                id,
                scrollOffset,
              ]);
            });
          }
        }
      }, 100);
      return () => {
        clearInterval(interval);
      };
    }
    return noop;
  }, [iframes, scrollOffset]);

  return (
    <StudioContext.Provider value={value}>
      <Head>
        {Object.entries(metadata).map(([key, content]) => (
          <meta key={key} name={key} content={content} />
        ))}
      </Head>
      <NextStudio config={config} />
    </StudioContext.Provider>
  );
};

export default StudioPage;
