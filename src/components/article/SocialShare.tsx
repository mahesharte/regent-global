import { cn } from "@/lib/utils";
import { Facebook, LinkedIn, X } from "../Icons";

const SocialShare = ({
  url,
  className,
}: {
  url?: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        className,
        "flex flex-col items-center border-t-2 border-neutral-500 p-8 pt-10 text-sm uppercase text-neutral-400",
      )}
    >
      <span className="font-bold">Share the good stuff</span>
      <svg className="mb-4 mt-3 h-[2.5px] w-8">
        <rect className="h-full w-full fill-blue" />
      </svg>
      <div className="mt-10 flex w-full justify-center">
        <a className="flex w-1/4 flex-col items-center gap-4">
          <Facebook className="fill-blue" />
          <span>Facebook</span>
        </a>
        <a className="flex w-1/4 flex-col items-center gap-4">
          <X className="fill-blue" />
          <span>X</span>
        </a>
        <a className="flex w-1/4 flex-col items-center gap-4">
          <LinkedIn className="fill-blue" />
          <span>LinkedIn</span>
        </a>
      </div>
    </div>
  );
};

export { SocialShare };
