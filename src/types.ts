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

export interface IDirectOptions {
  url: string;
  alias?: string;
  clearCache?: boolean
  enablePerfomanseMetrics?: boolean;
  disableJavascript?: boolean;
  extraHeaders?: {
    [key: string]: string
  },
  tmpDir?: string;
  cookies?: Array<{
    [key: string] : string | number;
  }>
}

export interface IDirectCollectedData {
  // option: IMetricsCustomOption;
  elapsedTime: {
    start: number;
    finish: number
  };
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tracing: any;
  content: string;
}

export type ICollectData = IDirectCollectedData;