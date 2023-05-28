import { PCSSOConfiguration, GlobalStyleObject } from '~/types/core';
import { SheetWorker } from '~/workers/SheetWorker';

/**
 * Function for appending global styles
 * @example
 * pcsso.global({
 *   "*": {
 *     boxSizing: "border-box"
 *   }
 * })
 */
export function global<T>(
  configuration: PCSSOConfiguration<T>,
  sheetWorker: SheetWorker<T>
) {
  return (prepare: (data: T) => GlobalStyleObject): void => {
    return sheetWorker.createGlobalRule(prepare(configuration.data));
  };
}
