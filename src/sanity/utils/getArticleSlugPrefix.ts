import { SanitySetting } from '@/sanity/types/documents';
import getSettingValue from './getSettingValue';

const getArticleSlugPrefix = (setting: SanitySetting | null): string =>
  getSettingValue<string>(setting, 'articleSlugPrefix', '/');

export default getArticleSlugPrefix;
