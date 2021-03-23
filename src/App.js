import "./App.css";
import { useState, useRef } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import "./languages";
import { ControlPanel } from "./ControlPanel";
import { PageTitle } from "./PageTitle";
import { copyToClipboard } from "./lib/copyToClipboard";

function App() {
  const [value, setValue] = useState();
  const [theme, setTheme] = useState("3024-day");
  // const [HTMLVal, setHTML] = useState();
  const [mode, setMode] = useState("javascript");
  const [lineNumbers, setLineNumbers] = useState(false);
  const [fontSize, setFontSize] = useState(8);
  const codeHTML = useRef();
  const table = useRef();

  return (
    <div className="App has-background-info-dark	" style={{ height: "100vh" }}>
      <div
        ref={table}
        style={{
          position: "absolute",
          left: "10000px",
          fontSize: `${fontSize}pt`,
        }}
      >
        <table
          style={{
            border: 0,
            position: "absolute",
          }}
        >
          <tbody>
            <tr>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="container">
        <PageTitle text="Code syntax highlighter for Word" />
        <ControlPanel
          setLineNumbers={setLineNumbers}
          lineNumbers={lineNumbers}
          setFontSize={setFontSize}
          fontSize={fontSize}
          setTheme={setTheme}
          theme={theme}
          mode={mode}
          setMode={setMode}
        />
        <div className="columns">
          <div className="column"></div>
          <div
            className="column is-two-thirds"
            style={{ position: "relative" }}
          >
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                fontSize: `${fontSize}pt`,
              }}
            >
              <CodeMirror
                ref={codeHTML}
                value={value}
                options={{
                  mode: mode,
                  indentUnit: 4,
                  smartIndent: true,
                  lineNumbers: false,
                  lineWrapping: true,
                  firstLineNumber: 22,
                  theme: theme,
                  inputStyle: "contenteditable",
                }}
                onBeforeChange={(editor, data, value) => {
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
                  onClick={() =>
                    copyToClipboard(
                      codeHTML.current.ref,
                      lineNumbers,
                      table.current
                    )
                  }
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
}

export default App;
