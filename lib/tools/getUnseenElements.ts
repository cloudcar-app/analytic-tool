import { 
    TrackedElement,
    Selector,
  } from '../config/configTypes';


/**
 * Este método busca elementos en base a `selectors` 
 * y retorna los elementos que encuentra y que no
 * están en `relevantElements`
 */
export const getUnseenElements = (selectors: (Selector)[], relevantElements: (TrackedElement)[]): Array<TrackedElement> => {
    let newElements: Array<TrackedElement> = [];
    selectors.forEach((selector: Selector) => {
        let queryElements: Array<HTMLElement> = Array.from(window.document.querySelectorAll(selector.css_selector))
        newElements.push(
        ...queryElements.map((element: HTMLElement) => ({
            id: selector.selector_id,
            step: (selector.step) ? selector.step : '',
            element: element,
        }))
        ) 
    })
    return newElements
        .filter((newElement: TrackedElement) => !relevantElements
        .some((relevantElement: TrackedElement) => relevantElement.element == newElement.element));
}