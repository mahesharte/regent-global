import { cn } from "@/lib/utils";

type HeadingLink = {
  title: string;
  id: string;
};

const SidebarLinks = ({
  headings,
  className,
}: {
  headings: HeadingLink[];
  className?: string;
}) => {
  return (
    <aside className={cn(className, "flex flex-col gap-4 text-sm font-bold")}>
      <span className="uppercase text-neutral-900">Browse the Content</span>
      {headings.map((heading, i) => (
        <div key={i} className="flex gap-5">
          <svg className="mb-4 mt-3 h-[1px] w-8">
            <rect className="h-full w-full fill-neutral-500" />
          </svg>
          <span className="text-neutral-400">{heading.title}</span>
        </div>
      ))}
    </aside>
  );
};

export { SidebarLinks };
