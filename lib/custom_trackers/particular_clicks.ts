import { generateJson } from '../tools/generateJson';
import { TrackParticularClicks } from '../config/configTypes';
import axios from 'axios';

const sendEvent = (collector: string, event: Event) => {
  const eventJson: unknown = generateJson(
    {
      identifier: (event.target instanceof Element) ? event.target.id : '',
      step_name: 'none',
    },
    'particular_clicks'
  );
  axios.post(`${collector}/com.snowplowanalytics.snowplow/tp2`,
    eventJson
  ).catch((error) => {
    console.log(error);
  });
};

const trackParticularClicks = (collector: string, config: TrackParticularClicks): void => {
  let relevantElements: Array<Element> = [];
  const selectors: string = config.selectors.join(', ');
  setInterval(() => {
    let newElements: Array<Element> = Array.from(window.document.querySelectorAll(selectors));
    let filteredElements: Array<Element> = newElements.filter((element: Element) => !relevantElements.includes(element));
    relevantElements.push(...filteredElements);
    filteredElements.forEach((element: Element) => {
      element.addEventListener('click', (event: Event) => {
        sendEvent(collector, event);
      });
    }) 
  }, 500)
};

export default trackParticularClicks;
