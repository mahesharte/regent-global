import { ReactNode } from 'react';
import { Cta } from './ui/button';
import { cn } from '@/lib/utils';

type CTA = {
    text: string;
    url: string;
}

type ContentBlockProps = {
  align: 'left' | 'right' | 'center';
  image?: string;
  heading: string;
  body: string;
  cta: CTA | CTA[];
};

const alignStyles: Record<string, string> = {
    left: '',
    center: 'justify-center',
    right: 'flex-row-reverse'
}


const ContentBlock = ({heading, body, image, align = 'left'}: ContentBlockProps) => {
  return (
    <div className={cn('container mx-auto flex gap-4', alignStyles[align])}>
      <div className='basis-3/5'>
        <h3 className='text-6xl font-black text-blue pb-8'>{heading}</h3>
        <p className='text-lg pb-8'>{body}</p>
        <div className='flex justify-end gap-4'>
            <Cta>Button</Cta>
            <Cta>Button</Cta>
        </div>
      </div>
      {align !== 'center' && <div className='basis-2/5'>
        <img src={image} />
      </div>}
    </div>
  );
};

export { ContentBlock };
