import { generateJson } from '../tools/generateJson';
import { getUnseenElements } from '../tools/getUnseenElements';
import { findParentBySelector } from '../tools/findParentBySelector';
import { 
  TrackHover,
  TrackedElement,
} from '../config/configTypes';
import axios from 'axios';
import {
  createContexts,
  Context
} from '../tools/createContexts';
import { getCarInfo } from '../tools/getCarInfo';

let startTime : number = (new Date()).getTime();
let endTime : number = (new Date()).getTime();
let totalTime : number = 0;

function sendEvent(collector: string, eventJson: object){
  axios.post(`${collector}/com.snowplowanalytics.snowplow/tp2`, eventJson)
  .catch((error) => {
    console.error(error);
    });
}

const enterElement = () => {
  startTime = (new Date()).getTime()
};

const leaveElement = (collector: string, element_id: string, inner_text: string)=>{
  endTime =  (new Date()).getTime();
  totalTime = endTime - startTime
  startTime = (new Date()).getTime();

  const buttonContainer: Node | null = (event.target instanceof Element) ? findParentBySelector(event.target, '.cloudcar_button_container') : null
  const contexts: Context[] = []
  if (buttonContainer) {
    contexts.push(
      {
        name: 'car_context',
        version: '1-0-0',
        data: getCarInfo(<HTMLElement>buttonContainer)
      },
    )
  }
  const eventJson : any = generateJson({
    id_car: (buttonContainer) ? (<Element> buttonContainer).getAttribute('data-car-group-id') : 'null',
    identifier: element_id,
    inner_text: inner_text,
    time: totalTime 
  }, 
  "hover",
  "3-0-0",
  createContexts(contexts)
  );

  sendEvent(collector, eventJson)
  restarTimer()
};

function restarTimer(){
  startTime = (new Date()).getTime()
  endTime = (new Date()).getTime()
}

const trackHover= (collector: string, config :TrackHover):void=> {
  let relevantElementHover: Array<TrackedElement> = [];

  setInterval(() => {
    //Array of elements from query
    let newElementHover: Array<TrackedElement> = getUnseenElements(config.selectors, relevantElementHover);
    //Only elements that are not in relevantElementHover
    relevantElementHover.push(...newElementHover);
    //Add event to elements
    newElementHover.forEach((elementHover: TrackedElement) => {
      elementHover.element.addEventListener('mouseenter', enterElement);
      elementHover.element.addEventListener('mouseleave',() => {
        leaveElement(collector, elementHover.id, elementHover.element.innerText)
      });
    })
  }, 500)
}

export default trackHover;