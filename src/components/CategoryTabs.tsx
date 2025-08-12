// components/CategoryTabs.tsx
"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type CategoryTabItem = {
  title: string;
  linkTo: string;
  active: boolean;
};

type Props = {
  categories: CategoryTabItem[];
  onSelect?: (item: CategoryTabItem) => void;
  className?: string;
};

export function CategoryTabs({ categories, onSelect, className }: Props) {
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  // detect overflow + update arrows
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const update = () => {
      setCanLeft(el.scrollLeft > 0);
      setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
    };
    update();
    el.addEventListener("scroll", update);
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, []);

  const scrollBy = (x: number) =>
    scrollerRef.current?.scrollBy({ left: x, behavior: "smooth" });

  return (
    <div className={cn("relative bg-white md:bg-neutral-100", className)}>
      {/* arrows (mobile only) */}
      <button
        type="button"
        aria-label="Scroll left"
        onClick={() => scrollBy(-240)}
        disabled={!canLeft}
        className={cn(
          "absolute left-2 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border bg-white shadow md:hidden",
          !canLeft && "opacity-40"
        )}
      >
        ‹
      </button>

      <div className="md:container md:mx-auto">
        <ul
          ref={scrollerRef}
          role="tablist"
          className="
            no-scrollbar
            flex h-16 items-center gap-4 overflow-x-auto scroll-smooth
            max-md:px-4
            md:h-auto md:flex-wrap md:gap-6 md:overflow-visible md:px-0 md:py-2
          "
        >
          {categories.map((category) => {
            const isActive = category.active;
            return (
              <li
                key={`${category.linkTo}-${category.title}`}
                role="presentation"
                className={cn(
                  "flex flex-col justify-center whitespace-nowrap",
                )}
              >
                <Link
                  role="tab"
                  aria-selected={isActive}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm md:rounded-none md:border-0 md:px-5 md:py-3",
                    isActive
                      ? "bg-black text-white md:bg-white md:font-semibold md:text-neutral-900"
                      : "border-neutral-300 max-md:bg-neutral-200 hover:bg-neutral-100"
                  )}
                  href={category.linkTo}
                  onClick={(e) => {
                    if (onSelect) {
                      e.preventDefault();
                      e.stopPropagation();
                      onSelect(category);
                    }
                  }}
                >
                  {category.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <button
        type="button"
        aria-label="Scroll right"
        onClick={() => scrollBy(240)}
        disabled={!canRight}
        className={cn(
          "absolute right-2 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border bg-white shadow md:hidden",
          !canRight && "opacity-40"
        )}
      >
        ›
      </button>

      {/* edge fades (mobile only) */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white to-transparent md:hidden" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white to-transparent md:hidden" />
    </div>
  );
}
