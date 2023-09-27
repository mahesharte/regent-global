import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from "react-share";

import { cn } from "@/lib/utils";
import { Facebook, LinkedIn, X } from "../Icons";

const SocialShare = ({
  url = "/",
  className,
}: {
  url?: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        className,
        "flex flex-col items-center border-t-2 border-neutral-200 p-8 pt-10 text-sm uppercase text-neutral-400",
      )}
    >
      <span className="font-bold">Share the good stuff</span>
      <svg className="mb-4 mt-3 h-[2.5px] w-8">
        <rect className="h-full w-full fill-blue" />
      </svg>
      <div className="mt-10 flex w-full justify-center">
        <FacebookShareButton
          className="flex basis-1/3 flex-col items-center gap-4"
          url={url}
        >
          <Facebook className="fill-blue" />
          <span>Facebook</span>
        </FacebookShareButton>
        <TwitterShareButton
          className="flex basis-1/3 flex-col items-center gap-4"
          url={url}
        >
          <X className="fill-blue" />
          <span>X</span>
        </TwitterShareButton>
        <LinkedinShareButton
          className="flex basis-1/3 flex-col items-center gap-4"
          url={url}
        >
          <LinkedIn className="fill-blue" />
          <span>LinkedIn</span>
        </LinkedinShareButton>
      </div>
    </div>
  );
};

export { SocialShare };
