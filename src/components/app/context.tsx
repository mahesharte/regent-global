import type { Dispatch, FC, ReactNode, SetStateAction } from 'react';
import { createContext, useContext, useMemo, useState } from 'react';
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
  const value = useMemo<AppContextValue>(() => [state, setState], [state]);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextValue => useContext(AppContext);

export default AppProvider;
