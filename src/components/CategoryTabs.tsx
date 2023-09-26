import { cn } from "@/lib/utils";
import Link from "next/link";

export type CategoryTabItem = {
  title: string;
  linkTo: string;
  active: boolean;
};
type Props = {
  categories: CategoryTabItem[];
  onSelect?: (item: CategoryTabItem) => void;
};

const CategoryTabs = ({ categories, onSelect }: Props) => {
  return (
    <div className="overflow-x-scroll text-neutral-900 md:bg-neutral-100">
      <ul className="flex h-20 items-center gap-4 md:container max-md:px-4 md:mx-auto md:items-stretch md:gap-14">
        {categories.map((category) => (
          <li
            className={cn(
              "radius flex flex-col justify-center  whitespace-nowrap rounded-full  md:rounded-none",
              category.active
                ? "bg-black text-white md:bg-white md:font-bold md:text-neutral-900"
                : "max-md:bg-neutral-200",
            )}
            key={category.linkTo}
          >
            <Link
              className="px-4 py-2 md:p-6"
              href={category.linkTo}
              onClick={(event) => {
                if (onSelect) {
                  onSelect(category);
                  event.preventDefault();
                  event.stopPropagation();
                }
              }}
            >
              {category.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export { CategoryTabs };
