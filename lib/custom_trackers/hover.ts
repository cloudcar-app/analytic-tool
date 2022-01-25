import { generateJson } from '../tools/generateJson';
import { getUnseenElements } from '../tools/getUnseenElements';
import { findParentBySelector } from '../tools/findParentBySelector';
import { 
  TrackHover,
  TrackedElement,
} from '../config/configTypes';
import axios from 'axios';

let startTime : number = 0;
let endTime : number = 0
let totalTime : number = 0

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
  startTime = 0

  const buttonContainer: Node | null = (event.target instanceof Element) ? findParentBySelector(event.target, '.cloudcar_button_container') : null

  const eventJson : any = generateJson({
    id_car: (buttonContainer) ? (<Element> buttonContainer).getAttribute('data-car-group-id') : 'null',
    identifier: element_id,
    inner_text: inner_text,
    time: totalTime 
  }, "hover", "3-0-0");

  sendEvent(collector, eventJson)
  restarTimer()
};

function restarTimer(){
  startTime = 0
  endTime = 0
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