const createVnode = {
  install(View) {
    let proto = View.prototype;

    proto._c = function (tagName, attrs, children) {
      children = flatAry(children).filter(Boolean);
      children = resolveContinuousText(children);
      const vnode = {
        tagName,
        type: "element",
        attrs,
        children,
        // binds: astToken.binds || [],
        _static: attrs._static,
        events: attrs.events
      };
      delete attrs._static;
      delete attrs.events;
      children.forEach(child => {
        if (!child) return;
        child.parent = vnode;
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

    proto._sa = function (ary) {
      return ary;
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

    proto._rb = function (vnode) {
      let binds = {};
      let attrs = vnode.attrs.binds || {};
      Object.keys(attrs).forEach(key => {
        binds[key] = attrs[key]
      });
      vnode.binds = binds;
      delete vnode.attrs.binds;
      return vnode;
    }
  }
}

// 把连续的text接起来
function resolveContinuousText(children) {
  if (children.length <= 1) return children;
  let nChildren = [];
  children.reduce((last, current, currentIndex) => {
    if (last.type === "text") {
      if (current.type === "element") {
        nChildren.push(last);
        nChildren.push(current);
      }
      if (current.type === "text" && currentIndex) current.content = last.content + current.content;
    }
    if (last.type === "element") {
      if (current.type === "element") {
        nChildren.push(current);
      }
    }
    return current;
  }, children[0]);
  if (nChildren.length === 0) nChildren.push(children[children.length - 1]);
  return nChildren;
}

function flatAry(ary) {
  if (!ary) return [];
  return !Array.isArray(ary) ? ary : [].concat.apply([], ary.map(flatAry));
}

export default createVnode;