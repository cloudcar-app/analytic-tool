import generateJson from "../tools/generateJson";
import { TrackStep } from '../config/configTypes';

let startTime : number = 0;

function finishTimer()
{
  let endTime = (new Date()).getTime()
  let totalTime = endTime - startTime
  return totalTime
}

function sendEvent(){
  const eventJson : any = generateJson({
    last_step: window.location.pathname,
    time: finishTimer()
  }, "step");
  fetch(`${window.COLLECTOR_ADDRESS}/com.snowplowanalytics.snowplow/tp2`, {
    method: "post",
    body: JSON.stringify(eventJson),
    headers: {
      "Content-Type": "application/json"
    }
  })
  startTime = (new Date()).getTime()
}

const trackStep = (config: TrackStep) => {
  startTime = (new Date()).getTime()

  let relevantBtnStep: Array<Element> = [];
  const selectors: string = config.selectors.join(', ');

  setInterval(() => {
    let newBtnStep: Array<Element> = Array.from(window.document.querySelectorAll(selectors));
    let temp: Array<Element> = newBtnStep.filter((btnStep: Element) => !relevantBtnStep.includes(btnStep))
    relevantBtnStep.push(...temp);

    temp.forEach((btnStep: Element) => {
        btnStep.addEventListener('click', sendEvent);
    })
  }, 500)
};

export default trackStep;
