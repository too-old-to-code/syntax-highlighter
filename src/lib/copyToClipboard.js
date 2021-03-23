function copyToClipboard(HTMLVal, lineNumbers, table) {
  var doc = document,
    range,
    selection;

  const td = table.querySelector("td");
  td.innerHTML = "";

  let a = HTMLVal.querySelector(".CodeMirror");
  let b = getComputedStyle(a);
  const color = b["background-color"];
  td.style.backgroundColor = color;

  const clone = HTMLVal.querySelector(".CodeMirror-wrap").cloneNode(true);

  const preTags = clone.querySelectorAll("pre");

  [].forEach.call(preTags, (tag, index) => {
    tag.style.fontFamily = "monospace";

    tag.insertAdjacentHTML("afterend", "<p>");
    if (lineNumbers) {
      tag.insertAdjacentHTML(
        "afterbegin",
        // `<span>${index + (index < 10 && "&nbsp;")}|&nbsp;&nbsp;</span>`
        `<span>${index + (index < 10 && "&nbsp;")}|&#9;&#9;</span>`
      );
    }
  });

  td.appendChild(clone);
  td.setAttribute("spellcheck", false);
  // let p = document.createElement("p");
  // p.setAttribute("spellcheck", false);
  // p.appendChild(td);
  // console.log(td.innerHTML);

  if (doc.body.createTextRange) {
    range = doc.body.createTextRange();
    range.moveToElementText(table);
    range.select();
  } else if (window.getSelection) {
    selection = window.getSelection();
    range = doc.createRange();
    range.selectNodeContents(table);
    console.log(range);
    selection.removeAllRanges();
    selection.addRange(range);
  }
  document.execCommand("copy");
  window.getSelection().removeAllRanges();
  const allLineBreaks = clone.querySelectorAll("p");
  setTimeout(() => {
    [].forEach.call(allLineBreaks, (el) => {
      el.remove();
    });
  }, 0);
}

export { copyToClipboard };
