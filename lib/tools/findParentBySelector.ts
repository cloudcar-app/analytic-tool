import { collectionHas } from "./collectionHas";

export function findParentBySelector(element: Element, selector: string): Node | null {
    const all: Array<Element> = Array.from(
      (window.top || window).document.querySelectorAll(selector),
    );
    let current: Node | null = element.parentNode;
    while(current && !collectionHas(all, current)) { //keep going up until you find a match
        current = current.parentNode; //go up
    }
    return current; //will return null if not found
}