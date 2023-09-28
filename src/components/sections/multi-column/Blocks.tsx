import { forwardRef } from "react";
import Image from "next/image";

import { SanitySection } from "@/sanity/types/documents";
import { cn } from "@/lib/utils";
import RichText from "@/components/richtext/RichText";

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

const Blocks = forwardRef<HTMLDivElement, Props>(
  ({ className, section }, ref) => (
    <div className={className} ref={ref}>
      <div className="container mx-auto">
        <div className="flex flex-col gap-14 md:flex-row">
          {section.items?.map((item) => (
            <div
              className={cn(
                "flex basis-full flex-col",
                basis[(section.items?.length ?? 1) - 1],
              )}
              key={item._key}
            >
              {!!item.image?.asset?.url && (
                <div className="mb-14 h-[386px]">
                  <Image
                    className="h-full w-full object-cover"
                    src={item.image.asset.url}
                    width={item.image.asset.metadata.dimensions.width}
                    height={item.image.asset.metadata.dimensions.height}
                    alt={item.title}
                  />
                </div>
              )}
              {!!item.title && (
                <h2
                  className={cn(
                    "mb-11 px-4 text-5xl font-black leading-[56px] md:px-0",
                    section.styleTheme === "dark" ? "text-white" : "text-blue",
                  )}
                >
                  {item.title}
                </h2>
              )}
              {!!item.content && (
                <div
                  className={cn(
                    "px-4 md:px-0 [&>p:last-of-type]:pb-0 [&>p]:pb-4",
                    section.styleTheme === "dark" ? "text-white" : "text-black",
                  )}
                >
                  <RichText value={item.content} defaultClassNames="standard" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
);
Blocks.displayName = "Blocks";

export default Blocks;
