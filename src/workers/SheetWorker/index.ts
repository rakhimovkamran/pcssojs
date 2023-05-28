import type {
  GlobalStyleObject,
  PCSSOConfiguration,
  Selectors,
  StyleObject,
} from '~/types/core';

import type { BaseStyleType, Sheet } from '~/types/sheet';
import { BASE_STYLE_TYPES, STYLE_ID } from '~/constants/Sheet';
import { Helpers } from '~/helpers';

export class SheetWorker<T> {
  rootSheet: Sheet;
  private rootStyle: HTMLStyleElement;
  private readonly PCSSOConfiguration: PCSSOConfiguration<T>;

  constructor(PCSSOConfiguration: PCSSOConfiguration<T>) {
    this.PCSSOConfiguration = PCSSOConfiguration;

    this.rootStyle = document.head.appendChild(document.createElement('style'));
    this.rootStyle.setAttribute('id', STYLE_ID);

    this.rootSheet = this.rootStyle.sheet as Sheet;
  }

  get sheet(): Sheet {
    return this.rootSheet;
  }

  private base(type: BaseStyleType, name: string) {
    return BASE_STYLE_TYPES[type](name);
  }

  /**
   * Method for creating global rule
   */
  createGlobalRule(globalStyleObject: GlobalStyleObject): void {
    Object.entries(globalStyleObject).forEach(([selector, styleObject]) => {
      const preparedStyleObject = Helpers.resolveStyleObject(
        this.PCSSOConfiguration,
        styleObject
      );

      const rule = `${selector} { 
        ${Helpers.flatCSSObject(preparedStyleObject)} 
      }`;

      if (preparedStyleObject.selectors) {
        this.insertSelectorStyles(selector, preparedStyleObject.selectors);
      }

      this.rootSheet.insertRule(rule);
    });
  }

  /**
   * Method for creating class rule
   */
  createClassRule(styleObject: StyleObject): string {
    const className = Helpers.generateClassName();

    const preparedStyleObject = Helpers.resolveStyleObject(
      this.PCSSOConfiguration,
      styleObject
    );

    const rule = `${this.base('class', className)} { 
      ${Helpers.flatCSSObject(preparedStyleObject)} 
    }`;

    this.rootSheet.insertRule(rule);

    if (preparedStyleObject.selectors) {
      this.insertSelectorStyles(
        this.base('class', className),
        preparedStyleObject.selectors
      );
    }

    return className;
  }

  /**
   * Method for resolving selector styles
   */
  private insertSelectorStyles(base: string, selectors: Selectors): void {
    Object.entries(selectors).forEach(([selector, styleUnit]) => {
      const preparedStyleObject = Helpers.resolveStyleObject(
        this.PCSSOConfiguration,
        styleUnit
      );

      const rule = `${base}${selector} { 
      ${Helpers.flatCSSObject(preparedStyleObject)} 
    }`;

      this.rootSheet.insertRule(rule);
    });
  }
}
