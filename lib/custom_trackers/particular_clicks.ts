import { generateJson } from '../tools/generateJson';
import { getUnseenElements } from '../tools/getUnseenElements';
import { 
  TrackParticularClicks,
  TrackedElement,
} from '../config/configTypes';
import axios from 'axios';

const sendEvent = (collector: string, id: string, step: string, defaultValue: boolean, event?: Event) => {
  const eventJson: unknown = generateJson(
    {
      identifier: id,
      step: step,
      default_value: defaultValue
    },
    'particular_clicks',
    '3-0-0'
  );
  axios.post(`${collector}/com.snowplowanalytics.snowplow/tp2`,
    eventJson
  ).catch((error) => {
    console.log(error);
  });
};

const trackParticularClicks = (collector: string, config: TrackParticularClicks): void => {
  let relevantElements: Array<TrackedElement> = [];
  setInterval(() => {
    let newElements: Array<TrackedElement> = getUnseenElements(config.selectors, relevantElements);
    relevantElements.push(...newElements);
    newElements.forEach((trackedElement: TrackedElement) => {
      sendEvent(collector, trackedElement.id, trackedElement.step, true);
      trackedElement.element.addEventListener('click', (event: Event) => {
        sendEvent(collector, trackedElement.id, trackedElement.step, false, event);
      });
    }) 
  }, 500)
};

export default trackParticularClicks;
