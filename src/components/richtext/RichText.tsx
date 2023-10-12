import type { FC, ReactNode } from "react";
import { PortableText, PortableTextReactComponents } from "@portabletext/react";
import Image from "next/image";
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

const defaultClassNamesDefinitions: Record<
  DefaultClassNames,
  RichTextClassNames
> = {
  standard: {
    block: {
      normal: "mb-1 last-of-type:mb-0",
      h1: "text-3xl font-bold mb-4",
      h2: "text-2xl font-semibold mb-3",
      h3: "text-xl font-medium mb-2",
      h4: "text-lg font-medium mb-2",
      h5: "text-md mb-1",
      h6: "text-sm mb-1",
    },
    list: {
      bullet: "list-disc pl-6 mb-4",
      number: "list-decimal pl-6 mb-4",
    },
    listItem: {
      bullet: "mb-1",
      number: "mb-1",
    },
    marks: {
      link: "underline",
    },
  },
};

const getImgSrc = (value: any, isInline: boolean): string => {
  try {
    return imageUrlBuilder(value)
      .width(isInline ? 200 : 1200)
      .fit("max")
      .auto("format")
      .url();
  } catch (exception) {
    return "";
  }
};

const getComponents = (
  classNames: RichTextClassNames,
): Partial<PortableTextReactComponents> => {
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
    )}
  />
);

export default RichText;
