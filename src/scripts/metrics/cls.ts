/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const clsBrowserApi = (perfomanceObserver: any): null|number => {
  if (!perfomanceObserver || !perfomanceObserver.CLS) return null;
  return perfomanceObserver.CLS.value;
};