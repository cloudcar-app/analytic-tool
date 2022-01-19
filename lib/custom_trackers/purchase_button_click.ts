import { generateJson } from '../tools/generateJson';
import { TrackPurchaseButtonClick } from '../config/configTypes';
import axios from 'axios';

declare global {
  interface EventTarget {
  startTime: number;
  }
  interface Element {
    startTime: number;
  }
}
const sendEvent = (collector: string, ev: Event) => {
  const currTime : number = new Date().getTime()
  const eventJson: unknown = generateJson(
    {
      id_car: '1',
      time_until_click: currTime - window.startTime,
    },
    'purchase_button_click'
  );
  axios.post(`${collector}/com.snowplowanalytics.snowplow/tp2`,
    eventJson
  ).catch((error) => {
    console.log(error);
  });
};

const trackPurchaseButtonClick = (collector: string, config: TrackPurchaseButtonClick): void => {
  const startTime : number = new Date().getTime()
  let relevantElements: Array<Element> = [];
  const selectors: string = config.selectors.join(', ');
  setInterval(() => {
    let newElements: Array<Element> = Array.from(window.document.querySelectorAll(selectors));
    let filteredElements: Array<Element> = newElements.filter((el: Element) => !relevantElements.includes(el));
    relevantElements.push(...filteredElements);
    filteredElements.forEach((el: Element) => {
      el.addEventListener('click', (ev: Event) => {
        sendEvent(collector, ev)
      });
    }) 
  }, 500)
};

export default trackPurchaseButtonClick;
