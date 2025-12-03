import { forwardRef, ReactNode, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import Image from "next/image";
import { SanityImage, Theme } from "@/sanity/types/documents";
import imageUrlBuilder from "@/sanity/utils/imageUrlBuilder";
import { useAppContext } from "@/components/app/context";
import { useBreakpoint } from "@/lib/hooks/useBreakpoint";

// Lightweight internal carousel (avoids Swiper dependency/type mismatches)

export type Slide = {
  image: SanityImage;
  alt?: string;
  caption?: string;
  order?: number;
};

type Props = {
  children?: ReactNode;
  heading?: string;
  className?: string;
  slides?: Slide[]; // array of slides coming from Sanity
  theme?: Theme;
  minSlides?: number; // minimum slides to enable carousel behaviour. default 3
  autoplayDelay?: number; // milliseconds, default 5000
};

const HeroCarousel = forwardRef<HTMLDivElement, Props>(
  (
    {
      children,
      heading,
      className,
      slides = [],
      theme = "dark",
      minSlides = 3,
      autoplayDelay = 5000,
    },
    ref,
  ) => {
    // sort by order so Studio ordering is respected
    const ordered = slides.slice().sort((a, b) => (a.order || 0) - (b.order || 0));
    const hasCarousel = ordered.length >= (minSlides || 3);

    // nothing to render
    // Hooks must be called unconditionally, so declare them before any early returns
    const [active, setActive] = useState(0);
    const timerRef = useRef<number | null>(null);
    const pausedRef = useRef(false);
    const [appState] = useAppContext();

    const [hydrated, setHydrated] = useState(false);
    useEffect(() => setHydrated(true), []);
    const isMobile = !useBreakpoint("md");
    const mobile = hydrated ? isMobile : false;
    const menuOpen = !!appState?.ui?.menuOpen;

    useEffect(() => {
      function next() {
        setActive((a) => (a + 1) % ordered.length);
      }

      if (!pausedRef.current) {
        timerRef.current = window.setInterval(next, autoplayDelay);
      }

      return () => {
        if (timerRef.current) window.clearInterval(timerRef.current);
      };
    }, [autoplayDelay, ordered.length]);

    useEffect(() => {
      function onKey(e: KeyboardEvent) {
        if (e.key === "ArrowRight") setActive((a) => (a + 1) % ordered.length);
        if (e.key === "ArrowLeft") setActive((a) => (a - 1 + ordered.length) % ordered.length);
      }

      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }, [ordered.length]);

    if (!ordered || ordered.length === 0) return null;

    // shared wrapper classes to mirror your existing Hero
    const wrapperClasses = clsx(
      "relative flex aspect-[3/1] max-w-full items-center px-9 py-24 md:px-16 md:py-36",
      theme === "light" ? "text-black" : "text-white",
      className,
    );

    // single-image fallback that keeps layout consistent with existing Hero
    if (!hasCarousel) {
      const s = ordered[0];
      const src = imageUrlBuilder(s.image).url();

      return (
        <div ref={ref} className={wrapperClasses} aria-label="Hero">
          {s?.image?.asset?.url && (
            <Image
              className="-z-10"
              src={src}
              fill
              style={{ objectFit: "cover" }}
              alt={s.alt || s.image?.asset?.title || ""}
              priority
            />
          )}

          {!!heading && (
            <div className="container mx-auto">
              <h1
                className={clsx(
                  "text-4xl font-black md:text-5xl lg:w-3/4 lg:text-7xl",
                  theme === "light" ? "text-blue" : "text-white",
                )}
              >
                {heading}
              </h1>
            </div>
          )}

          {s.caption && (
            <div className="absolute bottom-6 left-6 p-3 bg-black/40 text-white rounded max-w-[70%]">
              {s.caption}
            </div>
          )}

          {children}
        </div>
      );
    }

    // Lightweight carousel implementation
    return (
      <div
        ref={ref}
        className={wrapperClasses}
        aria-roledescription="carousel"
        aria-label="Hero carousel"
        onMouseEnter={() => {
          pausedRef.current = true;
          if (timerRef.current) window.clearInterval(timerRef.current);
        }}
        onMouseLeave={() => {
          pausedRef.current = false;
          if (timerRef.current) window.clearInterval(timerRef.current);
          timerRef.current = window.setInterval(() => setActive((a) => (a + 1) % ordered.length), autoplayDelay);
        }}
      >
        {ordered.map((s, i) => {
          const src = imageUrlBuilder(s.image).url();
          const altText = s.alt || s.image?.asset?.title || `Slide ${i + 1}`;

          return (
            <Image
              key={`${i}-${String(s.image?.asset?._ref ?? s.image?.asset?._id ?? i)}`}
              className={clsx(
                "-z-10 absolute inset-0 object-cover transition-opacity duration-700",
                i === active ? "opacity-100" : "opacity-0",
              )}
              src={src}
              fill
              style={{ objectFit: "cover" }}
              alt={altText}
              priority={i === 0}
            />
          );
        })}

            {/* Title - render once like the standard Hero component */}
            {!!heading && !(menuOpen && mobile) && (
              <div className="container mx-auto relative z-20">
                <h1
                  className={clsx(
                    "text-4xl font-black md:text-5xl lg:w-3/4 lg:text-7xl",
                    theme === "light" ? "text-blue" : "text-white",
                  )}
                >
                  {heading}
                </h1>
              </div>
            )}

        {/* active slide caption */}
        {ordered[active]?.caption && !(menuOpen && mobile) && (
          <div className="absolute bottom-6 left-6 p-3 bg-black/40 text-white rounded max-w-[70%] z-30">
            {ordered[active].caption}
          </div>
        )}

        {/* pagination dots */}
        {!(menuOpen && mobile) && (
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
            {ordered.map((_, i) => (
              <button
                key={`dot-${i}`}
                aria-label={`Go to slide ${i + 1}`}
                className={clsx(
                  "w-3 h-3 rounded-full",
                  i === active ? "bg-white" : "bg-white/50",
                )}
                onClick={() => setActive(i)}
              />
            ))}
          </div>
        )}

        {children}
      </div>
    );
  },
);

HeroCarousel.displayName = "HeroCarousel";

export { HeroCarousel };
export default HeroCarousel;
