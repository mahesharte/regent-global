import { forwardRef, type ReactNode } from "react";
import isArray from "lodash/isArray";

import { Cta } from "./ui/button";
import { cn } from "@/lib/utils";

type CTA = {
  text: string;
  url: string;
};

type ContentBlockProps = {
  align: "left" | "right" | "center";
  className?: string;
  image?: string;
  heading: string;
  body?: ReactNode;
  cta: CTA | CTA[];
};

const alignStyles: Record<string, string> = {
  left: "",
  center: "justify-center",
  right: "flex-row-reverse",
};

const ContentBlock = forwardRef<HTMLDivElement, ContentBlockProps>(
  ({ className, heading, body, image, align = "left", cta }, ref) => {
    const buttons = isArray(cta) ? cta : cta ? [cta] : [];
    return (
      <div
        className={cn(
          "container mx-auto flex gap-4",
          alignStyles[align],
          className,
        )}
        ref={ref}
      >
        <div className="basis-3/5">
          <h3 className="pb-8 text-6xl font-black text-blue">{heading}</h3>
          {!!body && <div className="text-lg [&>p]:pb-8">{body}</div>}
          <div className="flex justify-end gap-4">
            {buttons.map(({ text }, index) => (
              <Cta key={index}>{text}</Cta>
            ))}
          </div>
        </div>
        {align !== "center" && (
          <div className="basis-2/5">
            <img src={image} />
          </div>
        )}
      </div>
    );
  },
);
ContentBlock.displayName = "ContentBlock";

export { ContentBlock };
