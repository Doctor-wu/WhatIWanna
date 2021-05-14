import {
  isCloseSelf
} from "./utils.js";

let tagNameReg = `\\w+(?:-\\w+)*`;

let startTagReg = new RegExp(`\\<(${tagNameReg})`);

let endTagReg = new RegExp(`\\<\\/${tagNameReg}(\\/?)\\>`);

let commentReg = /\<!--(?:\s*(.*(?=\s))\s*)-->/;
let attribute = /\s*([^=]+)\s*=\s*['"`]([^'"`]*)['"`]\s*/;

let expReg = /\s*\{\{([^\}]*)\}\}\s*/;


function parseHTML(html, options) {
  let stack = [],
    ast = [],
    walkIndex = 0;

  while (html) {

    // 注释
    let commentMatch = html.match(commentReg);
    if (commentMatch && commentMatch.index === 0) {
      const token = {
        type: "comment",
        content: commentMatch[1],
      }
      if (stack.length !== 0) {
        let parent = stack.slice(-1)[0];
        parent.children.push(token);
        token.parent = parent;
      } else {
        token.parent = null;
        ast.push(token); // ast的根节点
      }
      walk(commentMatch[0].length)
    }


    // 结束[开始标签]
    if (html.indexOf(">") === 0) {
      walk(1);
      continue;
    }

    let endTagMatch = endTagReg.exec(html);
    // 处理[结束标签]
    if (endTagMatch && endTagMatch.index === 0) {
      walk(endTagMatch[0].length);
      stack.pop();
      continue;
    }

    let tagStart = String(html).indexOf("<");
    // 开始[开始标签]
    if (tagStart === 0) {
      handleTagStart();
      continue;
    }

    handleText();

    // break;
  }

  function handleText() {
    let tagStart = String(html).indexOf("<");
    let rest = html.slice(0, tagStart);
    let resolveVal;
    resolveVal = resolveText(rest);
    walk(rest.length - resolveVal.length);
    rest = resolveVal;
    const token = {
      type: "text",
      content: rest,
    };
    if (stack.length !== 0) {
      let parent = stack.slice(-1)[0];
      parent.children.push(token);
    } else {
      ast.push(token);
    }
    walk(rest.length);
  }

  function resolveText(text) {
    while (text) {
      let match = expReg.exec(text);
      if (!match) return text;

      if (match.index !== 0) {
        let rest = text.slice(0, match.index);

        let token = {
          type: "text",
          content: rest,
        };

        if (stack.length !== 0) {
          let parent = stack.slice(-1)[0];
          parent.children.push(token);
        } else {
          ast.push(token);
        }
        text = text.slice(rest.length);
      } else {
        let pattern = match[1];
        let token = {
          type: "expr",
          content: pattern,
        };

        if (stack.length !== 0) {
          let parent = stack.slice(-1)[0];
          parent._static = false;
          parent.children.push(token);
        } else {
          ast.push(token);
        }
        text = text.slice(match[0].length);
      }
    }
    return true;
  }

  function handleTagStart() {
    let match = html.match(startTagReg);
    if (match) {
      let [source, tagName] = match;
      let {
        index
      } = match;
      let token = {
        type: "element",
        tagName,
        attrs: {},
        children: [],
        _static: true,
        index: index + walkIndex,
      }
      walk(source.length);
      while (html.indexOf(">") > 0) {
        let item = attribute.exec(html);
        token.attrs[item[1]] = resolveAttr(item[2]);
        tagStaticToken(token.attrs[item[1]], token);
        walk(item[0].length);
      }

      if (stack.length !== 0) {
        let parent = stack.slice(-1)[0];
        parent.children.push(token);
        token.parent = parent;
      } else {
        token.parent = null;
        ast.push(token); // ast的根节点
      }

      if (!isCloseSelf(tagName)) {
        stack.push(token);
      }
    }
  }

  function resolveAttr(value) {
    let match = expReg.exec(value);
    if (match) {
      return {
        type: "expr",
        value: match[1]
      }
    }
    return {
      type: "text",
      value,
    };
  }

  function walk(n) {
    walkIndex += n;
    html = html.substring(n);
  }

  return ast;
}

function tagStaticToken(item, token) {
  if (item.type === "expr") token._static = false;
}

export default parseHTML;