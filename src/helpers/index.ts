import { PCSSOConfiguration, StyleObject, Transformers } from '~/types/core';
import { CLASS_PREFIX } from '~/constants/Sheet';

export class Helpers {
  /**
   * Converts camelCase to kebab-case
   */
  public static camelToKebabCase = (str: string): string => {
    return str.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
  };

  /**
   * Converts CSS Object into css string
   */
  public static flatCSSObject = (styleObject: StyleObject): string => {
    return Object.entries(styleObject)
      .map(
        ([prop, value]) => `${this.camelToKebabCase(prop)}: ${String(value)}`
      )
      .join(';');
  };

  public static transformStyleObject = ({
    transformers,
    styleObject,
  }: {
    transformers?: Transformers;
    styleObject: StyleObject;
  }): StyleObject => {
    if (!transformers) return styleObject;

    const transformedStyleObject = Object.assign({}, styleObject);

    for (const transformer in transformers) {
      if (transformer in styleObject) {
        const value = transformedStyleObject[
          transformer as keyof StyleObject
        ] as string;

        Object.assign(transformedStyleObject, transformers[transformer](value));

        delete transformedStyleObject[transformer as keyof StyleObject];
      }
    }

    return transformedStyleObject;
  };

  public static resolveStyleObject = <T>(
    configuration: PCSSOConfiguration<T>,
    styleObject: StyleObject
  ): StyleObject => {
    return this.transformStyleObject({
      transformers: configuration.transformers,
      styleObject,
    });
  };

  public static generateClassName(): string {
    return (
      CLASS_PREFIX +
      'xxx-xxx-xxx'.replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0,
          v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      })
    );
  }
}
