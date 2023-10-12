import { useRef, type FC, useEffect, useState } from "react";
import Link from "next/link";

import RichText from "@/components/richtext/RichText";
import getArticleSlugPrefix from "@/sanity/utils/getArticleSlugPrefix";
import imageUrlBuilder from "@/sanity/utils/imageUrlBuilder";
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
    slug,
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
      <div className="container mx-auto mt-4 w-full pb-40 max-md:px-4 md:mt-20">
        <div className="flex justify-center md:px-4 lg:px-0 xl:-ml-64">
          <aside className="max-md:hidden">
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
              className="mb-4 inline-flex items-center gap-2 text-sm max-md:mt-2"
              href={`${setting?.articlesHome?.slug?.current ?? "/"}`}
            >
              <ArrowLeft className="stroke-black" /> Back
            </Link>
            <div className="flex flex-col gap-10 md:gap-14">
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
                  <img
                    src={imageUrlBuilder(featuredImage).url()}
                    className="w-full md:my-14"
                  />
                )}
                <RichText value={content} />
              </Prose>
              <SocialShare
                url={`${
                  process.env.NEXT_PUBLIC_HOST ?? "/"
                }${articleSlugPrefix}${slug.current}`}
              ></SocialShare>
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
                    image: !relatedArticle.featuredImage?.asset?.url
                      ? ""
                      : imageUrlBuilder(relatedArticle.featuredImage).url(),
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
