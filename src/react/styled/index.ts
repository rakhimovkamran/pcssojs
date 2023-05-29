import {
  ClassAttributes,
  createElement,
  HTMLAttributes,
  ReactHTML,
} from 'react';
import { PCSSOConfiguration, StyleObject } from '../../types/core';
import { SheetWorker } from '../../workers/SheetWorker';
import Core from '../../core';

export function styled<T>(
  configuration: PCSSOConfiguration<T>,
  sheetWorker: SheetWorker<T>
) {
  return <K>(tagName: keyof ReactHTML, prepare: (data: T) => StyleObject) => {
    const styledClassName = Core.apply(sheetWorker)(
      prepare(configuration.data)
    );

    return <P extends HTMLAttributes<K>>(
      props: (ClassAttributes<K> & P) | null
    ) => {
      // TODO: Add implementation for adding className from props
      // Check why it's not working correctly
      return createElement(
        tagName,
        {
          className: props?.className
            ? `${styledClassName} ${props.className}`
            : styledClassName,
          ...props,
        },
        props?.children
      );
    };
  };
}
