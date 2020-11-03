import { Page, Request } from 'puppeteer';

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

export interface IDirectionsOptions {
  url: string;
  alias?: string;
  enablePerfomanseMetrics?: boolean;
  disableJavascript?: boolean;
  extraHeaders?: {
    [key: string]: string
  }
  cookies?: Array<{
    [key: string] : string | number;
  }>
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tracing: any;
  content: string;
}

export class Directions {
  private options: IDirectionsOptions;
  private page: Page;

  constructor(options:IDirectionsOptions) {
    this.options = options;
  }

  async init(page: Page): Promise<void> {
    this.page = page;
  }
}