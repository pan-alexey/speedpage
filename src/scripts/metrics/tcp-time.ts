/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const tcpTimeBrowserApi = (perfomance: any): null|number => {
  const time = perfomance.timing;
  const tcp = time.connectEnd - time.connectStart;
  return tcp >= 0 && tcp < 5000 ? tcp : null;
};
