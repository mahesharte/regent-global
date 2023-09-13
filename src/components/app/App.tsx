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
  const { preview, setting = null } = pageProps;
  return (
    <AppProvider
      initialState={{ preview: { active: !!preview, loading: false }, setting }}
    >
      {!!preview ? (
        <PreviewProvider token={preview}>
          <Layout router={router}>
            <Component {...pageProps} />
          </Layout>
        </PreviewProvider>
      ) : (
        <Layout router={router}>
          <Component {...pageProps} />
        </Layout>
      )}
    </AppProvider>
  );
};

export default App;
