import type { CSSProperties, ReactNode } from 'react';
import isArray from 'lodash/isArray';

import { Cta } from './ui/button';
import { cn } from '@/lib/utils';

type CTA = {
  text: string;
  url: string;
};

type ContentBlockProps = {
  align: "left" | "right" | "center";
  image?: string;
  heading: string;
  body?: ReactNode;
  cta: CTA | CTA[];
  style?: CSSProperties;
};

const alignStyles: Record<string, string> = {
  left: "",
  center: "justify-center",
  right: "flex-row-reverse",
};

const ContentBlock = ({
  heading,
  body,
  image,
  align = 'left',
  cta,
  style,
}: ContentBlockProps) => {
  const buttons = isArray(cta) ? cta : cta ? [cta] : [];
  return (
    <div
      className={cn('container mx-auto flex gap-4', alignStyles[align])}
      style={style}
    >
      <div className="basis-3/5">
        <h3 className="text-6xl font-black text-blue pb-8">{heading}</h3>
        {!!body && <div className="text-lg [&>p]:pb-8">{body}</div>}
        <div className="flex justify-end gap-4">
          {buttons.map(({ text }, index) => (
            <Cta key={index}>{text}</Cta>
          ))}
        </div>
      </div>
      {align !== 'center' && (
        <div className="basis-2/5">
          <img src={image} />
        </div>
      )}
    </div>
  );
};

export { ContentBlock };
