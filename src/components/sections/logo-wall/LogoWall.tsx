import type { SanitySection } from "@/sanity/types/documents";
import type { FC } from "react";

import { LogoWall as LogoWallComponent } from "@/components/LogoWall";
import useDynamicStyles from "@/lib/hooks/useDynamicStyles";
import { useSectionStyles } from "../utils";

type Props = {
  section: SanitySection;
};

const LogoWall: FC<Props> = ({ section }) => {
  const styles = useSectionStyles(section, ["gradient", "margin", "padding"]);
  const { className, ref } = useDynamicStyles<HTMLDivElement>(styles);
  return (
    <LogoWallComponent
      ref={ref}
      className={className}
      headline={section.title ?? ""}
      items={(section.links ?? []).map((link) => ({
        imageUrl: link.image?.asset?.url ?? "",
        text: link.title ?? "",
      }))}
    />
  );
};

export default LogoWall;
