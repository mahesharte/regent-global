import { forwardRef, type HTMLAttributes } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import RichText from "@/components/richtext/RichText";

type LogoWallItem = {
  imageUrl: string;
  text?: string;
  href?: string;
  target?: string;
  rel?: string;
};

type LogoWallProps = {
  className?: string;
  headline?: string;
  body?: any; // Portable Text
  theme?: "light" | "dark";
  items: LogoWallItem[];
} & HTMLAttributes<HTMLDivElement>;

export const LogoWall = forwardRef<HTMLDivElement, LogoWallProps>(
  ({ className, headline, body, theme = "light", items, ...rest }, ref) => {
    const isDark = theme === "dark";

    return (
      <section
        ref={ref}
        className={cn(
          "relative",
          "py-16 md:py-24",
          className // gradient + margin + padding from Sanity
        )}
        {...rest}
      >
        <div className="container mx-auto">
  {items.length > 0 ? (
    /* -----------------------------------------
       CASE 1 → LOGOS AVAILABLE (2-column layout)
       ----------------------------------------- */
    <div className="grid gap-12 md:grid-cols-2 items-center">
      {/* LEFT: Heading + rich text */}
      <div className="text-center mx-auto max-w-2xl">
        {headline && (
          <h2
            className={cn(
              "mb-6 text-3xl font-bold md:text-4xl",
              isDark ? "text-white" : "text-blue"
            )}
          >
            {headline}
          </h2>
        )}

        {body && (
          <div
            className={cn(
              "text-base leading-7 space-y-4",
              isDark ? "text-white/80" : "text-blue/80"
            )}
          >
            <RichText value={body} defaultClassNames="standard" />
          </div>
        )}
      </div>

      {/* RIGHT: Logo grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
        {items.map((item, idx) => {
          if (!item.imageUrl) return null;

          const logoElement = (
            <div
              key={idx}
              className={cn(
                "flex h-24 w-full items-center justify-center rounded-md p-4 bg-white/90 shadow-sm backdrop-blur",
                isDark ? "border border-white/10" : "border border-blue/10"
              )}
            >
              <Image
                src={item.imageUrl}
                alt={item.text || ""}
                width={150}
                height={80}
                className="h-auto w-full max-w-[130px] object-contain"
              />
            </div>
          );

          if (item.href) {
            return (
              <a
                key={idx}
                href={item.href}
                target={item.target}
                rel={item.rel}
                aria-label={item.text}
              >
                {logoElement}
              </a>
            );
          }

          return logoElement;
        })}
      </div>
    </div>
  ) : (
    /* ---------------------------------------------
       CASE 2 → NO LOGOS (centered full-width layout)
       --------------------------------------------- */
    <div className="text-center mx-auto max-w-2xl py-10">
      {headline && (
        <h2
          className={cn(
            "mb-6 text-3xl font-bold md:text-4xl",
            isDark ? "text-white" : "text-blue"
          )}
        >
          {headline}
        </h2>
      )}

      {body && (
        <div
          className={cn(
            "text-base leading-7 space-y-4",
            isDark ? "text-white/80" : "text-blue/80"
          )}
        >
          <RichText value={body} defaultClassNames="standard" />
        </div>
      )}
    </div>
  )}
</div>

      </section>
    );
  }
);

LogoWall.displayName = "LogoWall";
