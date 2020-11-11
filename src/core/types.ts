import { IDirectCollectedData } from '../components/direct/types';
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


export type ICollectData = IDirectCollectedData;