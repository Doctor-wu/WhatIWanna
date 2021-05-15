let dirRE = /v-(.*)/;
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

}

function exprTokenHandler(token) {
  // 将该叶子的祖宗节点全部标记为动态
  tagTreeListDynamic(token);
}

function tagTreeListDynamic(token){
  let parent, tokenIndex = token;
  while(parent = tokenIndex.parent){
    if(parent._static === false) break; // 如果父节点已经标记过为动态，则不需要额外标记
    parent._static = false;
    tokenIndex = parent;
  }
}

function elementTokenHandler(token) {
  token.directives = {};
  token.events = {};
  
  const {
    attrs
  } = token;
  let attrKeys = Object.keys(attrs);
  attrKeys.forEach(key => {
    resolveTokenAttrs(token, key, attrs[key].value);
  });
}

function resolveTokenAttrs(token, key, value) {
  if (key.startsWith("v-")) {
    let match = key.match(dirRE);
    let dirName = match[1];
    let dirExpr = value;
    const dirItem = {
      dirName,
      dirExpr
    };
    token.directives[dirName] = token.directives[dirName] || [];
    token.directives[dirName].push(dirItem);
    console.log(dirItem);
  } else if(key.startsWith("@")){
    let match = key.match(evRE);
    let evtName = match[1];
    let evtValue = value;
    const evtItem = {
      evtName,
      evtValue,
    }
    token.events[evtName] = token.events[evtName] || [];
    token.events[evtName].push(evtItem);
    console.log(evtItem);
  }
}

function defaultTokenHandler(token) {
  console.warn("没有找到合适的token处理函数, token.type: ", token.type);
}

export default resolveToken;