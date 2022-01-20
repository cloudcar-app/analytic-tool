import { generateJson } from '../tools/generateJson';
import { TrackTextSelection } from '../config/configTypes';
import axios from 'axios';

const trackTextSelection = (collector: string, config: TrackTextSelection): void => {
  let contextMenu: boolean = false;
  let selection: string = "";
  let copySelection: string = "";
  document.body.addEventListener("copy", (event: Event) => {
    copySelection = document.getSelection()!.toString();
    event.preventDefault();
  });
  document.body.addEventListener("contextmenu", (event: Event) => {
    contextMenu = true;
  });
  document.body.addEventListener("mouseup", function (event: MouseEvent) {
    let selectedText: string = window.getSelection()!.toString();
    if (selectedText !== "" && event.which === 1 && !contextMenu) {
      selection = window.getSelection()!.toString();
      setTimeout(() => {
        const eventJson = generateJson(
          {
            text: selection.length > 100 ? selection.slice(0, 100) : selection,
            copied: selection === copySelection ? true : false,
            pos_x: event.pageX,
            pos_y: event.pageY,
          },
          "text_selection"
        );
        axios.post(`${collector}/com.snowplowanalytics.snowplow/tp2`,
          eventJson
        ).catch((error) => {
          console.log(error);
        });
      }, 5000);
    }
    if (event.which == 1) {
      contextMenu = false;
    }
  });
};

export default trackTextSelection;
