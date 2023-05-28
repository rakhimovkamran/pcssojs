import type { PCSSOConfiguration } from './types/core';
import { SheetWorker } from './workers/SheetWorker';

import {
  global as GlobalModule,
  css as CSSModule,
  apply as ApplyModule,
} from './core';

export const createPCSSO = <T>(configuration: PCSSOConfiguration<T>) => {
  const sheetWorker = new SheetWorker(configuration);

  return {
    global: GlobalModule(configuration, sheetWorker),
    css: CSSModule(configuration),
    apply: ApplyModule(sheetWorker),
  } as const;
};
