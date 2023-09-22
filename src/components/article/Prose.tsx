import { cn } from "@/lib/utils";
import { forwardRef } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const Prose = forwardRef<HTMLDivElement, Props>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        className,
        "prose-md prose text-neutral-900",
        "prose-lead:text-2xl prose-lead:font-bold prose-lead:text-blue",
        "prose-h1:scroll-my-5",
        "prose-h2:scroll-my-5",
        "prose-h3:scroll-my-5",
        "prose-h4:scroll-my-5",
        "prose-h5:scroll-my-5",
        "prose-h6:scroll-my-5",
        "prose-p:text-lg",
      )}
      {...props}
    />
  ),
);
Prose.displayName = "Prose";

export { Prose };
