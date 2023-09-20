import { cn } from "@/lib/utils";
import Link from "next/link";

type CategoryTabItem = {
  title: string;
  linkTo: string;
  active: boolean;
};

const CategoryTabs = ({ categories }: { categories: CategoryTabItem[] }) => {
  return (
    <div className="bg-neutral-100 text-neutral-900">
      <ul className="container mx-auto flex h-20 items-stretch gap-14">
        {categories.map((category) => (
          <li
            className={cn(
              category.active && "bg-white font-bold",
              "flex flex-col justify-center",
            )}
            key={category.linkTo}
          >
            <Link className="p-6" href={category.linkTo}>
              {category.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export { CategoryTabs };
