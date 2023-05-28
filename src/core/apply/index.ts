import { StyleObject } from '~/types/core';
import { SheetWorker } from '~/workers/SheetWorker';

/**
 * Function for appending pcsso style to the stylesheet
 * @example
 * const className = pcsso.apply(pcsso.css({
 *   width: 10 + "px"
 * }))
 */
export function apply<T>(sheetWorker: SheetWorker<T>) {
  return (styleObject: StyleObject): string => {
    return sheetWorker.createClassRule(styleObject);
  };
}
