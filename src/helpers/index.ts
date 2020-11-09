export const sleep = (ms: number, arg?: unknown): Promise<unknown> => {
  return new Promise((resolve) => setTimeout(() => {
    resolve(arg);
  }, ms));
};

export const awaitTimeout = (callback: Promise<unknown>, timeout = 180000): Promise<{
  result: unknown, error: unknown
}> => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise((resolve) => {
    const timer = setTimeout(() => {
      resolve({ result: null, error: 'Timeout Error' });
    }, timeout);

    callback.then((result) => {
      resolve({ result, error: null });
    }).catch((error) => {
      resolve({ result: null, error });
    }).finally(() => {
      clearTimeout(timer);
    });
  });
};


export const uid = (radix = 16, prefix = '', postfix = ''): string => {
  const uid = Date.now().toString(radix)+Math.random().toString(radix);
  return `${postfix}${uid}`;
};