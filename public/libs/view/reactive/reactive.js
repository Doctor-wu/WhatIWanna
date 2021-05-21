import {
  activeEffect
} from "./effective.js";

const rawToReactive = new Map;
const reactiveToRaw = new Map;

const targetMap = new Map;

const handlers = {
  get,
  set,
}

export function reactive(target) {
  if (isPrimitive(target)) {
    target = {
      value: target
    }
  }
  /* 判断目标对象是否被effect */
  /* observed 为经过 new Proxy代理的函数 */
  let observed = rawToReactive.get(target) /* { [target] : obseved  } */
  if (observed !== void 0) {
    /* 如果目标对象已经被响应式处理，那么直接返回proxy的observed对象 */
    return observed
  }
  if (reactiveToRaw.has(target)) {
    /* { [observed] : target  } 说明target是一个proxy */
    return target
  }

  observed = new Proxy(target, handlers);

  rawToReactive.set(target, observed);
  reactiveToRaw.set(observed, target);
  /* 返回observed对象 */
  return observed
}

function get(target, key, receiver) {
  const res = Reflect.get(target, key, receiver);

  activeEffect && track(target, key);

  /* 数据绑定 */
  return isObject(res) ?
    reactive(res) :
    res
}

function track(target, key) {
  /* 当打印或者获取属性的时候 console.log(this.a) 是没有activeEffect的 当前返回值为0  */
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    /*  target -map-> depsMap  */
    targetMap.set(target, (depsMap = new Map()))
  }
  let dep = depsMap.get(key);
  if (!dep) {
    /* key : dep dep观察者 */
    depsMap.set(key, (dep = new Set()));
  }
  /* 当前activeEffect */
  if (!dep.has(activeEffect)) {
    /* dep添加 activeEffect */
    dep.add(activeEffect)
    /* 每个 activeEffect的deps 存放当前的dep */
    activeEffect.deps.push(dep)
  }
}

function set(
  target,
  key,
  value,
  receiver
) {
  const oldValue = target[key];
  // if (oldValue === value) return true;
  const result = Reflect.set(target, key, value, receiver);
  /* 判断当前对象，和存在reactiveToRaw 里面是否相等 */
  if (target === reactiveToRaw.get(receiver)) {
    /* 改变原有属性 */
    /*  TriggerOpTypes.SET -> set */
    trigger(target, key, value, oldValue)
  }
  return result
}

function trigger(
  target,
  key,
  newValue,
  oldValue
) {
  /* 获取depssMap */
  const depsMap = targetMap.get(target)
  /* 没有经过依赖收集的 ，直接返回 */
  if (!depsMap) {
    return
  }
  const effects = new Set();        /* effect钩子队列 */
  const computedRunners = new Set() /* 计算属性队列 */
  const add = (effectsToAdd) => {
    if (effectsToAdd) {
      effectsToAdd.forEach(effect => {
        effects.add(effect)  /* 储存对应的dep */
      })
    }
  }

  add(depsMap.get(key))

  const run = (effect) => {
    if (effect.options.scheduler) { /* 放进 scheduler 调度*/
      effect.options.scheduler(effect)
    } else {
      effect() /* 不存在调度情况，直接执行effect */
    }
  }

  //TODO: 必须首先运行计算属性的更新，以便计算的getter
  //在任何依赖于它们的正常更新effect运行之前，都可能失效。

  // computedRunners.forEach(run) /* 依次执行computedRunners 回调*/
  effects.forEach(run) /* 依次执行 effect 回调（ TODO: 里面包括渲染effect ）*/
}


function isObject(obj) {
  return typeof obj === "object";
}

const primitiveKeyObj = {
  undefined: true,
  null: true,
  string: true,
  number: true,
  boolean: true,
  symbol: true,
  bigint: true,
}

function isPrimitive(value) {
  let typeStr = typeof value;
  return typeStr in primitiveKeyObj;
}