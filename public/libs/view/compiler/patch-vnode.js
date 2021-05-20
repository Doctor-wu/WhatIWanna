

function patchVnode(oldVNode, newVNode) {
  if (!oldVNode && newVNode) {
    return createDom.call(this, newVNode);
  }else if(!oldVNode && !newVNode){

  }else if(oldVNode && !newVNode){

  }else if(oldVNode && newVNode) {
    oldVNode.el.parentNode.replaceChild(createDom(newVNode), oldVNode.el);
  }
}

function createDom(vNode) {
  if (vNode.type === "text") {
    let dom = document.createTextNode(vNode.content);
    return dom;
  } else if (vNode.type === "element") {
    let dom = document.createElement(vNode.tagName);
    vNode.el = dom;
    resolveDOMAttr.call(this, dom, vNode);
    vNode.children.forEach(child => {
      dom.appendChild(createDom.call(this, child));
    });
    if (vNode.componentInstance) vNode.componentInstance.$el = dom;
    return dom;
  }
}


function resolveDOMAttr(dom, vNode) {
  const { $attrs = {} } = vNode;
  Object.keys($attrs).forEach(key => {
    let domKey = key;
    if (key === "class") domKey = "className";
    if (key === "events") resolveDOMEvents(dom, $attrs.events);
    if (key === "ref") {
      (vNode.context.$refs[$attrs[key]] || (vNode.context.$refs[$attrs[key]] = [])).push(dom);
      return;
    }

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