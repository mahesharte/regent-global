import type { FC, ReactNode } from "react";
import Head from "next/head";
import Script from "next/script";
import { Router } from "next/router";
import { Inter } from "next/font/google";

import { useAppContext } from "@/components/app/context";
import { GlobalPageProps } from "@/types/global";
import imageUrlBuilder from "@/sanity/utils/imageUrlBuilder";
import Header from "./Header";
import Footer from "./Footer";

type Props = GlobalPageProps & {
  children: ReactNode;
  router: Router;
};

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const Layout: FC<Props> = ({ children, footer, header, router }) => {
  const [{ pageMeta, setting }] = useAppContext();
  return router.route === "/studio/[[...index]]" ? (
    <>{children}</>
  ) : (
    <>
      <Head>
        <title>{pageMeta?.title}</title>
        <meta property="og:title" content={pageMeta?.title} />
        {!!pageMeta?.description && (
          <>
            <meta name="description" content={pageMeta.description} />
            <meta property="og:description" content={pageMeta.description} />
          </>
        )}
        {!!pageMeta?.image?.asset?.url && (
          <meta
            property="og:image"
            content={imageUrlBuilder(pageMeta.image).url()}
          />
        )}
      </Head>
      <style jsx global>
        {`
          :root {
            --font-inter: ${inter.style.fontFamily};
          }
        `}
      </style>
      {!!setting?.servicesGtmId && (
        <Script id="gtm-script">{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${setting.servicesGtmId}');`}</Script>
      )}
      <div className="flex min-h-[100vh] flex-col">
        <Header header={header} />
        <main className="flex-grow">{children}</main>
        <Footer footer={footer} />
      </div>
    </>
  );
};

export default Layout;
