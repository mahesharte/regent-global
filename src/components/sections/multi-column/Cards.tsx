import { forwardRef } from "react";
import Image from "next/image";

import { SanitySection } from "@/sanity/types/documents";
import { cn } from "@/lib/utils";
import RichText from "@/components/richtext/RichText";
import Button from "@/components/button/Button";

type Props = {
  className?: string;
  section: SanitySection;
};

const basis = [
  "",
  "md:basis-1/2",
  "md:basis-1/3",
  "md:basis-1/4",
  "md:basis-1/5",
  "md:basis-1/6",
  "md:basis-1/7",
  "md:basis-1/8",
  "md:basis-1/9",
  "md:basis-1/10",
  "md:basis-1/11",
  "md:basis-1/12",
];

const Cards = forwardRef<HTMLDivElement, Props>(
  ({ className, section }, ref) => (
    <div className={className} ref={ref}>
      <div className="container mx-auto">
        {!!section.title && (
          <h2
            className={cn(
              "mb-20 px-4 text-center text-[48px] font-black leading-[56px] md:px-0",
              section.styleTheme === "dark" ? "text-white" : "text-blue",
            )}
          >
            {section.title}
          </h2>
        )}
        <div className="flex flex-col gap-4 sm:flex-row">
          {section.items?.map((item) => (
            <div
              className={cn(
                "flex basis-full flex-col rounded-[4px] bg-white px-4 py-8 text-center shadow-[0px_4px_16px_0px_rgba(0,_0,_0,_0.15)]",
                basis[(section.items?.length ?? 1) - 1],
              )}
              key={item._key}
            >
              {!!item.image?.asset?.url && (
                <div className="mb-6 h-16">
                  <Image
                    className="h-full w-full object-contain"
                    src={item.image.asset.url}
                    width={item.image.asset.metadata.dimensions.width}
                    height={item.image.asset.metadata.dimensions.height}
                    alt={item.title}
                  />
                </div>
              )}
              {!!item.title && (
                <h2 className="mb-4 px-4 text-2xl font-bold leading-8 text-blue">
                  {item.title}
                </h2>
              )}
              {!!item.content && (
                <div className="flex-grow px-4 text-sm leading-6 md:px-0 [&>p:last-of-type]:pb-0 [&>p]:pb-4">
                  <RichText value={item.content} defaultClassNames="standard" />
                </div>
              )}
              {!!item.button?.title && (
                <div className="pt-6">
                  <Button button={item.button} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
);
Cards.displayName = "Cards";

export default Cards;
