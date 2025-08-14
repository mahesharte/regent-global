import { useMemo, useState, type FC } from "react";
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
import imageUrlBuilder from "@/sanity/utils/imageUrlBuilder";
import { useSectionStyles } from "../utils";

type Props = { section: SanitySection; articles: SanityArticle[] };

type Mode = "recent" | "byTag";

const TAB_ALL_TOPICS: CategoryTabItem = {
  title: "All topics",
  linkTo: "#all",
  active: false,
};
const TAB_MOST_RECENT: CategoryTabItem = {
  title: "Most recent",
  linkTo: "recent",
  active: false,
};

const Articles: FC<Props> = ({ section, articles }) => {
  const [mode, setMode] = useState<Mode>("recent");
  const [activeTag, setActiveTag] = useState<string>("");
  const [showAll, setShowAll] = useState(false);

  const styles = useSectionStyles(section, ["margin", "padding"]);
  const { className, ref } = useDynamicStyles<HTMLDivElement>(styles);
  const [{ setting }] = useAppContext();
  const articleSlugPrefix = getArticleSlugPrefix(setting);

  // All tags (unique, for modal)
  const allTags = useMemo(
    () =>
      sortBy(
        uniqBy(
          articles.flatMap((a) => a.tags ?? []),
          (t) => t?.slug?.current ?? "",
        ),
        "title",
      ),
    [articles],
  );

  // Compute up to 5 most recently used tags (by latest article date containing the tag)
  const recentTags = useMemo(() => {
    const map = new Map<
      string,
      { title: string; slug: string; latest: number }
    >();
    for (const a of articles) {
      const d = new Date(
        a.datePublished ?? a._updatedAt ?? a._createdAt ?? 0,
      ).getTime();
      for (const t of a.tags ?? []) {
        const slug = t?.slug?.current ?? "";
        if (!slug) continue;
        const title = t?.title ?? slug;
        const prev = map.get(slug);
        if (!prev || d > prev.latest) map.set(slug, { title, slug, latest: d });
      }
    }
    return Array.from(map.values())
      .sort((a, b) => b.latest - a.latest)
      .slice(0, 5);
  }, [articles]);

  // Visible article list (filter by tag if selected), always newest → oldest
  const visible = useMemo(() => {
    const base =
      mode === "byTag" && activeTag
        ? articles.filter((a) =>
            (a.tags ?? []).some((t) => t?.slug?.current === activeTag),
          )
        : articles;

    return [...base].sort((a, b) => {
      const ad = new Date(
        a.datePublished ?? a._updatedAt ?? a._createdAt ?? 0,
      ).getTime();
      const bd = new Date(
        b.datePublished ?? b._updatedAt ?? b._createdAt ?? 0,
      ).getTime();
      return bd - ad;
    });
  }, [articles, mode, activeTag]);

  // Build tabs: All topics, Most recent, then recent tag tabs
  const tagTabs: CategoryTabItem[] = recentTags.map(({ title, slug }) => ({
    title, // keep short to avoid overflow
    linkTo: `tag:${slug}`,
    active: mode === "byTag" && activeTag === slug,
  }));

  const categories: CategoryTabItem[] = [
    { ...TAB_ALL_TOPICS, active: mode === "byTag" && !!activeTag },
    { ...TAB_MOST_RECENT, active: mode === "recent" },
    ...tagTabs,
  ];

  return (
    <div className={className} ref={ref}>
      {/* Sticky tabs bar */}
      <div className="sticky top-0  bg-white/80 backdrop-blur">
        <CategoryTabs
          categories={categories}
          onSelect={({ linkTo }) => {
            if (linkTo === "#all") {
              setShowAll(true);
              return;
            }
            if (linkTo === "recent") {
              setMode("recent");
              setActiveTag("");
              return;
            }
            if (linkTo.startsWith("tag:")) {
              const slug = linkTo.slice(4);
              setActiveTag(slug);
              setMode("byTag");
              return;
            }
          }}
        />
      </div>

      {/* All topics modal - full tag list */}
      {showAll && (
        <div
          className="fixed inset-0 z-[9999] bg-black/40 p-4"
          onClick={() => setShowAll(false)}
        >
          <div
            className="mx-auto max-w-3xl rounded-xl bg-white p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-lg font-semibold">All topics</h3>
              <button
                className="rounded-md border px-3 py-1.5"
                onClick={() => setShowAll(false)}
              >
                Close
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
              {allTags.map(({ title, slug }) => {
                const s = slug?.current ?? "";
                const isActive = mode === "byTag" && s === activeTag;
                return (
                  <button
                    key={s || title}
                    onClick={() => {
                      setActiveTag(s);
                      setMode("byTag");
                      setShowAll(false);
                    }}
                    className={`rounded-full border px-3 py-2 text-left text-center text-sm ${
                      isActive
                        ? "border-black bg-gray-400 text-white"
                        : "hover:bg-gray border-gray-500"
                    }`}
                    title={s ? `#${s}` : ""}
                  >
                    <span className="block">{title}</span>
                    {s && (
                      <span className="block text-xs text-neutral-800">
                        #{s}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Articles */}
      <div className="container mx-auto pt-8 md:pt-12">
        {visible.length === 0 ? (
          <p className="px-4 text-center text-gray-500">
            No articles found for this selection.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 px-4 sm:grid-cols-2 md:grid-cols-3 lg:px-0">
            {visible.map((article) => (
              <ArticleCard
                key={article.slug?.current ?? article._id}
                image={
                  !article.featuredImage?.asset?.url
                    ? ""
                    : imageUrlBuilder(article.featuredImage).url()
                }
                title={article.title}
                tags={(article.tags ?? []).map(({ title }) => ({
                  title: title ?? "-",
                }))}
                url={`${articleSlugPrefix}${article.slug?.current ?? ""}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Articles;
