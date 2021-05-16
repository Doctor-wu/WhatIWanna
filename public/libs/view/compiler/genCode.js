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
    return genIf(ast);
  } else if (ast.for && !ast.forProccessed) {
    ast.forProccessed = true;
    return genFor(ast);
  } else if (ast.binds && !ast.bindsProccessed) {
    ast.bindsProccessed = true;
    return genBind(ast);
  } else if (ast.type === "element") {
    return genElement(ast);
  } else if (ast.type === "expr") {
    return genExpr(ast);
  } else if (ast.type === "text") {
    return genText(ast);
  }
}

function genElement(ast) {
  let parseToken = JSON.stringify({ _static: ast._static, events: ast.events });
  return `_c("${ast.tagName}", ${parseToken}, _ra(${JSON.stringify(ast.attrs)})${ast.children ? ', [' + ast.children.map(generate).filter(Boolean) + ']' : ''})`;
}

function genExpr(ast) {
  return `_s(${ast.content})`;
}

function genText(ast) {
  return ast.content.trim() ? `_t('${ast.content.trim()}')` : '';
}

function genIf(ast) {
  return `(typeof ${ast.if.ifCondition} === 'undefined' ? false : !!${ast.if.ifCondition})? ${generate(ast)} : _e()`;
}

function genFor(ast) {
  return `_i(${ast.for.state}, function(${ast.for.alias.item}${ast.for.alias.index ? ',' + ast.for.alias.index : ''}){return ${generate(ast)}})`;
}

function genBind(ast) {
  // 暂时还没想到可以做什么额外操作
  return generate(ast);
}

export default generate;