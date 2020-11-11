/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fidBrowserApi = (perfomanceObserver: any): null|number => {
  if (!perfomanceObserver || !perfomanceObserver.FID) return null;
  return perfomanceObserver.FID.value;
};
