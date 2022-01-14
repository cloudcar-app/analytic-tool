/* eslint-disable @typescript-eslint/no-floating-promises */
import { generateJson } from '../tools/generateJson';

// User has switched back to the tab
const onFocus = (focusInterval: number[]) => {
  focusInterval.push(new Date().getTime());
};

// User has switched away from the tab (AKA tab is hidden)
const onBlur = (focusInterval: number[]) => {
  focusInterval.push(new Date().getTime());
};

const trackPagePingExtended = (
  time_interval: number,
  mousePosInterval: number,
  collector: string
) => {
  // Focus intervals
  const now: number = new Date().getTime();
  let focusInterval: number[] = [now];
  const focused = () => {
    onFocus(focusInterval);
  };
  const blurred = () => {
    onBlur(focusInterval);
  };

  window.addEventListener('focus', focused);
  window.addEventListener('blur', blurred);
  // Mouse positions
  let mousePos: number[] = [];
  const currentMousePos: number[] = [0, 0];
  window.addEventListener('mousemove', (e) => {
    currentMousePos[0] = e.offsetX;
    currentMousePos[1] = e.offsetY;
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
    fetch(collector, {
      method: 'post',
      body: JSON.stringify(event_json),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    focusInterval = [];
    mousePos = [];
  }, time_interval * 1000);
};

export default trackPagePingExtended;
function fetch(collector: string, arg1: { method: string; body: string; headers: { 'Content-Type': string; }; }) {
  throw new Error('Function not implemented.');
}

