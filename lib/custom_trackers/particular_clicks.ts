import { generateJson } from '../tools/generateJson';
import { TrackParticularClicks } from '../config/configTypes';
import axios from 'axios';

const sendEvent = (ev: Event) => {
  const eventJson: unknown = generateJson(
    {
      identifier: (ev.target instanceof Element) ? ev.target.id : '',
      step_name: 'none',
    },
    'particular_clicks'
  );
  axios.post(`${window.COLLECTOR_ADDRESS}/com.snowplowanalytics.snowplow/tp2`,
    eventJson
  ).catch((error) => {
    console.log(error);
  });
};

const trackParticularClicks = (config: TrackParticularClicks): void => {
  let relevantElements: Array<Element> = [];
  const selectors: string = config.selectors.join(', ');
  setInterval(() => {
    let newElements: Array<Element> = Array.from(window.document.querySelectorAll(selectors));
    relevantElements.push(...newElements.filter((el: Element) => !relevantElements.includes(el)));
    relevantElements.forEach((el: Element) => {
      el.addEventListener('click', sendEvent);
    }) 
  }, 500)
};

export default trackParticularClicks;
