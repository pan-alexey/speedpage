/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const redirectTimeBrowserApi = (perfomance: any): null|number => {
  const time = perfomance.timing;
  const ttfb = time.redirectStart - time.redirectEnd;
  return ttfb >= 0 && ttfb < 2*60*1000 ? ttfb : null;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const redirectCountBrowserApi = (perfomance: any): null|number => {
  const navigation = perfomance.navigation;
  const redirectCount = navigation.redirectCount;
  return redirectCount >= 0 && redirectCount < 20? redirectCount : null;
};