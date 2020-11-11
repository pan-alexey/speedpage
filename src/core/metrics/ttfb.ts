/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ttfbBrowserApi = (perfomance: any): null|number => {
  const time = perfomance.timing;
  const ttfb = time.responseStart - time.domainLookupStart;
  return ttfb >= 0 && ttfb < 2*60*1000 ? ttfb : null;
};