import type { SanitySection } from "@/sanity/types/documents";
import { PortableText } from "@portabletext/react";
import type { FC } from "react";
import Image from "next/image";

import { FourColumns } from "@/components/FourColumns";
import useDynamicStyles from "@/lib/hooks/useDynamicStyles";
import { useSectionStyles } from "../utils";

type Props = {
  section: SanitySection;
};

const MultiColumn: FC<Props> = ({ section }) => {
  const styles = useSectionStyles(section, ["gradient", "margin", "padding"]);
  const { className, ref } = useDynamicStyles<HTMLDivElement>(styles);
  return (
    <FourColumns
      ref={ref}
      className={className}
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
        body: <PortableText value={item.content ?? []} />,
      }))}
    />
  );
};

export default MultiColumn;
