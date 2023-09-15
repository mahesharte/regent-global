import type { FC } from 'react';
import { useRouter } from 'next/router';

import { Navbar } from '@/components/navbar';
import { SanityHeader } from '@/sanity/types/documents';
import { useAppContext } from '@/components/app/context';
import sanityLinkToLinkList from '@/sanity/utils/sanityLinkToLinkList';
import getArticleSlugPrefix from '@/sanity/utils/getArticleSlugPrefix';

type Props = {
  header?: SanityHeader | null;
};

const Header: FC<Props> = ({ header }) => {
  const [{ setting }] = useAppContext();
  const router = useRouter();
  const articlePrefix = getArticleSlugPrefix(setting);
  const links = (header?.links ?? []).map((link) =>
    sanityLinkToLinkList(link, {
      currentPath: router.asPath,
      prefixes: {
        article: articlePrefix,
      },
    })
  );
  return (
    <header className="p-[36px_115px_24px_77px]">
      <Navbar links={links} />
    </header>
  );
};

export default Header;
