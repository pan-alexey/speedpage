import * as speedline from 'speedline-core';

export interface IVisualMetrics {
  firstVisualChange: number;
  lastVisualChange: number;
  speedIndex: number;
  perceptualSpeedIndex: number;
  timelineProgress: { time: number; progress: number; }[];
  visualComplete85: number;
  visualComplete95: number;
}

const getVisualComplete85 = (speedlineFrame) => {
  let result = null;
  speedlineFrame.forEach(element => {
    if(result) return;
    if (element.progress >= 85) result = element.time;
  });
  return result;
};

const getVisualComplete95 = (speedlineFrame) => {
  let result = null;
  speedlineFrame.forEach(element => {
    if(result){ return result; }
    if (element.progress >= 85) result = element.time;
  });
  return result;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const visualMetrics = async (trace, begin = 0, duaration?:number): Promise<IVisualMetrics> => {
  const traceEvents = trace.traceEvents || trace || [];
  const trimmedEvents = [];

  let startTs = 0;
  traceEvents.forEach(element => {
    if (element.ts === 0 || typeof element.args.snapshot === 'undefined') return;
    if(!startTs) { startTs = element.ts;};
    if(startTs) {
      const duarationMs = (element.ts - startTs)/1000;

      if (duarationMs < begin) return;
      if (duaration && (duarationMs >= begin + duaration) )  return;

      trimmedEvents.push(element);
    };
  });

  const speedlineResult = await speedline(trimmedEvents, { fastMode: true });

  const speedlineFrame = speedlineResult.frames.map(frame => {
    return {
      time: (frame.getTimeStamp() - startTs/1000),
      progress: frame.getProgress(),
      // img: frame.getImage()
    };
  });

  return {
    firstVisualChange: speedlineResult.first,
    lastVisualChange: speedlineResult.complete,
    speedIndex: speedlineResult.speedIndex,
    perceptualSpeedIndex: speedlineResult.speedIndex,
    timelineProgress: speedlineFrame,
    visualComplete85: getVisualComplete85(speedlineFrame),
    visualComplete95: getVisualComplete95(speedlineFrame),
    // speedlineResult,
    // trimmedEvents,
  };
};
