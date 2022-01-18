import { generateJson } from '../tools/generateJson';
import { TrackHover } from '../config/configTypes';
import axios from 'axios';

let startTime : number = 0;
let endTime : number = 0
let totalTime : number = 0

function sendEvent(eventJson: object){
  axios.post(`${window.COLLECTOR_ADDRESS}/com.snowplowanalytics.snowplow/tp2`, eventJson)
  .catch((error) => {
    console.error(error);
    });
}

const enterElement = (ev: Event) => {
  startTime = (new Date()).getTime()
};

const leaveElement = (element_id: string, inner_text: string)=>{
  endTime =  (new Date()).getTime();
  totalTime = endTime - startTime
  startTime = 0

  const eventJson : any = generateJson({
    element_id: element_id,
    inner_text: inner_text,
    time: totalTime 
  }, "hover");

  sendEvent(eventJson)
  restarTimer()
};

function restarTimer(){
  startTime = 0
  endTime = 0
}

const trackHover= (config :TrackHover):void=> {
  let relevantElementHover: Array<Element> = [];
  const selectors: string = config.selectors.join(', ');
  setInterval(() => {
    //Array of elements from query
    let newElementHover: Array<Element> = Array.from(window.document.querySelectorAll(selectors));
    //Only elements that are not in relevantElementHover
    let filterElements: Array<Element> = newElementHover.filter((elmHover: Element) => !relevantElementHover.includes(elmHover))
    relevantElementHover.push(...filterElements);
    //Add event to elements
    filterElements.forEach((elmHover: HTMLElement) => {
      elmHover.addEventListener('mouseenter', enterElement);
      elmHover.addEventListener('mouseleave',() => {
        leaveElement(elmHover.id, elmHover.innerText)
      });
    })
  }, 5000)
}

export default trackHover;