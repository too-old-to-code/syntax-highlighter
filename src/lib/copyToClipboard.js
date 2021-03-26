const getThemeBackgroundColor = (HTMLVal) => {
  let codeMirror = HTMLVal.querySelector(".CodeMirror");
  let styles = getComputedStyle(codeMirror);
  return styles["background-color"];
};

const addLineNumber = (element, number) => {
  element.insertAdjacentHTML(
    "afterbegin",
    `<span>${number + (number < 10 && "&nbsp;")}|&nbsp;</span>`
  );
};

const resetTableAndReturnCells = (table) => {
  const [td] = table.querySelectorAll("td");
  td.innerHTML = "";
  return [td];
};

// const resetTableAndReturnCells = (table) => {
//   const [td] = table.querySelectorAll(".td");
//   td.innerHTML = "";
//   return [td];
// };

const getLinesOfCode = (element) => element.querySelectorAll("pre");

const cloneCodeElement = (HTMLVal) =>
  HTMLVal.querySelector(".CodeMirror-wrap").cloneNode(true);

function copyToClipboard(HTMLVal, lineNumbers, table, start) {
  const cloneOfCode = cloneCodeElement(HTMLVal);
  const [tableCell] = resetTableAndReturnCells(table);
  console.log(tableCell);

  const themeBgColor = getThemeBackgroundColor(HTMLVal);
  tableCell.style.backgroundColor = themeBgColor;

  // Add the code into the offscreen table
  tableCell.appendChild(cloneOfCode);

  const lines = getLinesOfCode(tableCell);

  [].forEach.call(lines, (line, index) => {
    line.style.backgroundColor = themeBgColor;
    line.style.fontFamily = "monospace";
    line.insertAdjacentHTML("beforeend", "<p>");
    if (lineNumbers) {
      addLineNumber(line, index + start);
    }
  });

  const doc = document;
  if (doc.body.createTextRange) {
    const range = doc.body.createTextRange();
    range.moveToElementText(table);
    range.select();
  } else if (window.getSelection) {
    console.log("herere");
    const selection = window.getSelection();
    const range = doc.createRange();
    range.selectNodeContents(table);
    console.log("RAnge", range);
    selection.removeAllRanges();
    selection.addRange(range);
  }
  let a = doc.execCommand("copy");
  console.log(a);
  window.getSelection().removeAllRanges();
}

export { copyToClipboard };
