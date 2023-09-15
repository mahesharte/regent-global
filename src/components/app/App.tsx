import type { FC } from 'react';
import type { AppProps } from 'next/app';

import Layout from '@/components/layout/Layout';
import PreviewProvider from '@/components/preview/Provider';
import { GlobalPageProps } from '@/types/global';
import AppProvider from './context';

const App: FC<AppProps<GlobalPageProps>> = ({
  Component,
  pageProps,
  router,
}) => {
  const { pageMeta = null, preview, setting = null, ...rest } = pageProps;
  return (
    <AppProvider
      initialState={{
        pageMeta,
        preview: { active: !!preview, loading: false },
        setting,
      }}
    >
      {!!preview ? (
        <PreviewProvider token={preview}>
          <Layout router={router} {...rest}>
            <Component {...pageProps} />
          </Layout>
        </PreviewProvider>
      ) : (
        <Layout router={router} {...rest}>
          <Component {...pageProps} />
        </Layout>
      )}
    </AppProvider>
  );
};

export default App;
