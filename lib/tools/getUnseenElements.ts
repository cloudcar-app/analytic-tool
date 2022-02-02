import {
    TrackedElement,
    Selector,
} from '../config/configTypes';

const setIdToTrackedElement = (selectorId: string, element: HTMLElement): string => {
    const substrings: string[] = selectorId.split('#') 
    if (substrings.length < 3) { return selectorId; }
    for (let index = 1; index < substrings.length; index += 2) {
        const substring = substrings[index];
        substrings[index] = element.getAttribute(substring) || 'null';
    }
    return substrings.join('')
}

/**
 * Este método busca elementos en base a `selectors` 
 * y retorna los elementos que encuentra y que no
 * están en `relevantElements`
 */
export const getUnseenElements = (
    selectors: (Selector)[], 
    relevantElements: (TrackedElement)[]
    ): Array<TrackedElement> => {
    let newElements: Array<TrackedElement> = [];
    selectors.forEach((selector: Selector) => {
        let queryElements: Array<HTMLElement> = Array.from(window.document.querySelectorAll(selector.css_selector))
        newElements.push(
            ...queryElements.map((element: HTMLElement) => ({
                id: setIdToTrackedElement(selector.selector_id, element),
                step: (selector.step) ? selector.step : '',
                element: element,
            }))
        )
    })
    return newElements
        .filter((newElement: TrackedElement) => !relevantElements
            .some((relevantElement: TrackedElement) => relevantElement.element == newElement.element));
}