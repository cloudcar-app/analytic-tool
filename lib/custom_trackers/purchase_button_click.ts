import { generateJson } from '../tools/generateJson';
import { TrackPurchaseButtonClick } from '../config/configTypes';

declare global {
  interface EventTarget {
  startTime: number;
  }
  interface Element {
    startTime: number;
  }
}
const sendEvent = (ev: Event) => {
  const currTime : number = new Date().getTime()
  const eventJson: unknown = generateJson(
    {
      id_car: '1',
      time_until_click: currTime - window.startTime,
    },
    'purchase_button_click'
  );
  fetch(`${window.COLLECTOR_ADDRESS}/com.snowplowanalytics.snowplow/tp2`, {
    method: 'post',
    body: JSON.stringify(eventJson),
    headers: {
      'Content-Type': 'application/json',
    },
  }).catch((error) => {});
};

const trackPurchaseButtonClick = (config: TrackPurchaseButtonClick): void => {
  const startTime : number = new Date().getTime()
  let purchaseButtons: NodeListOf<Element>;
  const selectors: string = config.selectors.join(', ');
  setInterval(() => {
    purchaseButtons = window.document.querySelectorAll(selectors);
    for (let i = 0; i < purchaseButtons.length; i += 1) {
      const btn = purchaseButtons[i];
      window.startTime = startTime;
      btn.addEventListener('click', sendEvent);
    }
  }, 5000)
};

export default trackPurchaseButtonClick;
