import * as CSSType from 'csstype';

/**
 * Plain CSS Object declaration
 */
export type CSSObject = CSSType.Properties;

/**
 * PCSSO Configuration object declaration
 */
export type PCSSOConfiguration<T> = {
  data: T;
  transformers?: Transformers;
};

// TODO: Add JSDoc description
export type Transformer = (value: string) => StyleObject;
export type Transformers = {
  [name: string]: Transformer;
};

/**
 * PCSSO's Style object declaration
 * it has selectors property.
 * @example
 * pcsso.css(() => ({
 *   selectors: {
 *     "&:hover": {
 *       background: "red"
 *     }
 *   }
 * }))
 */
export interface StyleObject extends CSSObject {
  selectors?: Selectors;
}

export type Selectors = {
  [selector: string]: CSSObject;
};

/**
 * PCSSO's Global Style object declaration
 * @example
 * pcsso.global({
 *   "*": {
 *     boxSizing: "border-box"
 *   }
 * })
 */
export type GlobalStyleObject = {
  [selector: string]: StyleObject;
};
