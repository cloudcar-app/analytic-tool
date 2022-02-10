import { generateJson } from '../tools/generateJson';
import { getUnseenElements } from '../tools/getUnseenElements';
import {
  createContexts,
  Context
} from '../tools/createContexts';
import { findParentBySelector } from '../tools/findParentBySelector';
import { getCarInfo } from '../tools/getCarInfo';
import {
  TrackParticularClicks,
  TrackedElement,
} from '../config/configTypes';
import axios from 'axios';

const sendEvent = (collector: string, id: string, step: string, defaultValue: boolean, target: HTMLElement) => {
  const buttonContainer: Node | null = findParentBySelector(target, '.cloudcar_button_container') || null
  const contexts: Context[] = []
  if (buttonContainer) {
    contexts.push(
      {
      name: 'car_context',
      version: '1-0-0',
      data: getCarInfo(<HTMLElement>buttonContainer)
    },
    {
      name: 'concessionaire_context',
      version: '1-0-0',
      data: {
        concessionaire_name: (<HTMLElement>buttonContainer).getAttribute('data-concessionaire-name')
      },
    },
    )
  }
  const eventJson: unknown = generateJson(
    {
      identifier: id,
      step: step,
      default_value: defaultValue
    },
    'particular_clicks',
    '3-0-0',
    createContexts(contexts)
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
      sendEvent(collector, trackedElement.id, trackedElement.step, true, trackedElement.element);
      trackedElement.element.addEventListener('click', (event: Event) => {
        sendEvent(collector, trackedElement.id, trackedElement.step, false, trackedElement.element);
      });
    })
  }, 500)
};

export default trackParticularClicks;
