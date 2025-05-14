//general helper functions

export function clearElement(element){
    while (element.firstChild){
        element.removeChild(element.firstChild);
    }
}