import type { Dispatch, FC, ReactNode, SetStateAction } from 'react';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import noop from 'lodash/noop';

import { SanitySetting } from '@/sanity/types/documents';
import { SanityPageMeta } from '@/sanity/types/objects';

type AppState = {
  pageMeta: SanityPageMeta | null;
  preview: {
    active: boolean;
    loading: boolean;
  };
  setting: SanitySetting | null;
  ui?: {
    menuOpen?: boolean;
  };
};
type AppContextValue = [AppState, Dispatch<SetStateAction<AppState>>];
type AppProviderProps = {
  children: ReactNode;
  initialState: AppState;
};

const AppContext = createContext<AppContextValue>([
  {
    pageMeta: null,
    preview: {
      active: false,
      loading: false,
    },
    setting: null,
  },
  noop,
]);

const AppProvider: FC<AppProviderProps> = ({ children, initialState }) => {
  const [state, setState] = useState<AppState>(initialState);
  const { pageMeta, setting } = initialState;
  const value = useMemo<AppContextValue>(() => [state, setState], [state]);

  useEffect(() => {
    setState((prev) => ({
      ...prev,
      pageMeta,
      setting,
    }));
  }, [pageMeta, setting]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextValue => useContext(AppContext);

export default AppProvider;
