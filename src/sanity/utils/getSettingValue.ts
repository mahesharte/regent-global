import get from 'lodash/get';

import { SanitySetting } from '../types/documents';
import { SanityKeyValueTypes } from '../types/objects';

const getSettingValue = <T = SanityKeyValueTypes>(
  setting: SanitySetting | null,
  key: string,
  defaultValue: T
): T => {
  const value = setting?.variables.find((item) => item.key === key);
  return (get(value, `${value?.type}Value`) as T) ?? defaultValue;
};

export default getSettingValue;
