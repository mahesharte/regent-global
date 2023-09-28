import type { SanitySection } from "@/sanity/types/documents";
import type { FC } from "react";
import Image from "next/image";

import { FourColumns } from "@/components/FourColumns";
import RichText from "@/components/richtext/RichText";
import useDynamicStyles from "@/lib/hooks/useDynamicStyles";
import Blocks from "./Blocks";
import Cards from "./Cards";
import { useSectionStyles } from "../utils";

type Props = {
  section: SanitySection;
};

const MultiColumn: FC<Props> = ({ section }) => {
  const styles = useSectionStyles(section, ["gradient", "margin", "padding"]);
  const { className, ref } = useDynamicStyles<HTMLDivElement>(styles);
  switch (section.variant) {
    case "blocks":
      return <Blocks ref={ref} className={className} section={section} />;
    case "cards":
      return <Cards ref={ref} className={className} section={section} />;
    default:
      return (
        <FourColumns
          ref={ref}
          className={className}
          theme={section.styleTheme}
          columns={(section.items ?? []).map((item) => ({
            headline: item.title,
            icon: (
              <>
                {!!item.image && (
                  <Image
                    className="inline"
                    src={item.image.asset?.url ?? ""}
                    alt={item.title ?? ""}
                    width={24}
                    height={24}
                  />
                )}
              </>
            ),
            body: (
              <RichText
                value={item.content ?? []}
                defaultClassNames="standard"
              />
            ),
          }))}
        />
      );
  }
};

export default MultiColumn;
