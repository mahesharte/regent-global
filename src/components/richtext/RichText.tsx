'use client';

import type { FC, ReactNode } from "react";
import { useRouter } from "next/router";
import { useState } from "react";
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
  GatedPdfLink,
} from "@/sanity/types/objects";
import imageUrlBuilder from "@/sanity/utils/imageUrlBuilder";
import AccessGateModal from "@/components/AccessGateModal";

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
  pageSlug?: string;
};
type BlockComponentProps = {
  children: ReactNode;
  className?: string;
};
type LinkProps = {
  href?: string;
};
type GatedPdfLinkProps = GatedPdfLink & {
  _key?: string;
};
type MarkComponentProps = {
  children: ReactNode;
  className?: string;
  value: LinkProps | GatedPdfLinkProps;
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

// GatedPdfLink mark component - needs interactivity so defined outside marksComponents
type GatedPdfLinkMarkProps = {
  children: ReactNode;
  className?: string;
  value: GatedPdfLinkProps;
  onOpen: (pdfData: GatedPdfLinkProps) => void;
};
const GatedPdfLinkMark: FC<GatedPdfLinkMarkProps> = ({
  children,
  className,
  value,
  onOpen,
}) => {
  console.log('🎯 GatedPdfLinkMark component rendered with value:', value);
  return (
    <button
      type="button"
      onClick={() => {
        console.log('👆 PDF link clicked!', value);
        onOpen(value);
      }}
      className={`${className} cursor-pointer bg-transparent p-0 font-inherit text-inherit underline`}
      aria-label="Download gated PDF"
    >
      {children}
    </button>
  );
};

const marksComponents: Record<"link", FC<MarkComponentProps>> = {
  link: ({ children, className, value }) => (
    <a className={className} href={(value as LinkProps).href}>
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
      gatedPdfLink: "text-blue-600 underline hover:text-blue-800 cursor-pointer",
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

const getComponents = (
  classNames: RichTextClassNames,
  onGatedPdfLinkOpen?: (pdfData: GatedPdfLinkProps) => void
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
  const marks: PortableTextReactComponents["marks"] = {
    link: ({ children, value }) => (
      <a
        className={classNames.marks?.link}
        href={(value as LinkProps).href}
      >
        {children}
      </a>
    ),
    gatedPdfLink: ({ children, value }) => (
      <GatedPdfLinkMark
        className={classNames.marks?.gatedPdfLink}
        value={value as GatedPdfLinkProps}
        onOpen={onGatedPdfLinkOpen || (() => {})}
      >
        {children}
      </GatedPdfLinkMark>
    ),
  };

  return {
    ...(isEmpty(block) ? {} : { block }),
    ...(isEmpty(list) ? {} : { list }),
    ...(isEmpty(listItem) ? {} : { listItem }),
    marks,
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

const RichText: FC<Props> = ({
  classNames = {},
  defaultClassNames,
  value,
  pageSlug: pageSluProp,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState<GatedPdfLinkProps | null>(null);
  const router = useRouter();

  // Auto-capture page slug from router if not provided
  const pageSlug = pageSluProp || router.asPath.split("?")[0] || router.pathname;

  const handleGatedPdfLinkOpen = (pdfData: GatedPdfLinkProps) => {
    console.log('🔍 Gated PDF Link opened with data:', pdfData);
    setSelectedPdf(pdfData);
    setIsModalOpen(true);
  };

  const handleModalSubmit = async (data: {
    organisationName: string;
    email: string;
  }) => {
    if (!selectedPdf) {
      throw new Error("Missing PDF information");
    }

    if (!pageSlug) {
      throw new Error("Missing page information");
    }

    // Handle file reference - Sanity can store it in multiple formats
    let pdfFileRef: string | undefined;
    let pdfExternalUrl: string | undefined = selectedPdf.pdfExternalUrl;
    
    if (selectedPdf.pdfFile) {
      console.log('🔍 pdfFile value:', selectedPdf.pdfFile);
      
      // Try multiple extraction paths for the file reference
      const fileObj = selectedPdf.pdfFile as any;
      
      if (typeof fileObj === 'string') {
        pdfFileRef = fileObj;
      } else if (typeof fileObj === 'object') {
        // Most likely path: pdfFile.asset._ref
        pdfFileRef = fileObj?.asset?._ref || fileObj?._ref;
      }
    }

    console.log('📤 Extracted PDF data:', {
      pdfFileRef,
      pdfExternalUrl,
      hasPdfFile: !!selectedPdf.pdfFile,
      pdfFileObject: selectedPdf.pdfFile,
    });

    // Validate that at least one PDF source is provided
    if (!pdfFileRef && !pdfExternalUrl) {
      throw new Error('Either PDF file or external URL must be provided');
    }

    const response = await fetch("/api/pdf-gate-submission", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        organisationName: data.organisationName,
        email: data.email,
        pageSlug,
        pdfLabel: selectedPdf.label,
        pdfFileRef,
        pdfExternalUrl,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to process PDF request");
    }

    const result = await response.json();
    setIsModalOpen(false);

    // Open PDF in new tab
    if (result.pdfUrl) {
      window.open(result.pdfUrl, "_blank");
    }
  };

  const components = getComponents(
    defaultClassNames
      ? merge(defaultClassNamesDefinitions[defaultClassNames], classNames)
      : classNames,
    handleGatedPdfLinkOpen
  ) as PortableTextReactComponents;

  return (
    <>
      <PortableText value={value} components={components} />
      <AccessGateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        pageSlug={pageSlug}
        pdfLabel={selectedPdf?.label}
      />
    </>
  );
};

export default RichText;
