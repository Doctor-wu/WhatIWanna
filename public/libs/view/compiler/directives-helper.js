
const forDirRE = /\(?\s*([^\)\()]*)\s*\)?\s+in\s+(.*)/;

const dirStrategy = {
  for: makeForDir,
  if: makeIfDir,
  bind: makeBindDir,
  default: makeDefaultDir,
};

function handleDirectives(token) {
  const dirKeys = Object.keys(token.directives);
  if (!dirKeys.length) return;
  dirKeys.forEach(key => {
    dirStrategy[key]
      ? dirStrategy[key](token)
      : dirStrategy.default(token, key);
  })
}

// 处理 [for] 指令
function makeForDir(token) {
  let dirItem = token.directives.for[0];
  let match = dirItem.dirValue.match(forDirRE);
  let index;
  let [content, item, state] = match;
  item = item.split(",").map(str => str.trim());
  if (item.length > 1) {
    index = item[1];
  }
  item = item[0];
  token.for = {
    state,
    alias: {
      item,
      index
    },
    content
  }
}

// 处理 [if] 指令
function makeIfDir(token) {
  let dirItem = token.directives.if[0];
  token.if = {
    ifCondition: dirItem.dirValue
  }
}
// 处理 [bind] 指令
function makeBindDir(token) {
  token.binds = token.directives.bind.map(item => {
    return {
      stateName: item.dirExpr,
      stateValue: item.dirValue
    }
  });
}
// 处理 [未知] 指令
function makeDefaultDir(token, key) {
  console.log("default", token.directives[key]);
}

export default handleDirectives;