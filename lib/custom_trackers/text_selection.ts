import { generateJson } from '../tools/generateJson';
import axios from 'axios';

const trackTextSelection = (collector: string): void => {
  let contextMenu: boolean = false;
  let selection: string = "";
  let copySelection: string = "";
  (window.top || window).document.body.addEventListener(
    'copy',
    (event: Event) => {
      copySelection = (window.top || window).document
        .getSelection()!
        .toString();
      event.preventDefault();
    },
  );
  (window.top || window).document.body.addEventListener(
    'contextmenu',
    (event: Event) => {
      contextMenu = true;
    },
  );
  (window.top || window).document.body.addEventListener(
    'mouseup',
    function (event: MouseEvent) {
      let selectedText: string = (window.top || window)
        .getSelection()!
        .toString();
      if (selectedText !== '' && event.which === 1 && !contextMenu) {
        selection = (window.top || window).getSelection()!.toString();
        setTimeout(() => {
          const eventJson = generateJson(
            {
              text:
                selection.length > 100 ? selection.slice(0, 100) : selection,
              copied: selection === copySelection ? true : false,
              pos_x: event.pageX,
              pos_y: event.pageY,
            },
            'text_selection',
          );
          axios
            .post(`${collector}/com.snowplowanalytics.snowplow/tp2`, eventJson)
            .catch((error) => {
              console.log(error);
            });
        }, 5000);
      }
      if (event.which == 1) {
        contextMenu = false;
      }
    },
  );
};

export default trackTextSelection;
