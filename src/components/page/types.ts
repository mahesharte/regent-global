import type { SanityPage } from "@/sanity/types/documents";
import { SectionVariables } from "@/components/sections/types";

export type PageProps = {
  page: SanityPage;
  sectionVariables?: SectionVariables;
};
