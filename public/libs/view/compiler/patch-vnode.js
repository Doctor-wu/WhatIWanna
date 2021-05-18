

function patchVnode(oldVNode, newVNode) {
  if (!oldVNode && newVNode) {
    return createDom(newVNode);
  }
}

function createDom(vNode) {
  if (vNode.type === "text") {
    let dom = document.createTextNode(vNode.content);
    return dom;
  } else if (vNode.type === "element") {
    let dom = document.createElement(vNode.tagName);
    vNode.el = dom;
    resolveDOMAttr(dom, vNode);
    vNode.children.forEach(child => {
      dom.appendChild(createDom(child));
    });
    return dom;
  }
}


function resolveDOMAttr(dom, vNode) {
  const { $attrs = {} } = vNode;
  Object.keys($attrs).forEach(key => {
    let domKey = key;
    if (key === "class") domKey = "className";
    if (key === "events") resolveDOMEvents(dom, $attrs.events);
    dom[domKey] = $attrs[key];
  })
}

function resolveDOMEvents(dom, events) {
  Object.keys(events).forEach(key => {
    events[key].forEach(evHandler => {
      dom.addEventListener(key, evHandler, false);
    })
  })
}

export default patchVnode;