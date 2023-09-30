import { cn } from "@/lib/utils";

type HeadingLink = {
  title: string;
  id: string;
};

const SidebarLinks = ({
  headings,
  className,
  onClick,
}: {
  headings: HeadingLink[];
  className?: string;
  onClick?: (id: string) => void;
}) => {
  return (
    <aside className={cn(className, "flex flex-col gap-4 text-sm font-bold pr-6")}>
      <span className="uppercase text-neutral-900">Browse the Content</span>
      {headings.map((heading, i) => (
        <button
          key={i}
          className="group flex cursor-pointer gap-5 text-left"
          onClick={() => onClick?.(heading.id)}
        >
          <svg className="mb-4 mt-3 h-[1px] w-8 min-w-[32px]">
            <rect className="h-full w-full fill-neutral-500 group-hover:fill-blue" />
          </svg>
          <span className="text-neutral-400 group-hover:text-blue">
            {heading.title}
          </span>
        </button>
      ))}
    </aside>
  );
};

export { SidebarLinks };
