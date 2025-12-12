// components/sections/heroCarousel/index.tsx
import type { SanitySection } from "@/sanity/types/documents";
import { useMemo, type FC } from "react";

import { BigText } from "@/components/bigtext";
import { HeroCarousel as HeroCarouselComponent } from "@/components/hero/HeroCarousel";
import useDynamicStyles, { DynamicStyles } from "@/lib/hooks/useDynamicStyles";
import imageUrlBuilder from "@/sanity/utils/imageUrlBuilder";
import { StyleName, useSectionStyles } from "../utils";
import { cn } from "@/lib/utils";
import Image from "next/image";

type Props = {
  section: SanitySection;
};

const HeroCarouselSection: FC<Props> = ({ section }) => {
  const variant = section.variant ?? "default";
  const styleNames = useMemo<StyleName[]>(() => {
    switch (variant) {
      case "image":
        return ["gradient", "margin"];
      default:
        return ["gradient", "margin", "padding"];
    }
  }, [variant]);

  const styles = useSectionStyles(section, styleNames);

  const withExtraStyles = useMemo<DynamicStyles>(() => {
    const extraStyles: DynamicStyles = {};
    if (variant === "image" && section.image) {
      const height = section.image.asset?.metadata?.dimensions?.height;
      extraStyles["h-[var(--hero-image-height-xs)]"] = [
        "--hero-image-height-xs",
        section?.styleFullSizeToggle ? "auto" : "25vh",
      ];
      extraStyles["md:h-[var(--hero-image-height-md)]"] = [
        "--hero-image-height-md",
        height ? `${height / 2}px` : "auto",
      ];
    }
    return {
      ...styles,
      ...extraStyles,
    };
  }, [section, styles, variant]);

  const { ref, className } = useDynamicStyles<HTMLDivElement>(withExtraStyles);

  // Normalise slides property names so editors can use heroCarousel, slides or images
  const rawSlides =
    (section.heroCarousel as any[]) ||
    (section.slides as any[]) ||
    (section.images as any[]) ||
    [];

  // Transform slides to match HeroCarousel Slide type
  const slides = rawSlides.map((slide) => ({
    image: slide.image,
    alt: slide.alt ?? "",
    caption: slide.caption ?? "",
    order: slide.order ?? 0,
  }));

  switch (variant) {
    case "bigText":
      return (
        <BigText
          ref={ref}
          className={className}
          heading={section.title ?? ""}
          subheading={section.subtitle}
          theme={section.styleTheme}
        />
      );

    case "image":
      return (
        section.image?.asset?.url && (
          <div ref={ref} className={cn("container mx-auto overflow-hidden")}>
            <Image
              className={cn(
                section?.styleFullSizeToggle ? "object-contain" : "object-cover",
                className,
              )}
              src={imageUrlBuilder(section.image).url()}
              width={section.image.asset.metadata.dimensions.width}
              height={section.image.asset.metadata.dimensions.height}
              alt={section.title ?? ""}
            />
          </div>
        )
      );

    default:
      // Default behaviour: render carousel when slides are present,
      // otherwise fall back to the standard single-image hero look using the main image.
      if (Array.isArray(slides) && slides.length > 0) {
        return (
          <HeroCarouselComponent
            ref={ref}
            className={className}
            slides={slides}
            heading={section.title ?? ""}
            theme={section.styleTheme}
            minSlides={section.minSlides ?? 3}
            autoplayDelay={section.autoplayDelay ?? 5000}
          >
            {/* keep children slot available for any overlays */}
            {section._rawBody && (
              <div className="absolute inset-0 flex items-center">
                {/* optional: if you want to render portable text or children */}
              </div>
            )}
          </HeroCarouselComponent>
        );
      }

      // If no slides present, fallback to the single-image hero (same as the existing Hero section)
      return (
        <div ref={ref}>
          {/* reuse same layout as your Hero section default */}
          <div className={className}>
            {section.image?.asset?.url && (
              <Image
                className="-z-10 object-cover"
                src={imageUrlBuilder(section.image).url()}
                fill
                style={{ objectFit: "cover" }}
                alt={section.image?.asset?.title ?? ""}
              />
            )}

            {!!section.title && (
              <div className="container mx-auto">
                <h1
                  className={cn(
                    "text-4xl font-black md:text-5xl lg:w-3/4 lg:text-7xl",
                    section.styleTheme === "light" ? "text-blue" : "text-white",
                  )}
                >
                  {section.title}
                </h1>
              </div>
            )}
          </div>
        </div>
      );
  }
};

export default HeroCarouselSection;
