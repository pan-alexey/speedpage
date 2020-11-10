/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const dnsTimeBrowserApi = (perfomance: any): null|number => {
  const time = perfomance.timing;
  const dns = time.domainLookupEnd - time.domainLookupStart;
  return dns >= 0 && dns < 5000 ? dns : null;
};
