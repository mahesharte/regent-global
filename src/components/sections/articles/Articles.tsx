import { useState, type FC } from "react";
import reverse from "lodash/reverse";
import sortBy from "lodash/sortBy";
import uniqBy from "lodash/uniqBy";

import { ArticleCard } from "@/components/ArticleCard";
import { CategoryTabItem, CategoryTabs } from "@/components/CategoryTabs";
import useDynamicStyles from "@/lib/hooks/useDynamicStyles";
import {
  type SanityArticle,
  type SanitySection,
} from "@/sanity/types/documents";
import getArticleSlugPrefix from "@/sanity/utils/getArticleSlugPrefix";
import { useAppContext } from "@/components/app/context";
import { useSectionStyles } from "../utils";

type Props = {
  section: SanitySection;
  articles: SanityArticle[];
};

const mostRecent: CategoryTabItem = {
  title: "Most recent",
  linkTo: "/",
  active: false,
};

const Articles: FC<Props> = ({ section, articles }) => {
  const [active, setActive] = useState<string>("/");
  const styles = useSectionStyles(section, ["margin", "padding"]);
  const { className, ref } = useDynamicStyles<HTMLDivElement>(styles);
  const [{ setting }] = useAppContext();
  const articleSlugPrefix = getArticleSlugPrefix(setting);
  const tags = sortBy(
    uniqBy(
      articles.map((article) => article.tags ?? []).flat(),
      "slug.current",
    ),
    "title",
  );
  const filtered = reverse(
    sortBy(
      articles.filter(
        ({ tags = [] }) =>
          active === "/" ||
          tags.map(({ slug }) => slug.current ?? "").includes(active),
      ),
      "datePublished",
    ),
  );
  return (
    <div className={className} ref={ref}>
      <CategoryTabs
        categories={[
          {
            ...mostRecent,
            active: active === mostRecent.linkTo,
          },
          ...tags.map(({ title, slug }) => ({
            title,
            linkTo: slug.current ?? "",
            active: slug.current === active,
          })),
        ]}
        onSelect={({ linkTo }) => {
          setActive(linkTo);
        }}
      />
      <div className="container mx-auto pt-20">
        <div className="grid grid-cols-1 gap-6 px-4 sm:grid-cols-2 md:grid-cols-3 lg:px-0">
          {filtered.map((article, index) => (
            <ArticleCard
              key={article.slug?.current ?? index}
              image={article.featuredImage?.asset?.url ?? ""}
              title={article.title}
              tags={(article.tags ?? []).map(({ title }) => ({
                title: title ?? "-",
              }))}
              url={`${articleSlugPrefix}${article.slug.current}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Articles;
