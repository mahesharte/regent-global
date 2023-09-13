import type { FC } from 'react';

import { useAppContext } from '@/components/app/context';
import inIframe from '@/utils/inIframe';
import dynamic from 'next/dynamic';

type Props = {};

const Banner = dynamic(() => import('@/components/preview/Banner'));

const Footer: FC<Props> = () => {
  const [{ preview }] = useAppContext();
  return (
    <footer>
      <div>Footer</div>
      {preview.active && !inIframe() && <Banner loading={preview.loading} />}
    </footer>
  );
};

export default Footer;
