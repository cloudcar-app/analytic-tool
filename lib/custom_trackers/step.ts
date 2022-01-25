import generateJson from "../tools/generateJson";
import { getUnseenElements } from '../tools/getUnseenElements';
import getPurchaseIntentId from '../tools/getPurchaseIntentIdFromJwt'
import { 
  TrackStep,
  TrackedElement,
} from '../config/configTypes';
import axios from 'axios';

let startTime : number = 0;

function finishTimer()
{
  let endTime = (new Date()).getTime()
  let totalTime = endTime - startTime
  return totalTime
}

function sendEvent(collector: string){
  const eventJson : any = generateJson({
    last_step: window.location.pathname, 
    time: finishTimer(),
    purchaseIntentId: '49036c0e-5904-413a-aac0-9f635b7ee837'
  }, "steps");

  axios.post(`${collector}/com.snowplowanalytics.snowplow/tp2`, eventJson)
  .catch((error) => {
    console.error(error);
    });
  startTime = (new Date()).getTime()
}

const trackStep = (collector: string, config: TrackStep) => {
  startTime = (new Date()).getTime()

  let relevantElements: Array<TrackedElement> = [];

  setInterval(() => {
    //Array of elements from query
    let newElements: Array<TrackedElement> = getUnseenElements(config.selectors, relevantElements);
    relevantElements.push(...newElements);
    newElements.forEach((btnStep: TrackedElement) => {
        btnStep.element.addEventListener('click', () => {
          sendEvent(collector)
        });
    })
  }, 500)
};

export default trackStep;
