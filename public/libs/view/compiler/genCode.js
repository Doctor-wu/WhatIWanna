/**
    生成VNode
    VNode: [
        tagName 标签名
        type 节点类型
          -- ELEMENT 元素
          -- TEXT 文本
        _static 是否为静态节点，如果是静态节点，在DOM-DIFF的时候就不必进行比较
        children 节点的孩子
        attr 属性
        events 事件
    ]
*/



function generate(ast) {
  if (ast.if && !ast.ifProccessed) {
    ast.ifProccessed = true;
    const result = genIf(ast);
    return result;
  }
  else if (ast.for && !ast.forProccessed) {
    ast.forProccessed = true;
    return genFor(ast);
  }
  else if (ast.elseProccessed) {
    return undefined;
  }
  else if (ast.tagName === "slot") {
    return genSlot(ast);
  }
  else if (ast.tagName === "template") {
    return genTemplate(ast);
  }
  else if (ast.type === "element") {
    return genElement(ast);
  }
  else if (ast.type === "expr") {
    return genExpr(ast);
  }
  else if (ast.type === "text") {
    return genText(ast);
  }
}

function genElement(ast) {
  let children = ast.children;
  const data = genData(ast);
  return `_c("${ast.tagName}", _ra(${data}), ${children ? '[' + children.map(generate).filter(Boolean) + ']' : '[]'},${ast._static})`;
}

function genTemplate(ast) {
  let slotName;
  if (ast.attrs["slot-name"]) {
    slotName = ast.attrs["slot-name"];
  }

  const ary = ast.children.map(generate).filter(Boolean);
  return `_sa([${ary}]${slotName ? (`, "${slotName}"`) : ""})`;
}

function genExpr(ast) {
  return `_s(${ast.content})`;
}

function genText(ast) {
  return ast.content.trim() ? `_t('${ast.content.replace(/\n/g, "")}')` : '';
}

function genIf(ast) {
  let condition = ast.if.ifCondition.value;
  const result = `(${condition})? ${generate(ast)} : ${(ast.else && !ast.elseProccessed) ? generate(ast.else) : undefined}`;
  if (ast.else) {
    ast.else.elseProccessed = true;
  }
  return result;
}

function genFor(ast) {
  return `_i(${ast.for.state}, function(${ast.for.alias.item}${ast.for.alias.index ? ',' + ast.for.alias.index : ''}){return ${generate(ast)}})`;
}

function genBind(ast) {
  if (!ast.binds) return "";
  let str = "";
  Object.keys(ast.binds).forEach(key => {
    str += `${key}: ${ast.binds[key].value},`
  });
  return str;
}

function genAttrStr(ast) {
  if (!ast.attrs) return "";
  let str = "";
  Object.keys(ast.attrs).forEach(key => {
    str += `${key}: "${ast.attrs[key].value}",`
  });
  return str;
}

function genHandler(ast) {
  if (!ast.events) return "";
  let keys = Object.keys(ast.events);
  if (keys.length === 0) return "";
  let str = "events:{";
  keys.forEach(key => {
    str += `${key}: [${ast.events[key].map(item => item.value)}],`
  });
  str += "}";
  return str;
}

function genComponentConfig(ast) {
  if (!ast.componentConfig) return "";
  console.log(ast.componentConfig);
}

function genData(ast) {
  let str = "{";

  str = str + genBind(ast);
  str = str + genAttrStr(ast);
  str = str + genHandler(ast);
  str = str + genComponentConfig(ast);

  str += "}";
  // console.log(str);
  return str;
}

function genSlot(ast) {
  const slotKey = ast.attrs.name ? ast.attrs.name.value : 'default';
  return `_rsl($slots.${slotKey} || ${(ast.children.map(generate).filter(Boolean).toString()) || undefined})`;
}


export default generate;