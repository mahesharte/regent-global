import { cn } from "@/lib/utils";

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
  gradientDirection,
  fadeToTransparent = false,
}: {
  image: string;
  name: string;
  title: string;
  gradientDirection?: GradientDirection;
  fadeToTransparent?: boolean;
}) => {
  return (
    <div className="flex max-w-xs flex-col text-center text-sm font-bold">
      <div className="relative mb-5 aspect-square bg-green-200 [clip-path:circle(50%)]">
        <img className="absolute inset-0 z-10 block w-full" src={image} />
        {!!gradientDirection && (
          <div
            className={cn(
              "absolute z-10 h-1/2 w-1/2 bg-gradient-to-r",
              fadeToTransparent
                ? "from-transparent from-40% via-red/10 via-60% to-red/80"
                : "from-red/30 via-red via-40% to-blue",
              gradientDirections[gradientDirection],
            )}
          />
        )}
      </div>
      <span className="mb-1 text-base font-black">{name}</span>
      <span className="uppercase text-neutral-500">{title}</span>
    </div>
  );
};

export { TeamImage };
