function collectionHas(a: Array<Element>, b: Node): boolean { //helper function (see below)
    for(var i = 0, len = a.length; i < len; i ++) {
        if(a[i] == b) return true;
    }
    return false;
}
export function findParentBySelector(elm: Element, selector: string): Node | null {
    const all: Array<Element> = Array.from(window.document.querySelectorAll(selector));
    let cur: Node | null = elm.parentNode;
    while(cur && !collectionHas(all, cur)) { //keep going up until you find a match
        cur = cur.parentNode; //go up
    }
    return cur; //will return null if not found
}