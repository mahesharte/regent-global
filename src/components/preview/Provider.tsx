import { useMemo } from 'react';
import { LiveQueryProvider } from 'next-sanity/preview';
import type { FC, ReactNode } from 'react';

import { getClient } from '@/sanity/client';

type Props = {
  children: ReactNode;
  token: string;
};

const Provider: FC<Props> = ({ children, token }) => {
  const client = useMemo(() => getClient(token), [token]);
  return (
    <LiveQueryProvider client={client} logger={console}>
      {children}
    </LiveQueryProvider>
  );
};

export default Provider;
