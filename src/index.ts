import type { PCSSOConfiguration } from './types/core';
import { SheetWorker } from './workers/SheetWorker';

import Core from './core';
import React from './react';

export const createPCSSO = <T>(configuration: PCSSOConfiguration<T>) => {
  const sheetWorker = new SheetWorker(configuration);

  return {
    global: Core.global(configuration, sheetWorker),
    css: Core.css(configuration),
    apply: Core.apply(sheetWorker),

    styled: React.styled(configuration, sheetWorker),
  } as const;
};
