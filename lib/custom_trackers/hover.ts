import { generateJson } from '../tools/generateJson';
import { TrackHover } from '../config/configTypes';

let startTime : number = 0;
let endTime : number = 0
let totalTime : number = 0

function sendEvent(eventJson: object){
  fetch(`${window.COLLECTOR_ADDRESS}/com.snowplowanalytics.snowplow/tp2`, {
    method: "post",
    body: JSON.stringify(eventJson),
    headers: {
      "Content-Type": "application/json"
    }
  })
}

const enterElement = (ev: Event) => {
  startTime = (new Date()).getTime()
};

const leaveElement = (ev: Event)=>{
  endTime =  (new Date()).getTime();
  totalTime = endTime - startTime
  startTime = 0

  const eventJson : any = generateJson({
    element_id: (ev.target instanceof Element) ? ev.target.id : '',
    inner_text: (ev.target instanceof HTMLElement) ? ev.target.innerText : '',
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
  let listElementHover : NodeListOf<Element>;
  const selectors: string = (config.selectors as string[]).join(', ');
  setInterval(() => {
    listElementHover = window.document.querySelectorAll(selectors);
    for (let i = 0; i < listElementHover.length; i += 1) {
      const elmHover = listElementHover[i];
      elmHover.addEventListener('mouseenter', enterElement);
      elmHover.addEventListener('mouseleave', leaveElement);
    }
  }, 5000)
}

export default trackHover;