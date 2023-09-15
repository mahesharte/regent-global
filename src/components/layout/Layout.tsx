import type { FC, ReactNode } from 'react';
import Head from 'next/head';
import { Router } from 'next/router';
import { Inter } from 'next/font/google';

import { useAppContext } from '@/components/app/context';
import { GlobalPageProps } from '@/types/global';
import Header from './Header';
import Footer from './Footer';

type Props = GlobalPageProps & {
  children: ReactNode;
  router: Router;
};

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
});

const Layout: FC<Props> = ({ children, footer, header, router }) => {
  const [{ pageMeta }] = useAppContext();
  return router.route === '/studio/[[...index]]' ? (
    <>{children}</>
  ) : (
    <>
      <Head>
        <title>{pageMeta?.title}</title>
        {!!pageMeta?.description && (
          <meta name="description" content={pageMeta.description} />
        )}
      </Head>
      <style jsx global>
        {`
          :root {
            --font-inter: ${inter.style.fontFamily};
          }
        `}
      </style>
      <div className="flex flex-col min-h-[100vh]">
        <Header header={header} />
        <main className="flex-grow">{children}</main>
        <Footer footer={footer} />
      </div>
    </>
  );
};

export default Layout;
