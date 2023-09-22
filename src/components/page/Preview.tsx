import { type FC, useEffect } from "react";
import { useLiveQuery } from "next-sanity/preview";

import { useAppContext } from "@/components/app/context";
import { getPageByIdQuery } from "@/sanity/services/getPage";
import { SanityPage } from "@/sanity/types/documents";
import type { PageProps } from "./types";
import Page from "./Page";

const Preview: FC<PageProps> = ({ page: initialPage, sectionVariables }) => {
  const [, setState] = useAppContext();
  const [page, loading] = useLiveQuery<SanityPage | null>(
    initialPage,
    getPageByIdQuery,
    {
      id: initialPage._id,
    },
  );

  useEffect(() => {
    setState((prev) => ({
      ...prev,
      preview: {
        ...prev.preview,
        loading,
      },
    }));
  }, [loading, setState]);

  useEffect(() => {
    // eslint-disable-next-line
    (window as any).scrollToSection = (sectionId: string) => {
      // Make this function available for parent window calls
      const sections = document.getElementById("sections");
      const section = sections?.querySelector<HTMLElement>(
        `section[data-id="${sectionId}"]`,
      );
      section?.scrollIntoView({
        block: "start",
        behavior: "smooth",
      });
    };
  }, []);

  return (
    <Page page={page ?? initialPage} sectionVariables={sectionVariables} />
  );
};

export default Preview;
