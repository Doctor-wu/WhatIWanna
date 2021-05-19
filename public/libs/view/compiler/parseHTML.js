import resolveToken from "./token-helper.js";
import {
  isCloseSelf
} from "./utils.js";

let tagNameReg = `\\w+(?:-\\w+)*`;

let startTagReg = new RegExp(`\\<(${tagNameReg})`);

let startTagEndRE = /(?:\s*\/)?>/;

let endTagReg = new RegExp(`\\<\\/${tagNameReg}(\\/?)\\>`);

let commentReg = /\<!--(?:\s*(.*(?=\s))\s*)-->/;
let attribute = /\s*([^\/\s=>]+)(?:\s*=\s*['"`]([^'"`]*)['"`]\s*)?/;

let expReg = /\{\{([^\}]*)\}\}/;

const getBaseToken = () => ({
  _static: true,
});


let oldhtml;

function parseHTML(html, options) {
  oldhtml = html; // 记录处理前的html
  let stack = [],
    ast = [],
    walkIndex = 0;

  while (html) {
    // debugger;

    // 注释
    let commentMatch = html.match(commentReg);
    if (commentMatch && commentMatch.index === 0) {
      const token = Object.assign(getBaseToken(), {
        type: "comment",
        content: commentMatch[1],
      });
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
    let startTagEndMatch = html.match(startTagEndRE);
    if (startTagEndMatch && startTagEndMatch.index === 0) {
      walk(startTagEndMatch[0].length);
      if (startTagEndMatch[0].includes("/"))
        stack.pop();
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

    if (html === oldhtml) {
      // 如果旧的处理前后的HTML相同，那么此次处理无效，会造成死循环，故抛出错误
      throw new Error("处理HTML失败，死循环抛出", html);
    }
    // break;
  }

  function handleText() {
    let tagStart = String(html).indexOf("<");
    let rest = html.slice(0, tagStart === -1 ? undefined : tagStart);
    let resolveVal;
    // 解析表达式
    resolveVal = resolveText(rest);
    walk(rest.length - resolveVal.length);
    // 如果是一段纯表达式，resolveval之后返回空字符串 "{{state}}" => ""
    if (!resolveVal) return;
    rest = resolveVal;
    const token = Object.assign(getBaseToken(), {
      type: "text",
      content: rest,
    });
    if (stack.length !== 0) {
      let parent = stack.slice(-1)[0];
      token.parent = parent;
      parent.children.push(token);
    } else {
      ast.push(token);
    }
    resolveToken(token);
    walk(rest.length);
  }

  function resolveText(text) {
    while (text) {
      let match = expReg.exec(text);
      if (!match) return text;

      if (match.index !== 0) {
        let rest = text.slice(0, match.index);
        let token = Object.assign(getBaseToken(), {
          type: "text",
          content: rest,
          _static: true,
        });

        if (stack.length !== 0) {
          let parent = stack.slice(-1)[0];
          parent.children.push(token);
        } else {
          ast.push(token);
        }
        text = text.slice(rest.length);
      } else {
        let pattern = match[1];
        let token = Object.assign(getBaseToken(), {
          type: "expr",
          content: pattern,
          _static: false,
        });

        if (stack.length !== 0) {
          let parent = stack.slice(-1)[0];
          token.parent = parent;
          parent.children.push(token);
        } else {
          ast.push(token);
        }
        resolveToken(token);
        text = text.slice(match[0].length);
      }
    }
    return text;
  }

  function handleTagStart() {
    let match = html.match(startTagReg);
    if (match) {
      let [source, tagName] = match;
      let {
        index
      } = match;
      const token = Object.assign(getBaseToken(), {
        type: "element",
        tagName,
        attrs: {},
        children: [],
        _static: true,
        index: index + walkIndex,
      });
      walk(source.length);

      let tagEndMatch = html.match(startTagEndRE);
      while (tagEndMatch && tagEndMatch.index > 0) {
        let item = attribute.exec(html);
        token.attrs[item[1]] = resolveAttr(item[2]);
        walk(item[0].length);
        tagEndMatch = html.match(startTagEndRE);
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
      resolveToken(token);
    }
  }

  function resolveAttr(value) {
    let match = expReg.exec(value);
    if (match) {
      return Object.assign(getBaseToken(), {
        type: "expr",
        value: match[1],
        _static: false
      });
    }
    return Object.assign(getBaseToken(), {
      type: "text",
      value,
      _static: true
    });
  }

  function walk(n) {
    walkIndex += n;
    html = html.substring(n);
  }

  return ast;
}


export default parseHTML;