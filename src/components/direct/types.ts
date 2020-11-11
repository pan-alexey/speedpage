import * as puppeteer from 'puppeteer';
import { IPageNetworkEvents, IPageEvents } from '../../core/types';

export interface IDirectOptions {
  url: string;
  platform?: string,
  tmpDir: string;
  saveRaw?: boolean;
  alias?: string;
  userAgent?: string;
  clearCache?: boolean;
  clearCookies?: boolean;
  clearStorage?: boolean;
  enableBrowserPerfomanceApi?: boolean;
  disableJavascript?: boolean;
  extraHeaders?: {
    [key: string]: string
  },
  cookies?: Array<puppeteer.SetCookie>
}

export interface IDirectCollectedData {
  options: IDirectOptions;
  outputPath: string;
  screenshots: {
    screenshot: string; // path finish screenshot;
  }
  elapsedTime: {
    start: number;
    finish: number
  };
  pageEvents: IPageEvents;
  networkEvents: Array<IPageNetworkEvents>;
  metrics: {
    [key: string]: unknown
  }
  browserPerformanceApi: {
    performance: unknown;
    entries: unknown;
    perfomanceObserver: unknown;
  };
  coverage: {
    js: unknown;
    css: unknown;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tracing: any;
  content: string;
}