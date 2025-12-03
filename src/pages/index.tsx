import type { GetStaticProps } from "next";
import type { FC } from "react";

import type { SanityPage } from "@/sanity/types/documents";
import Page from "@/components/page/Root";
import { getClient } from "@/sanity/client";
import { writeToken } from "@/sanity/config";
import getFooter from "@/sanity/services/getFooter";
import getHeader from "@/sanity/services/getHeader";
import getPage from "@/sanity/services/getPage";
import getSetting from "@/sanity/services/getSetting";
import getSectionVariables from "@/sanity/utils/getSectionVariables";
import { GlobalPageProps } from "@/types/global";
import { SectionVariables } from "@/components/sections/types";

import dynamic from "next/dynamic";

const HeroCarousel = dynamic(
  () => import("@/components/hero/HeroCarousel"),
  { ssr: false }
);


export type HomeProps = GlobalPageProps & {
  page: SanityPage | null;
  sectionVariables?: SectionVariables;
};

const Home: FC<HomeProps> = ({ page }) => {
  if (!page) {
    return <>Please publish a homepage</>;
  }
  return <Page page={page} />;
};

export const getStaticProps: GetStaticProps<HomeProps> = async (context) => {
  const { draftMode = false } = context;
  const preview = draftMode ? writeToken : null;
  const client = getClient(preview);
  const [footer, header, page, setting] = await Promise.all([
    getFooter(client),
    getHeader(client),
    getPage(client, "/"),
    getSetting(client),
  ]);
  const sectionVariables = await getSectionVariables(
    client,
    page?.sections ?? [],
  );

  return {
    props: {
      footer,
      header,
      page,
      pageMeta: page?.pageMeta ?? null,
      preview,
      sectionVariables,
      setting,
    },
    // Revalidate in 10 seconds
    revalidate: 10,
  };
};

export default Home;
