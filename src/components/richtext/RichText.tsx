import type { FC } from "react";
import { PortableText } from "@portabletext/react";
import urlBuilder from "@sanity/image-url";
import fromPairs from "lodash/fromPairs";

import { getClient } from "@/sanity/client";
import { SanityRichtext } from "@/sanity/types/objects";
import Image from "next/image";

type RichTextClassNames = {
  block?: {
    [block: string]: string;
  };
};
type Props = {
  classNames?: RichTextClassNames;
  value: SanityRichtext;
};

const RichText: FC<Props> = ({ classNames = {}, value }) => (
  <PortableText
    value={value}
    components={{
      block: fromPairs(
        Object.keys(classNames.block ?? {}).map((block) => [
          block,
          ({ children }) => (
            <p className={classNames.block?.[block]}>{children}</p>
          ),
        ]),
      ),
      types: {
        image: ({ value, isInline }) => (
          <Image
            width={1200}
            height={900}
            alt={value.alt}
            loading="lazy"
            src={urlBuilder(getClient())
              .image(value)
              .width(isInline ? 200 : 1200)
              .fit("max")
              .auto("format")
              .url()}
          />
        ),
      },
    }}
  />
);

export default RichText;
