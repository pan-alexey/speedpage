/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

// The time to first-contentful-paint
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fcp = (entries: any): null|number => {
  const paintEntries = entries.filter((e) => e.name === 'first-contentful-paint')[0];
  const time = paintEntries.startTime;
  return time >= 0 && time < 2*60*1000 ? time : null;
};