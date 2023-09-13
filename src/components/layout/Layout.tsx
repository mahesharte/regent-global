import type { FC, ReactNode } from 'react';
import { Router } from 'next/router';

import Header from './Header';
import Footer from './Footer';

type Props = {
  children: ReactNode;
  router: Router;
};

const Layout: FC<Props> = ({ children, router }) =>
  router.route === '/studio/[[...index]]' ? (
    <>{children}</>
  ) : (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );

export default Layout;
