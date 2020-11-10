/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const sslTimeBrowserApi = (perfomance: any): null|number => {
  const time = perfomance.timing;
  if (!time.secureConnectionStart) return null;
  const ssl = time.requestStart - time.secureConnectionStart;
  return ssl >= 0 && ssl < 5000 ? ssl : null;
};
