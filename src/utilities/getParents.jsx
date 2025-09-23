export default function getParents(el, selector, filter) {

    let parentSelector = selector ? document.querySelector(selector) : document;
    if (!parentSelector) {
        return []; // Return empty array to prevent errors
    }

    let parents = [];
    let pNode = el.parentNode;

    while (pNode && pNode !== parentSelector) {

        if (pNode.classList && (!filter || pNode.classList.contains(filter))) {
            parents.push(pNode);
        }
        pNode = pNode.parentNode;
        // Break if `pNode` reaches `<html>` or `<body>` to avoid infinite loops
        if (!pNode || pNode === document.body || pNode === document.documentElement) {
            break;
        }
    }
    return parents;
}
