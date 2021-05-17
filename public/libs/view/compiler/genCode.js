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

const AST2VNODE_KEYS = ["_static", "binds", "events"];


function generate(ast) {
  if (ast.if && !ast.ifProccessed) {
    ast.ifProccessed = true;
    const result = genIf(ast);
    return result;
  } else if (ast.for && !ast.forProccessed) {
    ast.forProccessed = true;
    return genFor(ast);
  } else if (ast.binds && !ast.bindsProccessed) {
    ast.bindsProccessed = true;
    return genBind(ast);
  } else if (ast.elseProccessed) {
    return undefined;
  } else if (ast.type === "element") {
    if (ast.tagName === "template") return genTemplate(ast);
    return genElement(ast);
  } else if (ast.type === "expr") {
    return genExpr(ast);
  } else if (ast.type === "text") {
    return genText(ast);
  }
}

function genElement(ast) {
  let children = ast.children;
  let parseToken = {};
  AST2VNODE_KEYS.forEach(key => {
    parseToken[key] = ast[key];
  });
  parseToken = JSON.stringify(parseToken);
  return `_c("${ast.tagName}", ${parseToken}, _ra(${JSON.stringify(ast.attrs)})${children ? ', [' + children.map(generate).filter(Boolean) + ']' : ''})`;
}

function genTemplate(ast) {
  const ary = ast.children.map(generate).filter(Boolean);
  return `_sa([${ary}])`;
}

function genExpr(ast) {
  return `_s(${ast.content})`;
}

function genText(ast) {
  return ast.content.trim() ? `_t('${ast.content.replace(/\n/g, "")}')` : '';
}

function genIf(ast) {
  let condition = ast.if.ifCondition.type === "expr" ? ast.if.ifCondition.value : `"${ast.if.ifCondition.value}"`;
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
  // 暂时还没想到可以做什么额外操作
  return generate(ast);
}

export default generate;