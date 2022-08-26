import generateJson from '../tools/generateJson';
import { getUnseenElements } from '../tools/getUnseenElements';
import getPurchaseIntentId from '../tools/getPurchaseIntentIdFromJwt';
import { TrackStep, TrackedElement } from '../config/configTypes';
import axios from 'axios';

let startTime: number = 0;

function finishTimer() {
  let endTime = new Date().getTime();
  let totalTime = endTime - startTime;
  return totalTime;
}

function sendEvent(collector: string, stepName: string) {
  const eventJson: any = generateJson(
    {
      last_step: stepName,
      time: finishTimer(),
      purchaseIntentId: getPurchaseIntentId(),
    },
    'steps',
  );

  axios
    .post(`${collector}/com.snowplowanalytics.snowplow/tp2`, eventJson)
    .catch((error) => {
      console.error(error);
    });
  startTime = new Date().getTime();
}

const trackStep = (collector: string, config: TrackStep) => {
  startTime = new Date().getTime();

  let relevantElements: Array<TrackedElement> = [];

  setInterval(() => {
    //Array of elements from query
    let newElements: Array<TrackedElement> = getUnseenElements(
      config.selectors,
      relevantElements,
    );
    relevantElements.push(...newElements);
    newElements.forEach((btnStep: TrackedElement) => {
      btnStep.element.addEventListener('click', () => {
        const currentStep: string =
          (window.top || window).location.pathname || '';
        sendEvent(collector, currentStep);
      });
    });
  }, 500);
};

export default trackStep;
