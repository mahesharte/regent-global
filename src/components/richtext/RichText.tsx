import type { FC, ReactNode } from "react";
import { PortableText, PortableTextReactComponents } from "@portabletext/react";
import Image from "next/image";
import dynamic from "next/dynamic";
import fromPairs from "lodash/fromPairs";
import isEmpty from "lodash/isEmpty";
import merge from "lodash/merge";

import {
  BlockStyle,
  ListItemType,
  Mark,
  SanityRichtext,
} from "@/sanity/types/objects";
import imageUrlBuilder from "@/sanity/utils/imageUrlBuilder";

// Lazy load VideoRenderer since it uses 'use client' and has interactivity
const VideoRenderer = dynamic(() => import("@/components/VideoRenderer"), {
  ssr: false,
});

type RichTextClassNames = {
  block?: Partial<Record<BlockStyle, string>>;
  list?: Partial<Record<ListItemType, string>>;
  listItem?: Partial<Record<ListItemType, string>>;
  marks?: Partial<Record<Mark, string>>;
};
type DefaultClassNames = "standard";
type Props = {
  classNames?: RichTextClassNames;
  defaultClassNames?: DefaultClassNames;
  value: SanityRichtext;
};
type BlockComponentProps = {
  children: ReactNode;
  className?: string;
};
type LinkProps = {
  href: string;
};
type MarkComponentProps = {
  children: ReactNode;
  className?: string;
  value: LinkProps;
};
const blockComponents: Record<BlockStyle, FC<BlockComponentProps>> = {
  normal: ({ children, className }) => <p className={className}>{children}</p>,
  blockquote: ({ children, className }) => (
    <blockquote className={className}>{children}</blockquote>
  ),
  h1: ({ children, className }) => <h1 className={className}>{children}</h1>,
  h2: ({ children, className }) => <h2 className={className}>{children}</h2>,
  h3: ({ children, className }) => <h3 className={className}>{children}</h3>,
  h4: ({ children, className }) => <h4 className={className}>{children}</h4>,
  h5: ({ children, className }) => <h5 className={className}>{children}</h5>,
  h6: ({ children, className }) => <h6 className={className}>{children}</h6>,
};
const listComponents: Record<ListItemType, FC<BlockComponentProps>> = {
  bullet: ({ children, className }) => (
    <ul className={className}>{children}</ul>
  ),
  number: ({ children, className }) => (
    <ol className={className}>{children}</ol>
  ),
};
const listItemComponents: Record<ListItemType, FC<BlockComponentProps>> = {
  bullet: ({ children, className }) => (
    <li className={className}>{children}</li>
  ),
  number: ({ children, className }) => (
    <li className={className}>{children}</li>
  ),
};
const marksComponents: Record<Mark, FC<MarkComponentProps>> = {
  link: ({ children, className, value }) => (
    <a className={className} href={value.href}>
      {children}
    </a>
  ),
};

const defaultClassNamesDefinitions = {
  standard: {
    block: {
      normal: "py-4 leading-6",
      h1: "text-4xl font-bold my-6",
      h2: "text-3xl font-bold my-4",
      h3: "text-2xl font-bold my-3",
      h4: "text-xl font-bold my-2",
      h5: "text-lg font-bold my-2",
      h6: "text-base font-bold my-1",
      blockquote: "border-l-4 border-gray-400 pl-4 italic my-4 text-gray-600",
    },
    list: {
      bullet: "list-disc list-inside my-3",
      number: "list-decimal list-inside my-3",
    },
    listItem: {
      bullet: "",
      number: "",
    },
    marks: {
      link: "text-blue-600 underline hover:text-blue-800",
    },
  },
};

const getImgSrc = (value: { asset?: any }, isInline: boolean) => {
  if (!value?.asset) {
    return "";
  }

  if (isInline) {
    return imageUrlBuilder(value as any).width(100).fit("max").auto("format").url();
  }

  return imageUrlBuilder(value as any).width(1200).fit("max").auto("format").url();
};

const getComponents = (classNames: RichTextClassNames): Partial<PortableTextReactComponents> => {
  const block: PortableTextReactComponents["block"] = fromPairs(
    Object.keys(classNames.block ?? {}).map((block) => [
      block,
      ({ children }) => {
        const Component = blockComponents[block as BlockStyle];
        return (
          <Component className={classNames.block?.[block as BlockStyle]}>
            {children}
          </Component>
        );
      },
    ]),
  );
  const list: PortableTextReactComponents["list"] = fromPairs(
    Object.keys(classNames.list ?? {}).map((list) => [
      list,
      ({ children }) => {
        const Component = listComponents[list as ListItemType];
        return (
          <Component className={classNames.list?.[list as ListItemType]}>
            {children}
          </Component>
        );
      },
    ]),
  );
  const listItem: PortableTextReactComponents["listItem"] = fromPairs(
    Object.keys(classNames.listItem ?? {}).map((listItem) => [
      listItem,
      ({ children }) => {
        const Component = listItemComponents[listItem as ListItemType];
        return (
          <Component
            className={classNames.listItem?.[listItem as ListItemType]}
          >
            {children}
          </Component>
        );
      },
    ]),
  );
  const marks: PortableTextReactComponents["marks"] = fromPairs(
    Object.keys(classNames.marks ?? {}).map((mark) => [
      mark,
      ({ children, value }) => {
        const Component = marksComponents[mark as Mark];
        return (
          <Component className={classNames.marks?.[mark as Mark]} value={value}>
            {children}
          </Component>
        );
      },
    ]),
  );
  return {
    ...(isEmpty(block) ? {} : { block }),
    ...(isEmpty(list) ? {} : { list }),
    ...(isEmpty(listItem) ? {} : { listItem }),
    ...(isEmpty(marks) ? {} : { marks }),
    types: {
      image: ({ value, isInline }) => {
        const imgSrc = getImgSrc(value, isInline);
        if (!imgSrc) {
          return <></>;
        }
        return (
          <Image
            width={1200}
            height={900}
            alt={value.alt}
            loading="lazy"
            src={imgSrc}
          />
        );
      },
      videoBlock: ({ value }) => {
        if (!value) return <></>;
        // Transform videoBlock to SanityVideo format for VideoRenderer
        const video = {
          mediaType: value.mediaType,
          videoFile: value.videoFile ? { asset: value.videoFile.asset } : undefined,
          videoUrl: value.videoUrl,
          posterImage: value.posterImage ? { asset: value.posterImage.asset } : undefined,
          caption: value.caption,
        };
        return <VideoRenderer video={video} className="my-6" />;
      },
    },
  };
};

const RichText: FC<Props> = ({ classNames = {}, defaultClassNames, value }) => (
  <PortableText
    value={value}
      components={getComponents(
      defaultClassNames
        ? merge(defaultClassNamesDefinitions[defaultClassNames], classNames)
        : classNames,
      ) as PortableTextReactComponents}
  />
);

export default RichText;
