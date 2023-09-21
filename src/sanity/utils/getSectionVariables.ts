import { SanityClient } from "next-sanity";

import { SectionVariables } from "@/components/sections/types";
import { getArticlesWithTags } from "../services/getArticles";
import { SanitySection } from "../types/documents";

const getSectionVariables = async (
  client: SanityClient,
  sections: SanitySection[],
): Promise<SectionVariables> => {
  const variables: SectionVariables = {};
  for (const section of sections) {
    switch (section.component) {
      case "articles":
        variables.articles = await getArticlesWithTags(client);
        break;
      default:
        break;
    }
  }
  return variables;
};

export default getSectionVariables;
