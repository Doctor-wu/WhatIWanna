import handleDirectives from "./directives-helper.js";
import handleEvents from "./events-helper.js";

let dirRE = /v-([^>\s]*)/;
let evRE = /@(.*)/;

const tokenStrategy = {
  text: textTokenHandler,
  expr: exprTokenHandler,
  element: elementTokenHandler,
  default: defaultTokenHandler,
}

function resolveToken(token) {
  if (!token) return;
  tokenStrategy[token.type] ?
    tokenStrategy[token.type](token) :
    tokenStrategy.default(token);
};

function textTokenHandler(token) {
  return token;
}

// 处理表达式token
function exprTokenHandler(token) {
  // 将该叶子的祖宗节点全部标记为动态
  tagTreeListDynamic(token);
}


// 将该叶子的祖宗节点全部标记为动态
function tagTreeListDynamic(token) {
  let parent, tokenIndex = token;
  while (parent = tokenIndex.parent) {
    if (parent._static === false) break; // 如果父节点已经标记过为动态，则不需要额外标记
    parent._static = false;
    tokenIndex = parent;
  }
}

// 处理元素token
function elementTokenHandler(token) {
  token.directives = {};
  token.events = {};

  const {
    attrs
  } = token;
  let attrKeys = Object.keys(attrs);
  attrKeys.forEach(key => {
    resolveTokenAttrs(token, key, attrs[key] || true);
  });

  // 处理事件
  handleEvents(token);
  // 处理指令
  handleDirectives(token);
}

// 处理 [attrs] token
function resolveTokenAttrs(token, key, value) {
  if (key.startsWith("@")) {
    let match = key.match(evRE);
    let evtName = match[1];
    let evtValue = value;

    token.events[evtName] = token.events[evtName] || [];
    token.events[evtName].push(evtValue);
    delete token.attrs[key];
  } else if (key.startsWith("v-")) {
    let match = key.match(dirRE);
    let dirName = match[1];
    let dirExpr;
    let dirValue = value;
    dirName = dirName.split(":");
    if (dirName.length > 1) {
      dirExpr = dirName[1];
    }
    dirName = dirName[0];
    const dirItem = {
      dirName,
      dirExpr,
      dirValue,
    };

    token.directives[dirName] = token.directives[dirName] || [];
    token.directives[dirName].push(dirItem);
    delete token.attrs[key];
  }
}

// 兜底处理token
function defaultTokenHandler(token) {
  console.warn("没有找到合适的token处理函数, token.type: ", token.type);
}

export default resolveToken;