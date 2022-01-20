import { generateJson } from '../tools/generateJson';
import { TrackHover } from '../config/configTypes';
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

  const eventJson : any = generateJson({
    element_id: element_id,
    inner_text: inner_text,
    time: totalTime 
  }, "hover");

  sendEvent(collector, eventJson)
  restarTimer()
};

function restarTimer(){
  startTime = 0
  endTime = 0
}

const trackHover= (collector: string, config :TrackHover):void=> {
  console.log("dasdasdasdasdasdas")
  let relevantElementHover: Array<Element> = [];
  const selectors: string = config.selectors.join(', ');

  setInterval(() => {
    //Array of elements from query
    let newElementHover: Array<Element> = Array.from(window.document.querySelectorAll(selectors));
    //Only elements that are not in relevantElementHover
    let filterElements: Array<Element> = newElementHover.filter((elementHover: Element) => !relevantElementHover.includes(elementHover))
    relevantElementHover.push(...filterElements);
    //Add event to elements
    filterElements.forEach((elementHover: HTMLElement) => {
      elementHover.addEventListener('mouseenter', enterElement);
      elementHover.addEventListener('mouseleave',() => {
        leaveElement(collector, elementHover.id, elementHover.innerText)
      });
    })
  }, 500)
}

export default trackHover;