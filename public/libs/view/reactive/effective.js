import patchVnode from "../compiler/patch-vnode.js";

let eid = 0;
let effectStack = [];
export let activeEffect = null;

export function setupRenderEffect(instance) {
  /* 创建一个渲染 effect */
  instance.update = effect(function componentEffect() {
    if (!instance.isMounted) {
      /* 触发instance.render函数，形成树结构 */
      instance.subTree = instance._render.call(instance, instance);
      instance.$vnode = instance.subTree;
      instance.$vnode.componentInstance = this;

      instance.executeHooks("beforeMount");

      instance.$el = patchVnode.call(instance, null, instance.$vnode);
      /* 触发声明周期 mounted钩子 */

      instance.executeHooks("mounted");

      instance.isMounted = true;
    } else {
      // debugger;
      // 更新组件逻辑
      // ......
      instance._compIndex = 0;
      let oldVNode = instance.$vnode;
      instance.subTree = instance._render.call(instance, instance);
      instance.$vnode = instance.subTree;
      instance.$vnode.componentInstance = this;

      instance.executeHooks("beforeUpdate");

      instance.$el = patchVnode.call(instance, oldVNode, instance.$vnode);
      /* 触发声明周期 mounted钩子 */

      instance.executeHooks("updated");
    }
  });
}

export function effect(fn, options = {}) {
  const effect = createReactiveEffect(fn, options)
  /* 如果不是懒加载 立即执行 effect函数 */
  if (!options.lazy) {
    effect()
  }
  return effect;
}

function createReactiveEffect(fn, options) {
  const effect = function reactiveEffect(...args) {
    try {
      // enableTracking()
      effectStack.push(effect) //往effect数组中里放入当前 effect
      activeEffect = effect // effect 赋值给当前的 activeEffect
      return fn(...args) // fn 为effect传进来 componentEffect
    } finally {
      effectStack.pop() //完成依赖收集后从effect数组删掉这个 effect
      // resetTracking() 
      /* 将activeEffect还原到之前的effect */
      activeEffect = effectStack[effectStack.length - 1]
    }
  };

  /* 配置一下初始化参数 */
  effect.id = eid++;
  effect._isEffect = true;
  effect.active = true;
  effect.raw = fn;
  effect.deps = []; /* 用于收集相关依赖 */
  effect.options = options
  return effect;
}