import { IDirectCollectedData } from '../../types';
import { visualMetrics } from '../../scripts/metrics/visual-metrics';

export const metrics = async (data: IDirectCollectedData) : Promise<unknown> => {
  const result = {
    visualMetrics: await visualMetrics(data.tracing),
  };

  return result;
};
