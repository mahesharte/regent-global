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

export type ServerErrorProps = GlobalPageProps & {
  page: SanityPage | null;
  sectionVariables?: SectionVariables;
};

const ServerError: FC<ServerErrorProps> = ({ page }) => {
  if (!page) {
    return <>Please publish a 500 error page</>;
  }
  return <Page page={page} />;
};

export const getStaticProps: GetStaticProps<ServerErrorProps> = async (
  context,
) => {
  const { draftMode = false } = context;
  const preview = draftMode ? writeToken : null;
  const client = getClient(preview);
  const [footer, header, page, setting] = await Promise.all([
    getFooter(client),
    getHeader(client),
    getPage(client, "500", "status"),
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

export default ServerError;
