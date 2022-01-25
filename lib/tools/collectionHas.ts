export function collectionHas(elementArray: Array<Element>, element: Node): boolean { //helper function (see below)
    for(var i = 0, len = elementArray.length; i < len; i ++) {
        if(elementArray[i] == element) return true;
    }
    return false;
}