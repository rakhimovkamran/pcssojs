import { PCSSOConfiguration, StyleObject } from '~/types/core';

/**
 * Function for creating pcsso style object
 * @example
 * pcsso.css((data) => ({
 *   color: data.colors.red
 * }))
 */
export function css<T>(configuration: PCSSOConfiguration<T>) {
  return (prepare: (data: T) => StyleObject): StyleObject => {
    return prepare(configuration.data);
  };
}
