const createVnode = {
  install(View) {
    let proto = View.prototype;

    proto._c = function (tagName, attrs, children, isStatic) {
      let _isComponent = isComponent(this, tagName);
      let componentMounted = this._buildingComponentAST[this._compIndex]
        && this._buildingComponentAST[this._compIndex].componentInstance
        && this._buildingComponentAST[this._compIndex].componentInstance.isMounted;
      if (_isComponent && componentMounted) {
        // updateComponent;
        const componentInstance = this._buildingComponentAST[this._compIndex].componentInstance;
        const $slots = {};
        children.forEach(child => {
          if (Array.isArray(child)) {
            return child.forEach(c => {
              ($slots[c.slotName || "default"] || ($slots[c.slotName || "default"] = [])).push(child);
            })
          }
          ($slots[child.slotName || "default"] || ($slots[child.slotName || "default"] = [])).push(child);
        });
        componentInstance.$slots = $slots;
        componentInstance.update();
        componentInstance._isComponent = true;
        componentInstance.$vnode.componentInstance = componentInstance;
        componentInstance.$vnode._isComponent = true;
        return this._buildingComponentAST[this._compIndex].componentInstance.$vnode;
      }
      children = flatAry(children).filter(Boolean);
      children = resolveContinuousText(children);
      if (_isComponent && !componentMounted) {
        return createComponent.call(this, this.components, tagName, attrs, children);
      }
      const vnode = {
        tagName,
        type: "element",
        $attrs: attrs,
        children,
        // binds: astToken.binds || [],
        _static: isStatic,
        $events: attrs.$events,
        context: this,
      };
      children.forEach((child, index) => {
        if (!child) return;
        child.parent = vnode;
        child.key = (child.$attrs && child.$attrs.key) || index;
      });
      return vnode;
    }

    proto._t = function (str) {
      return {
        type: "text",
        content: str
      };
    }

    proto._ra = function (attrs) {
      return attrs;
    }

    proto._i = function (ary, fn) {
      if (typeof ary === "string") ary = JSON.parse(ary);
      ary = ary.map((item, index) => {
        const result = fn(item, index);
        return result;
      });
      return ary;
    }

    proto._sa = function (ary, slotName) {
      if (slotName) {
        ary.forEach(item => item.slotName = slotName);
      }
      return ary;
    }

    proto._cp = function (code) {
      this._compIndex++;
      return code;
    }

    proto._s = function (expr) {
      return {
        type: "text",
        content: expr
      };
    }

    proto._e = function (str) {
      return str;
    }

    proto._rsl = function (slotName) {
      return slotName;
    }
  }
}

// 把连续的text接起来
function resolveContinuousText(children) {
  if (children.length <= 1) return children;
  let nChildren = [];
  let textTail = false;
  children.reduce((last, current, currentIndex) => {
    textTail = false;
    if (last.type === "text") {
      if (current.type === "element") {
        nChildren.push(last);
        nChildren.push(current);
      }
      if (current.type === "text" && currentIndex) { current.content = last.content + current.content; textTail = true; }
    }
    if (last.type === "element") {
      if (current.type === "element") {
        nChildren.push(current);
      }
      if (current.type === "text") textTail = true;
    }
    return current;
  }, children[0]);
  if (textTail) nChildren.push(children[children.length - 1])
  if (nChildren.length === 0) nChildren.push(children[children.length - 1]);
  return nChildren;
}

function flatAry(ary) {
  if (!ary) return [];
  return !Array.isArray(ary) ? ary : [].concat.apply([], ary.map(flatAry));
}

function isComponent(vNode, tagName) {
  if (!vNode.components.length) return false;
  return vNode.components.some(component => component.name === tagName);
}

function createComponent(components, tagName, attrs, children) {
  const component = components.find(comp => comp.name === tagName);
  const $slots = {};
  let ifRef = false;
  children.forEach(child => {
    ($slots[child.slotName || "default"] || ($slots[child.slotName || "default"] = [])).push(child);
  });
  if (attrs.ref) {
    ifRef = {
      refName: attrs.ref,
    };
    delete attrs.ref; // 防止ref作为prop挂载到组件实例上
  }
  const componentInstance = new this.constructor(Object.assign(component, {
    $props: attrs,
    $slots,
    $parent: this,
  }));

  if (attrs.$events) {
    Object.keys(attrs.$events).forEach(evName => {
      attrs.$events[evName].forEach(ev => {
        componentInstance.regist(evName, ev);
      })
    })
    delete attrs.$events;
  }

  if (ifRef) {
    (this.$refs[ifRef.refName] || (this.$refs[ifRef.refName] = [])).push(componentInstance);
  }
  //   componentInstance.$vnode.componentInstance = componentInstance;
  componentInstance.mount();
  componentInstance._isComponent = true;
  componentInstance.$vnode.componentInstance = componentInstance;
  componentInstance.$vnode._isComponent = true;
  if (this._buildingComponentAST[this._compIndex]) {
    this._buildingComponentAST[this._compIndex].componentInstance = componentInstance;
  }

  return componentInstance.$vnode;
}

export default createVnode;