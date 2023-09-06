import { createContext, useContext } from 'react';
import noop from 'lodash/noop';

import type { Dispatch, SetStateAction } from 'react';

export type StudioState = {
  iframes: HTMLIFrameElement[];
  scrollOffset: number;
};
export type StudioContextValue = [
  StudioState,
  Dispatch<SetStateAction<StudioState>>
];

const StudioContext = createContext<StudioContextValue>([
  { iframes: [], scrollOffset: 0 },
  noop,
]);

export const useStudioContext = (): StudioContextValue =>
  useContext(StudioContext);

export default StudioContext;
