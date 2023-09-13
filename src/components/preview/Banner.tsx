/* eslint-disable @next/next/no-html-link-for-pages */
import { useState, type FC, useEffect } from 'react';
import clsx from 'clsx';

type Props = {
  loading?: boolean;
};

const Banner: FC<Props> = ({ loading }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 500);
  }, []);

  return (
    <div
      className={clsx(
        'bg-black/50 p-3 text-center text-white fixed left-0 right-0 bottom-0 pointer-events-none z-[1000] transition-opacity',
        loading && 'animate-pulse',
        show ? 'opacity-100' : 'opacity-0'
      )}
    >
      <span>Previewing draft content.</span>&nbsp;
      <a
        className="underline transition hover:opacity-50 pointer-events-auto"
        href="/api/disable-draft"
      >
        Disable draft mode
      </a>
    </div>
  );
};

export default Banner;
