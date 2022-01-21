import { 
    TrackedElement,
    Selector,
  } from '../config/configTypes';

export const getUnseenElements = (selectors: (Selector)[], relevantElements: (TrackedElement)[]): Array<TrackedElement> => {
    let newElements: Array<TrackedElement> = [];
    selectors.forEach((selector: Selector) => {
        let queryElements: Array<Element> = Array.from(window.document.querySelectorAll(selector.css_selector))
        newElements.push(
        ...queryElements.map((element: Element) => ({
            id: selector.selector_id,
            element: element,
        }))
        ) 
    })
    return newElements
        .filter((newElement: TrackedElement) => !relevantElements
        .some((relevantElement: TrackedElement) => relevantElement.element == newElement.element));
}