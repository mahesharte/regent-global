import { useRef, type FC, useEffect, useState } from "react";
import Link from "next/link";
import isUndefined from "lodash/isUndefined";

import RichText from "@/components/richtext/RichText";
import getArticleSlugPrefix from "@/sanity/utils/getArticleSlugPrefix";
import { Header } from "./Header";
import { Prose } from "./Prose";
import { ArrowLeft } from "../Icons";
import { SocialShare } from "./SocialShare";
import { AboutAuthor } from "./AboutAuthor";
import { RelatedArticles } from "./RelatedArticles";
import { SidebarLinks } from "./SidebarLinks";
import { ArticleProps } from "./types";
import { useAppContext } from "../app/context";

const Article: FC<ArticleProps> = ({ article }) => {
  const [headings, setHeadings] = useState<HTMLElement[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  const [{ setting }] = useAppContext();
  const articleSlugPrefix = getArticleSlugPrefix(setting);
  const {
    author,
    content,
    featuredImage,
    introduction,
    relatedArticles,
    title,
  } = article;

  useEffect(() => {
    if (ref?.current) {
      const elements: HTMLElement[] = [];
      ref.current
        .querySelectorAll<HTMLElement>("h1,h2,h3,h4,h5,h6")
        .forEach((element) => {
          elements.push(element);
        });
      setHeadings(elements);
    }
  }, [ref]);

  return (
    <div>
      <Header
        title={title}
        author={author?.name ?? ""}
        authorImage={author?.photo?.asset?.url ?? ""}
      />
      <div className="container mx-auto mt-20 w-full pb-40">
        <div className="-ml-64 flex justify-center">
          <aside>
            <SidebarLinks
              className="sticky top-4 ml-auto w-64"
              headings={headings.map((heading, index) => ({
                id: String(index),
                title: heading.innerText,
              }))}
              onClick={(id) =>
                headings?.[parseInt(id, 10)]?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                })
              }
            />
          </aside>
          <main className="max-w-prose">
            <Link
              className="mb-2 inline-flex items-center gap-2 text-sm"
              href={`${setting?.articlesHome?.slug?.current ?? "/"}`}
            >
              <ArrowLeft className="stroke-black" /> Back
            </Link>
            <div className="flex flex-col gap-14">
              <Prose ref={ref}>
                {!!introduction && (
                  <RichText
                    value={introduction}
                    classNames={{
                      block: {
                        normal: "lead",
                      },
                    }}
                  />
                )}
                {!!featuredImage?.asset?.url && (
                  <img src={featuredImage.asset.url} className="my-14 w-full" />
                )}
                <RichText value={content} />
              </Prose>
              <SocialShare url="foo"></SocialShare>
              {!!author && (
                <AboutAuthor
                  text={author?.description ?? ""}
                  author={author?.name ?? ""}
                  authorImage={author?.photo?.asset?.url ?? ""}
                />
              )}
              {(relatedArticles ?? []).length > 0 && (
                <RelatedArticles
                  articles={(relatedArticles ?? []).map((relatedArticle) => ({
                    image: relatedArticle.featuredImage?.asset?.url ?? "",
                    title: relatedArticle.title ?? "",
                    url: `${articleSlugPrefix}${
                      relatedArticle.slug.current ?? ""
                    }`,
                  }))}
                />
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Article;
