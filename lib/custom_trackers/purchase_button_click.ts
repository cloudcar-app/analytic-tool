import { generateJson } from '../tools/generateJson';
import { findParentBySelector } from '../tools/findParentBySelector';
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

const sendEvent = (startTime: number, collector: string, event: Event) => {
  const currTime : number = new Date().getTime()
  const buttonContainer: Node | null = (event.target instanceof Element) ? findParentBySelector(event.target, '.cloudcar_button_container') : null
  const eventJson: unknown = generateJson(
    {
      id_car: (buttonContainer) ? (<Element> buttonContainer).getAttribute('data-car-group-id') : 'null',
      time_until_click: currTime - startTime,
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
    let newElements: Array<Element> = Array.from(
      (window.top || window).document.querySelectorAll(selectors),
    );
    let filteredElements: Array<Element> = newElements.filter((element: Element) => !relevantElements.includes(element));
    relevantElements.push(...filteredElements);
    filteredElements.forEach((element: Element) => {
      element.addEventListener('click', (event: Event) => {
        sendEvent(startTime, collector, event)
      });
    }) 
  }, 500)
};

export default trackPurchaseButtonClick;
