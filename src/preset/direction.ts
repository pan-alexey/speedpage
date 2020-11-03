/* eslint-disable @typescript-eslint/ban-types */

export interface IPageNetworkEvents {
  method: unknown;
  params: unknown;
}

export interface IPageEvents {
  pageerror: Array<unknown>;
  response: Array<unknown>;
  requestfailed: Array<unknown>;
  console: Array<unknown>;
}

export interface IDirectionsCollectedData {
  // option: IMetricsCustomOption;
  elapsedTime: number|null;
  pageEvents: IPageEvents;
  networkEvents: Array<IPageNetworkEvents>;
  metrics: {
    [key: string]: unknown
  }
  windowPerformance: {
    performance: unknown;
    entries: unknown;
    perfomanseObserver: unknown;
  };
  coverage: {
    js: unknown;
    css: unknown;
  }
  tracing: object;
  content: string;
}
