import { SanityArticle, SanityPerson } from "@/sanity/types/documents";

export type SectionVariables = {
  articles?: SanityArticle[];
  team?: SanityPerson[];
};
