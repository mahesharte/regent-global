import type { GetStaticPaths, GetStaticProps } from "next";
import type { FC } from "react";
import isArray from "lodash/isArray";

import type { SanityArticle, SanityPage } from "@/sanity/types/documents";
import Article from "@/components/article/Root";
import Page from "@/components/page/Root";
import { getClient } from "@/sanity/client";
import { writeToken } from "@/sanity/config";
import getArticle from "@/sanity/services/getArticle";
import getArticles from "@/sanity/services/getArticles";
import getFooter from "@/sanity/services/getFooter";
import getHeader from "@/sanity/services/getHeader";
import getPage from "@/sanity/services/getPage";
import getPages from "@/sanity/services/getPages";
import getSetting from "@/sanity/services/getSetting";
import getArticleSlugPrefix from "@/sanity/utils/getArticleSlugPrefix";
import getSectionVariables from "@/sanity/utils/getSectionVariables";
import { GlobalPageProps } from "@/types/global";
import { SectionVariables } from "@/components/sections/types";

export type CatchAllProps = GlobalPageProps & {
  document: SanityArticle | SanityPage | null;
  sectionVariables?: SectionVariables;
};

const CatchAll: FC<CatchAllProps> = ({ document, sectionVariables }) => {
  switch (document?._type) {
    case "article":
      return <Article article={document as SanityArticle} />;
    case "page":
      return (
        <Page
          page={document as SanityPage}
          sectionVariables={sectionVariables}
        />
      );
    default:
      return <></>;
  }
};

export const getStaticProps: GetStaticProps<CatchAllProps> = async (
  context,
) => {
  const { draftMode = false, params = {} } = context;
  const preview = draftMode ? writeToken : null;
  const client = getClient(preview);
  const slug = `/${isArray(params.slug) ? params.slug.join("/") : params.slug}`;
  const [footer, header, setting] = await Promise.all([
    getFooter(client),
    getHeader(client),
    getSetting(client),
  ]);
  const articleSlugPrefix = getArticleSlugPrefix(setting);
  let document: CatchAllProps["document"] = await getPage(client, slug);
  if (!document && slug.startsWith(articleSlugPrefix)) {
    document = await getArticle(
      client,
      slug.substring(articleSlugPrefix.length),
    );
    // Use featured image as og image if not set
    if (!!document?.featuredImage && !document.pageMeta?.image) {
      document.pageMeta.image = document.featuredImage;
    }
  }
  if (!document) {
    return {
      notFound: true,
      revalidate: 10,
    };
  }

  const sectionVariables = await getSectionVariables(
    client,
    document?.sections ?? [],
  );

  return {
    props: {
      document,
      footer,
      header,
      pageMeta: document?.pageMeta ?? null,
      preview,
      sectionVariables,
      setting,
    },
    // Revalidate in 10 seconds
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const client = getClient();
  const setting = await getSetting(client);
  const pages = await getPages(client, "basic");
  const articles = await getArticles(client);
  const articleSlugPrefix = getArticleSlugPrefix(setting);
  const paths = [
    ...pages
      .filter((page) => page.slug.current !== "/")
      .map((page) => page.slug.current),
    ...articles.map((article) => `${articleSlugPrefix}${article.slug.current}`),
  ];
  return {
    paths,
    fallback: "blocking",
  };
};

export default CatchAll;
