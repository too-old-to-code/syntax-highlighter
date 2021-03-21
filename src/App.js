import "./App.css";
import { useState } from "react";

import { Controlled as CodeMirror } from "react-codemirror2";
import "./languages";

function App() {
  const [value, setValue] = useState();
  const [theme, setTheme] = useState("3024-day");
  const [HTMLVal, setHTML] = useState();
  const [mode, setMode] = useState("javascript");
  const [lineNumbers, setLineNumbers] = useState(false);
  const [fontSize, setFontSize] = useState(8);

  return (
    <div className="App has-background-info-dark	" style={{ height: "100vh" }}>
      <div
        className="container"
        // style={{ overflow: "hidden", height: "100vh" }}
      >
        <section className="section">
          <div className="block">
            <h1 className="is-size-2 has-text-centered has-text-light">
              Code syntax highlighter for Word
            </h1>
          </div>
          <div className="level has-text-light">
            <div className="level-item has-text-centered">
              <div>
                <label className="checkbox mr-2">Line numbers</label>
                <input
                  type="checkbox"
                  checked={lineNumbers}
                  onChange={({ target }) =>
                    console.log(target) || setLineNumbers(target.checked)
                  }
                />
              </div>
            </div>
            <div className="level-item has-text-centered">
              <label className="mr-2">Font size</label>
              <input
                className="input"
                type="number"
                value={fontSize}
                style={{ maxWidth: "70px" }}
                onChange={({ target }) => setFontSize(target.value)}
              />
            </div>
            <div className="level-item has-text-centered">
              <label className="mr-2">Theme</label>
              <div className="select">
                <select
                  value={theme}
                  onChange={({ target }) => {
                    setTheme(target.value);
                  }}
                >
                  <option value="material">material</option>
                  <option value="3024-day">3024-day</option>
                  <option value="base16-light">base16-light</option>
                  <option value="duotone-light">duotone-light</option>
                  <option value="eclipse">eclipse</option>
                  <option value="elegant">elegant</option>
                </select>
              </div>
            </div>
            <div className="level-item has-text-centered">
              <label className="mr-2">Language</label>

              <div className="select">
                <select
                  value={mode}
                  onChange={({ target }) => {
                    setMode(target.value);
                  }}
                >
                  <option value="javascript">JavaScript</option>
                  <option value="lua">Lua</option>
                  <option value="ruby">Ruby</option>
                  <option value="php">PHP</option>
                  <option value="htmlembedded">HTML</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        <div className="columns">
          <div className="column"></div>
          <div
            className="column is-two-thirds"
            style={{ position: "relative" }}
          >
            <div
              // classNameName="box"
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                fontSize: `${fontSize}pt`,
                // border: "1px grey dashed",
              }}
            >
              <CodeMirror
                value={value}
                style={{ fontSize: "19pt" }}
                options={{
                  mode: mode,
                  indentUnit: 4,
                  smartIndent: true,
                  lineNumbers: false,
                  lineWrapping: true,
                  firstLineNumber: 22,
                  theme: theme,
                  inputStyle: "contenteditable",
                  // lineNumberFormatter: (a) => {
                  //   console.log(a);
                  //   return "This " + a;
                  // },
                }}
                onBeforeChange={(editor, data, value) => {
                  // console.log(editor);
                  // console.log(data);
                  // console.log(value);
                  setHTML(
                    document.getElementsByClassName("CodeMirror")[0] //.innerHTML
                    // document.getElementsByTagName("body")[0] //.innerHTML
                  );
                  setValue(value);
                }}
              />

              <div
                className="buttons"
                style={{
                  position: "absolute",
                  bottom: "10px",
                  right: "10px",
                  zIndex: 100,
                }}
              >
                <button
                  className="button is-primary"
                  onClick={() => CopyToClipboard("CodeMirror")}
                >
                  Copy
                </button>
              </div>
            </div>
          </div>
          <div className="column"></div>
        </div>
      </div>
    </div>
  );

  function CopyToClipboard(element) {
    var doc = document,
      range,
      selection;

    const preTags = HTMLVal.querySelectorAll("pre");

    [].forEach.call(preTags, (tag, index) => {
      tag.style.fontFamily = "monospace";

      tag.insertAdjacentHTML("afterend", "<p>");
      if (lineNumbers) {
        tag.insertAdjacentHTML(
          "afterbegin",
          `<span>${index}|&nbsp;&nbsp;&nbsp;</span>`
        );
      }
    });

    if (doc.body.createTextRange) {
      range = doc.body.createTextRange();
      range.moveToElementText(HTMLVal);
      range.select();
    } else if (window.getSelection) {
      selection = window.getSelection();
      range = doc.createRange();
      range.selectNodeContents(HTMLVal);
      console.log(range);
      selection.removeAllRanges();
      selection.addRange(range);
    }
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
    const allLineBreaks = HTMLVal.querySelectorAll("p");
    setTimeout(() => {
      [].forEach.call(allLineBreaks, (el) => {
        el.remove();
      });
    }, 0);
  }
}

export default App;
