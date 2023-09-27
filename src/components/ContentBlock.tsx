import { forwardRef, type ReactNode } from "react";
import isArray from "lodash/isArray";
import Image from "next/image";
import { Cta } from "./ui/button";
import { cn } from "@/lib/utils";
import { SanityImage } from "@/sanity/types/documents";

type CTA = {
  text: string;
  url: string;
};

type ContentBlockProps = {
  align: "left" | "right" | "center";
  verticalAlign?: "top" | "center" | "bottom" | "stretch";
  className?: string;
  image?: SanityImage;
  heading: string;
  body?: ReactNode;
  cta: CTA | CTA[];
};

const alignStyles: Record<string, string> = {
  left: "",
  center: "lg:justify-center",
  right: "lg:flex-row-reverse",
};

const verticalAlignStyles: Record<string, string> = {
  top: "items-start",
  center: "items-center",
  bottom: "items-end",
  stretch: "items-stretch",
};

const ContentBlock = forwardRef<HTMLDivElement, ContentBlockProps>(
  (
    {
      className,
      heading,
      body,
      image,
      align = "left",
      verticalAlign = "center",
      cta,
    },
    ref,
  ) => {
    const buttons = isArray(cta) ? cta : cta ? [cta] : [];
    return (
      <div
        className={cn(
          "container mx-auto flex flex-col gap-4 md:gap-10 lg:flex-row lg:gap-20",
          alignStyles[align],
          verticalAlignStyles[verticalAlign],
          className,
        )}
        ref={ref}
      >
        <div className="basis-1/2 max-md:px-4 lg:basis-3/5">
          <h3 className="pb-8 text-3xl font-black text-blue md:text-3xl lg:text-5xl">
            {heading}
          </h3>
          {!!body && <div className="text-lg [&>p]:pb-4">{body}</div>}
          <div className="flex flex-wrap justify-stretch gap-4 max-md:mb-4">
            {buttons.map(({ text }, index) => (
              <Cta key={index} className="max-md:w-full">
                {text}
              </Cta>
            ))}
          </div>
        </div>
        {align !== "center" && (
          <div className="relative basis-1/2 lg:basis-2/5">
            <Image
              src={image?.asset?.url ?? ""}
              objectFit="cover"
              fill={verticalAlign === "stretch" ? true : false}
              width={
                verticalAlign !== "stretch"
                  ? image?.asset?.metadata?.dimensions.width
                  : undefined
              }
              height={
                verticalAlign !== "stretch"
                  ? image?.asset?.metadata?.dimensions.height
                  : undefined
              }
              alt={""}
            />
          </div>
        )}
      </div>
    );
  },
);
ContentBlock.displayName = "ContentBlock";

export { ContentBlock };
