import { cn } from "@/lib/utils";

const Prose = ({
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={cn(
      className,
      "prose-md prose text-neutral-900",
      "prose-lead:text-2xl prose-lead:font-bold prose-lead:text-blue",
      "prose-p:text-lg",
    )}
    {...props}
  />
);

export { Prose };
