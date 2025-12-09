import { cn } from "@/lib/utils";
import { useRouter } from "next/router";
import { useEffect } from "react";

export type GradientDirection = "NE" | "SE" | "SW" | "NW";

export const gradientDirections: Record<string, string> = {
  SE: "left-1/2 top-1/2",
  NE: "left-1/2 top-0",
  SW: "left-0 top-1/2",
  NW: "left-0 top-0",
};

const TeamImage = ({
  image,
  name,
  title,
  slug,
  gradientDirection,
  fadeToTransparent = false,
}: {
  image: string;
  name: string;
  title: string;
  slug?: string;
  gradientDirection?: GradientDirection;
  fadeToTransparent?: boolean;
}) => {
  const router = useRouter();

  useEffect(() => {
    if (!slug) return;

    const handleRouteError = (err: any, url: string) => {
      try {
        if (typeof url === "string" && url.includes(`/team/${slug}`)) {
          console.warn(
            "routeChangeError detected — falling back to full load"
          );
          window.location.href = url;
        }
      } catch (e) {
        console.error("Error handling routeChangeError fallback:", e);
      }
    };

    router.events.on("routeChangeError", handleRouteError);

    return () => {
      router.events.off("routeChangeError", handleRouteError);
    };
  }, [router.events, slug]);

  // Always force a full page load, no loading state needed
  const handleViewBio = () => {
    if (!slug) return;

    try {
      console.log(`Forcing full-page navigation to /team/${slug}`);
      window.location.assign(`/team/${slug}`);
    } catch (err) {
      console.error("Full-page navigation failed, attempting router.push:", err);
      void router.push(`/team/${slug}`);
    }
  };

  return (
    <div className="flex max-w-xs flex-col text-center text-sm font-bold">
      <div className="relative mb-5 aspect-square bg-green-200 [clip-path:circle(50%)] group">
        <img
          className="absolute inset-0 z-10 block w-full"
          src={image}
          alt={name}
        />

        {!!gradientDirection && (
          <div
            className={cn(
              "absolute z-10 h-1/2 w-1/2 bg-gradient-to-r",
              fadeToTransparent
                ? "from-transparent from-40% via-red/10 via-60% to-red/80"
                : "from-red/30 via-red via-40% to-blue",
              gradientDirections[gradientDirection]
            )}
          />
        )}

        {/* Hover Bio Button */}
        {slug && (
          <div className="absolute inset-0 z-20 flex items-end justify-center pb-4 bg-black/0 transition-all duration-300 group-hover:bg-black/40 cursor-pointer">
            <button
              onClick={handleViewBio}
              className="rounded-full bg-white px-5 py-2 text-xs font-bold text-black opacity-0 transition-opacity duration-300 group-hover:opacity-100 inline-block hover:bg-gray-100"
            >
              Read bio
            </button>
          </div>
        )}
      </div>

      <span className="mb-1 text-base font-black">{name}</span>
      <span className="uppercase text-neutral-500">{title}</span>
    </div>
  );
};

export { TeamImage };
