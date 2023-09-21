import trimEnd from "lodash/trimEnd";
import { SanitySetting } from "@/sanity/types/documents";

const getArticleSlugPrefix = (setting: SanitySetting | null): string =>
  `${trimEnd(setting?.articlesHome?.slug?.current ?? "", "/")}/`;

export default getArticleSlugPrefix;
