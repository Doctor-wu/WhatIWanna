let tagStartReg = /\<(\w+(?:-\w+)*)/;

let html = "<my-component style='color: red' class='comp'></my-component>";
console.log(tagStartReg.exec(html));


function parseHTML(html, options) {

  while (html) {
    let tagStart = html.indexOf(tagStartReg);
    if (tagStart === 0) {

    }
  }

  function walk(n) {
    html = html.substring(n);
  }
}


