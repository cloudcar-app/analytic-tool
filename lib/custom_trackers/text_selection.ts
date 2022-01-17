import { generateJson } from '../tools/generateJson';
import { TrackTextSelection } from '../config/configTypes';

const trackTextSelection = (config: TrackTextSelection): void => {
  let contextMenu: boolean = false;
  let selection: string = "";
  let copySelection: string = "";
  document.body.addEventListener("copy", (e: Event) => {
    copySelection = document.getSelection()!.toString();
    e.preventDefault();
  });
  document.body.addEventListener("contextmenu", (e: Event) => {
    contextMenu = true;
  });
  document.body.addEventListener("mouseup", function (e: MouseEvent) {
    let selectedText: string = window.getSelection()!.toString();
    if (selectedText !== "" && e.which === 1 && !contextMenu) {
      selection = window.getSelection()!.toString();
      setTimeout(() => {
        const eventJson = generateJson(
          {
            text: selection.length > 100 ? selection.slice(0, 100) : selection,
            copied: selection === copySelection ? true : false,
            pos_x: e.pageX,
            pos_y: e.pageY,
          },
          "text_selection"
        );
        fetch(`${window.COLLECTOR_ADDRESS}/com.snowplowanalytics.snowplow/tp2`, {
          method: "post",
          body: JSON.stringify(eventJson),
          headers: {
            "Content-Type": "application/json",
          },
        });
      }, 5000);
    }
    if (e.which == 1) {
      contextMenu = false;
    }
  });
};

export default trackTextSelection;
