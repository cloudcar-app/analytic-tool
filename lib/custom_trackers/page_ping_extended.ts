/* eslint-disable @typescript-eslint/no-floating-promises */
import { generateJson } from '../tools/generateJson';
import { TrackPagePingExtended } from '../config/configTypes';
import axios from 'axios';

// User has switched back to the tab
const onFocus = (focusInterval: number[]) => {
  focusInterval.push(new Date().getTime());
};

// User has switched away from the tab (AKA tab is hidden)
const onBlur = (focusInterval: number[]) => {
  focusInterval.push(new Date().getTime());
};

const trackPagePingExtended = (collector: string, config :TrackPagePingExtended ): void => {
  
  const time_interval: number = config.time_interval
  const mousePosInterval: number = config.mousePosInterval
  // Focus intervals
  const now: number = new Date().getTime();
  let focusInterval: number[] = [now];
  const focused = () => {
    onFocus(focusInterval);
  };
  const blurred = () => {
    onBlur(focusInterval);
  };

  (window.top || window).addEventListener('focus', focused);
  (window.top || window).addEventListener('blur', blurred);

  // Mouse positions
  let mousePos: number[] = [];
  const currentMousePos: number[] = [0, 0];
  (window.top || window).addEventListener('mousemove', (event: MouseEvent) => {
    currentMousePos[0] = event.offsetX;
    currentMousePos[1] = event.offsetY;
  });

  setInterval(() => {
    mousePos.push(currentMousePos[0], currentMousePos[1]);
  }, mousePosInterval*1000);

  setInterval(() => {
    const event_json: any = generateJson(
      {
        focus_interval: focusInterval,
        mouse_pos_interval: mousePosInterval,
        mouse_pos: mousePos,
      },
      'page_ping_extended'
    );
    axios.post(`${collector}/com.snowplowanalytics.snowplow/tp2`, event_json)
    .catch((error) => {
      console.error(error);
      });
    focusInterval = [];
    mousePos = [];
  }, time_interval * 1000);
};

export default trackPagePingExtended;
