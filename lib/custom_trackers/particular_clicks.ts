import { generateJson } from '../tools/generateJson';
import { getUnseenElements } from '../tools/getUnseenElements';
import { 
  TrackParticularClicks,
  TrackedElement,
} from '../config/configTypes';
import axios from 'axios';

const sendEvent = (collector: string, id: string, step: string, event: Event) => {
  const eventJson: unknown = generateJson(
    {
      selector_id: id,
      step: step,
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
  let relevantElements: Array<TrackedElement> = [];
  setInterval(() => {
    let newElements: Array<TrackedElement> = getUnseenElements(config.selectors, relevantElements);
    relevantElements.push(...newElements);
    newElements.forEach((trackedElement: TrackedElement) => {
      trackedElement.element.addEventListener('click', (event: Event) => {
        sendEvent(collector, trackedElement.id, trackedElement.step, event);
      });
    }) 
  }, 500)
};

export default trackParticularClicks;
