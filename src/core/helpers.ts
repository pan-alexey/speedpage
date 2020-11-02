export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve)=>setTimeout(resolve, ms));
};

export const uniq = (): string => {
  return (+new Date + Math.random()).toString(16);
};
