import "./App.css";
import "./languages";
import { useState, useRef, useReducer, useEffect } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import { ControlPanel } from "./ControlPanel";
import { PageTitle } from "./PageTitle";
import { copyToClipboard } from "./lib/copyToClipboard";
import {
  StoreContext,
  initialState,
  storeReducer,
  restoreState,
  saveCode,
  deleteCode,
  changeLanguage,
} from "./contexts/store";
import { OffscreenTable } from "./OffscreenTable";

function saveSetup(state) {
  const serializedState = JSON.stringify(state);
  localStorage.setItem("syntax-highlighter", serializedState);
}

function App() {
  const [state, dispatch] = useReducer(storeReducer, initialState);
  const [value, setValue] = useState();
  const codeHTML = useRef();
  const table = useRef();
  const [showModal, setModal] = useState(false);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const serializedState = localStorage.getItem("syntax-highlighter");
    if (serializedState) {
      const state = JSON.parse(serializedState);
      if (initialState.version === state.version) {
        dispatch(restoreState(state));
      }
    }
  }, []);

  useEffect(() => {
    saveSetup(state);
  }, [state]);

  useEffect(() => {
    if (showModal) {
      document.documentElement.classList.add("is-clipped");
    } else {
      document.documentElement.classList.remove("is-clipped");
    }
  }, [showModal]);

  const toggleModal = () => {
    setModal(!showModal);
  };

  return (
    <StoreContext.Provider value={state}>
      <div className={`modal ${showModal ? "is-active" : ""}`}>
        <div className="modal-background" />
        <div className="modal-content">
          <div className="card">
            <div className="card-content">
              <div className="content">
                Give this snapshot a name. The snapshot will be stored in your
                browser.
              </div>
              <div className="content">
                <input
                  className="input"
                  value={title}
                  onChange={({ target }) => setTitle(target.value)}
                  type="text"
                  placeholder="Text input"
                ></input>
              </div>
              <div className="buttons is-right">
                <button
                  className="button is-success is-right"
                  onClick={() => {
                    if (title) {
                      dispatch(
                        saveCode({
                          text: value,
                          date: Date.now(),
                          lang: state.currentLanguage,
                          title: title,
                        })
                      );
                      setTitle("");
                    }
                    saveSetup(state);
                    toggleModal();
                  }}
                >
                  OK
                </button>
                <button
                  className="button is-danger is-right"
                  onClick={toggleModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="App has-background-info-dark">
        <OffscreenTable ref={table} fontSize={state.fontSize} />
        <div className="container">
          <PageTitle text="Code syntax highlighter for Word" />
          <ControlPanel dispatch={dispatch} />

          <div className="columns">
            <div className="column"></div>
            <div className="column is-half" style={{ position: "relative" }}>
              <div
                style={{
                  position: "relative",
                  left: 0,
                  right: 0,
                  fontSize: `${state.fontSize}pt`,
                }}
              >
                <CodeMirror
                  ref={codeHTML}
                  value={value}
                  options={{
                    mode: state.currentLanguage,
                    indentUnit: 4,
                    smartIndent: true,
                    lineNumbers: false,
                    lineWrapping: true,
                    firstLineNumber: 22,
                    theme: state.currentTheme,
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
                    top: "10px",
                    right: "10px",
                    zIndex: 30,
                  }}
                >
                  <button
                    className="button is-danger	"
                    onClick={() => setValue("")}
                  >
                    Clear
                  </button>
                </div>

                <div
                  className="buttons"
                  style={{
                    position: "absolute",
                    bottom: "10px",
                    right: "10px",
                    zIndex: 30,
                  }}
                >
                  <button
                    className="button has-background-info-light	"
                    onClick={toggleModal}
                  >
                    Snapshot
                  </button>
                  <button
                    className="button has-background-info-light	"
                    onClick={() => {
                      copyToClipboard(
                        codeHTML.current.ref,
                        state.lineNumbers,
                        table.current,
                        state.lineNumberStart,
                        fontSize
                      );
                    }}
                  >
                    Copy
                  </button>
                </div>
              </div>
              <div
                className="field is-grouped is-grouped-multiline"
                style={{ margin: "3px auto", justifyContent: "center" }}
              >
                {state.saved.map((savedCode) => {
                  return (
                    <div className="control" key={savedCode.date}>
                      <div className="tags has-addons">
                        <span
                          className="tag is-button is-primary"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            setValue(savedCode.text);
                            dispatch(changeLanguage(savedCode.lang));
                          }}
                        >
                          {savedCode.title}
                        </span>
                        <span
                          className="tag is-delete"
                          onClick={() => {
                            dispatch(deleteCode(savedCode.date));
                          }}
                        ></span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="column"></div>
          </div>
        </div>
      </div>
    </StoreContext.Provider>
  );
}

export default App;
