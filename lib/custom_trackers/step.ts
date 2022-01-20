import generateJson from "../tools/generateJson";
import { TrackStep } from '../config/configTypes';
import axios from 'axios';

let startTime : number = 0;

function finishTimer()
{
  let endTime = (new Date()).getTime()
  let totalTime = endTime - startTime
  return totalTime
}

function sendEvent(collector: string){
  const eventJson : any = generateJson({last_step: window.location.pathname, time: finishTimer()}, "step");

  axios.post(`${collector}/com.snowplowanalytics.snowplow/tp2`, eventJson)
  .catch((error) => {
    console.error(error);
    });
  startTime = (new Date()).getTime()
}

const trackStep = (collector: string, config: TrackStep) => {
  startTime = (new Date()).getTime()

  let relevantBtnStep: Array<Element> = [];
  const selectors: string = config.selectors.join(', ');

  setInterval(() => {
    //Array of elements from query
    let newBtnStep: Array<Element> = Array.from(window.document.querySelectorAll(selectors));
    //Only elements that are not in relevantBtnStep
    let filterElements: Array<Element> = newBtnStep.filter((btnStep: Element) => !relevantBtnStep.includes(btnStep))
    relevantBtnStep.push(...filterElements);
    //Add event to elements
    filterElements.forEach((btnStep: Element) => {
        btnStep.addEventListener('click', () => {
          sendEvent(collector)
        });
    })
  }, 500)
};

export default trackStep;
