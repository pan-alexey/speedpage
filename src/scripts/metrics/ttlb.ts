/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ttlbBrowserApi = (perfomance: any): null|number => {
  const time = perfomance.timing;
  const ttlb = time.responseEnd - time.domainLookupStart;
  return ttlb >= 0 && ttlb < 2*60*1000 ? ttlb : null;
};