import { generateJson } from '../tools/generateJson';
import { TrackParticularClicks } from '../config/configTypes';
import axios from 'axios';

const sendEvent = (collector: string, ev: Event) => {
  const eventJson: unknown = generateJson(
    {
      identifier: (ev.target instanceof Element) ? ev.target.id : '',
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
    let filteredElements: Array<Element> = newElements.filter((el: Element) => !relevantElements.includes(el));
    relevantElements.push(...filteredElements);
    filteredElements.forEach((el: Element) => {
      el.addEventListener('click', (ev: Event) => {
        sendEvent(collector, ev);
      });
    }) 
  }, 500)
};

export default trackParticularClicks;
