import { SanityLink } from "../types/documents";
import { getReferenceUrl } from "./sanityLinkToLinkList";

type LinkAttributes = {
  href: string;
  target?: string;
};

const getLinkAttributes = (link?: SanityLink): LinkAttributes => {
  switch (link?.type) {
    case "reference":
      return {
        href: getReferenceUrl(link.reference),
        target: link.target,
      };
    default:
      return {
        href: link?.url ?? "#",
        target: link?.target,
      };
  }
};

export default getLinkAttributes;
