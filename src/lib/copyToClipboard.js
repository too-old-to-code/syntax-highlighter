const getThemeBackgroundColor = (HTMLVal) => {
  let codeMirror = HTMLVal.querySelector(".CodeMirror");
  let styles = getComputedStyle(codeMirror);
  return styles["background-color"];
};

const addLineNumber = (element, number) => {
  element.insertAdjacentHTML(
    "afterbegin",
    `<span>${number + (number < 10 && "&nbsp;")}|&#9;&#9;</span>`
  );
};

const resetTableAndReturnCells = (table) => {
  const [td1, td2, td3] = table.querySelectorAll("td");
  td2.innerHTML = "";
  return [td1, td2, td3];
};

const getLinesOfCode = (element) => element.querySelectorAll("pre");

const cloneCodeElement = (HTMLVal) =>
  HTMLVal.querySelector(".CodeMirror-wrap").cloneNode(true);

function copyToClipboard(HTMLVal, lineNumbers, table, start) {
  const cloneOfCode = cloneCodeElement(HTMLVal);
  const [firstTableCell, tableCell, lastTableCell] = resetTableAndReturnCells(
    table
  );

  const themeBgColor = getThemeBackgroundColor(HTMLVal);
  firstTableCell.style.backgroundColor = themeBgColor;
  tableCell.style.backgroundColor = themeBgColor;
  lastTableCell.style.backgroundColor = themeBgColor;

  // Add the code into the offscreen table
  tableCell.appendChild(cloneOfCode);

  const lines = getLinesOfCode(tableCell);

  [].forEach.call(lines, (line, index) => {
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
    const selection = window.getSelection();
    const range = doc.createRange();
    range.selectNodeContents(table);
    selection.removeAllRanges();
    selection.addRange(range);
  }
  doc.execCommand("copy");
  window.getSelection().removeAllRanges();
}

export { copyToClipboard };
