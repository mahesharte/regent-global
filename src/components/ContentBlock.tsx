import { forwardRef, Fragment, type ReactNode } from "react";
import isArray from "lodash/isArray";
import Image from "next/image";
import { Cta } from "./ui/button";
import { cn } from "@/lib/utils";
import { SanityImage } from "@/sanity/types/documents";
import { SanityButton } from "@/sanity/types/objects";
import imageUrlBuilder from "@/sanity/utils/imageUrlBuilder";
import { Illustration } from "./Illustration";
import Button from "./button/Button";

type CTA = {
  text: string;
  url: string;
};

type ContentBlockProps = {
  align: "left" | "right" | "center";
  verticalAlign?: "top" | "center" | "bottom" | "stretch";
  className?: string;
  image?: SanityImage;
  animateImage?: boolean;
  heading: string;
  body?: ReactNode;
  cta: CTA | SanityButton | CTA[] | SanityButton[];
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
      animateImage = false,
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
        <div className="basis-1/2 px-4 lg:basis-3/5">
          <h3 className="pb-8 text-3xl font-black text-blue md:text-3xl lg:text-5xl">
            {heading}
          </h3>
          {!!body && (
            <div className="text-lg [&>p:last-of-type]:pb-0 [&>p]:pb-4">
              {body}
            </div>
          )}
          {buttons.length > 0 && (
            <div className="mt-8 flex flex-wrap justify-stretch gap-4 max-md:mb-4">
              {buttons.map((button, index) => (
                <Fragment key={index}>
                  {(button as CTA).text ? (
                    <Cta className="max-md:w-full">{(button as CTA).text}</Cta>
                  ) : (
                    <Button
                      button={button as SanityButton}
                      className="max-md:w-full"
                    />
                  )}
                </Fragment>
              ))}
            </div>
          )}
        </div>
        {align !== "center" && (
          <div className="relative basis-1/2 lg:basis-2/5">
            {!!image?.asset?.url && (
              <>
                {image?.asset?.extension === "svg" ? (
                  <Illustration
                    width={image.asset.metadata.dimensions.width}
                    height={image.asset.metadata.dimensions.height}
                    svgImageUrl={image.asset.url}
                    animate={animateImage}
                  />
                ) : (
                  <Image
                    src={imageUrlBuilder(image).url()}
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
                )}
              </>
            )}
          </div>
        )}
      </div>
    );
  },
);
ContentBlock.displayName = "ContentBlock";

export { ContentBlock };
