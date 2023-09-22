import { SanityClient } from "next-sanity";

import { SectionVariables } from "@/components/sections/types";
import { getArticlesWithTags } from "../services/getArticles";
import getPeople from "../services/getPeople";
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
      case "team":
        variables.team = await getPeople(client, ["team"]);
      default:
        break;
    }
  }
  return variables;
};

export default getSectionVariables;
