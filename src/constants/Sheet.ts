import { BaseStyleType } from '../types/sheet';

export const CLASS_PREFIX = 'pccso_';
export const STYLE_ID = 'pcsso';

export const BASE_STYLE_TYPES: Record<BaseStyleType, (name: string) => string> =
  {
    class: (name: string): string => `.${name}`,
  };
