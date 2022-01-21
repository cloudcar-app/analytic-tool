import { collectionHas } from "./collectionHas";

export function findParentBySelector(elm: Element, selector: string): Node | null {
    const all: Array<Element> = Array.from(window.document.querySelectorAll(selector));
    let cur: Node | null = elm.parentNode;
    while(cur && !collectionHas(all, cur)) { //keep going up until you find a match
        cur = cur.parentNode; //go up
    }
    return cur; //will return null if not found
}