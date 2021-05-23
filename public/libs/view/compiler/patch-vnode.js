function patchVnode(oldVNode, newVNode, parentDom) {
  if (!oldVNode && newVNode) {
    const dom = createDom.call(this, newVNode);
    if (parentDom) {
      parentDom.appendChild(dom);
    }
    return dom;
  } else if (!oldVNode && !newVNode) {
    return;
  } else if (oldVNode && !newVNode) {
    oldVNode.el.parentNode.removeChild(oldVNode.el);
  } else if (oldVNode && newVNode) {
    return updateComponent(oldVNode, newVNode);
  }
}

function updateComponent(oldVNode, newVNode) {
  if (oldVNode.type === "text" && newVNode.type === "text") {
    if (oldVNode.content === newVNode.content) return newVNode.el = oldVNode.el;
  }
  if (oldVNode.tagName !== newVNode.tagName) {
    const newEl = createDom(newVNode); // 新老节点tagName不一致，直接创建新的节点
    oldVNode.el.parentNode.replaceChild(newEl, oldVNode.el);

    newVNode.el = newEl;
    return newEl;
  }
  if ((oldVNode.key !== newVNode.key && !oldVNode._isComponent)) {
    const newEl = createDom(newVNode); // 新老节点key不一致，直接创建新的节点
    oldVNode.el.parentNode.replaceChild(newEl, oldVNode.el);

    newVNode.el = newEl;
    return newEl;
  }

  newVNode.el = oldVNode.el;

  if (!compareVNodeAttrs(oldVNode, newVNode)) { // tagName一样则复用节点, 更新attr
    removeDOMAttr(newVNode.el, oldVNode.$attrs);
    resolveDOMAttr(newVNode.el, newVNode);
  }

  // if (oldVNode._static && newVNode._static) { // 静态节点跳过该过程
  //   console.log(oldVNode, newVNode);
  //   return newVNode.el = oldVNode.el;
  // }


  if (oldVNode.children) {
    if (newVNode.children) { // 新老节点都有孩子，则对孩子们做DOM-DIFF
      let iList = oldVNode.children.length > newVNode.children.length ? oldVNode.children : newVNode.children;
      iList.forEach((_, index) => {
        if (oldVNode.children[index] && oldVNode.children[index]._isComponent) { // 如果子元素是组件，则组件内部自己更新
          return;
        }
        patchVnode(oldVNode.children[index], newVNode.children[index], oldVNode.children[index] ? oldVNode.el : newVNode.el);
      })
    } else { // 老节点有孩子，新节点没有，删除老节点的孩子
      oldVNode.children.forEach((_, index) => {
        patchVnode(oldVNode.children[index], null);
      })
    }
  } else {
    if (newVNode.children) { // 新节点有孩子，老节点没有孩子
      newVNode.children.forEach((_, index) => {
        patchVnode(null, newVNode.children[index], newVNode.el);
      })
    } else { // 新老节点都没有孩子
      return;
    }
  }
}

function compareVNodeAttrs(oldVNode, newVNode) {
  const oldAttrs = oldVNode.$attrs,
    newAttrs = newVNode.$attrs,
    oldKeys = Object.keys(oldAttrs),
    newKeys = Object.keys(newAttrs);
  if (oldKeys.length !== newKeys.length) return false;
  for (let i = 0; oldKeys[i]; i++) {
    if (oldKeys[i] !== newKeys[i]) return false;
  }
  return true;
}

function createDom(vNode) {
  if (vNode.type === "text") {
    let dom = document.createTextNode(vNode.content);
    vNode.el = dom;
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

function removeDOMAttr(dom, $attrs) {
  Object.keys($attrs).forEach(key => {
    let domKey = key;
    if (key === "class") domKey = "className";
    if (key === "$events") removeDOMEvents(dom, $attrs.$events);
    if (key === "style") return removeDOMStyle(dom, $attrs.style);

    delete dom[domKey];
  })
}

function removeDOMStyle(dom, styleObj) {
  if (typeof styleObj === "string") return dom.style = "";

  Object.keys(styleObj).forEach(key => {
    delete dom.style[key];
  })
}

function removeDOMEvents(dom, events) {
  Object.keys(events).forEach(key => {
    events[key].forEach(evHandler => {
      dom.removeEventListener(key, evHandler, false);
    })
  })
}


function resolveDOMAttr(dom, vNode) {
  const {
    $attrs = {}
  } = vNode;
  Object.keys($attrs).forEach(key => {
    let domKey = key;
    if (key === "class") domKey = "className";
    if (key === "$events") resolveDOMEvents(dom, $attrs.$events);
    if (key === "style") return resolveDOMStyle(dom, $attrs.style);
    if (key === "ref") {
      (vNode.context.$refs[$attrs[key]] || (vNode.context.$refs[$attrs[key]] = [])).push(dom);
      return;
    }

    dom[domKey] = $attrs[key];
  })
}

function resolveDOMStyle(dom, styleObj) {
  if (typeof styleObj === "string") return dom.style = styleObj;

  Object.keys(styleObj).forEach(key => {
    dom.style[key] = styleObj[key];
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