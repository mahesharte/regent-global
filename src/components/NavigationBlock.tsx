import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { Cta } from "@/components/ui/button";
import Link from "next/link";

type Links = {
  url: string;
  title: string;
  text: string;
};

type Props = {
  className?: string;
  headline: string;
  items: Links[];
};

const NavigationBlock = forwardRef<HTMLDivElement, Props>(
  ({ className, headline, items }, ref) => {
    return (
      <div
        className={cn("container mx-auto py-10 lg:py-20", className)}
        ref={ref}
      >
        <h2 className="pb-6 text-center text-3xl font-black text-blue md:pb-16 md:text-5xl">
          {headline}
        </h2>
        <ul className="flex flex-col flex-wrap gap-4 md:flex-row">
          {items.map((item, i) => (
            <li
              key={i}
              className="shad flex flex-col gap-4 rounded-sm border border-neutral-200/50 p-4 shadow-lg max-md:mx-4 md:basis-[calc(50%-16px)] md:items-center md:py-6 md:text-center lg:basis-[calc(25%-16px)]"
            >
              <div className="flex items-center gap-4 md:flex-col">
                <Logo className="h-8 md:h-16" fill="blue" />
                <span className="text-xl font-bold text-blue">
                  {item.title}
                </span>
              </div>
              <p className="text-sm md:text-base">{item.text}</p>
              <Cta>
                <Link href={item.url}>Learn more</Link>
              </Cta>
            </li>
          ))}
        </ul>
      </div>
    );
  },
);
NavigationBlock.displayName = "NavigationBlock";

export { NavigationBlock };
