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
  updateCode,
  removeToast,
  addToast,
} from "./contexts/store";
import { OffscreenTable } from "./OffscreenTable";
import { NotificationPanel } from "./NotificationPanel";
import { SaveSnippetModal } from "./modals/SaveSnippetModal";

function saveSnippet(state) {
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
  const [lastLoadedSnippet, setLastLoadedSnippet] = useState("");

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
    saveSnippet(state);
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
      <NotificationPanel
        notifications={state.toasts}
        removeToast={(payload) => dispatch(removeToast(payload))}
      />
      <SaveSnippetModal
        showModal={showModal}
        title={title}
        setTitle={setTitle}
        state={state}
        value={value}
        toggleModal={toggleModal}
        dispatch={dispatch}
        addToast={addToast}
        saveCode={saveCode}
        saveSnippet={saveSnippet}
        setLastLoadedSnippet={setLastLoadedSnippet}
      />

      <div className="App has-background-info-dark">
        <OffscreenTable ref={table} fontSize={state.fontSize} />
        <div className="container">
          <PageTitle text="Code syntax highlighter for Word" />

          <div className="columns">
            <div className="column">
              <ControlPanel dispatch={dispatch} />
            </div>
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
                    viewportMargin: Infinity,
                  }}
                  onBeforeChange={(editor, data, value) => {
                    if (!value) {
                      setLastLoadedSnippet("");
                    }
                    setValue(value);
                  }}
                />

                <div className="buttons button-wrapper buttons-top">
                  <button
                    className="button is-danger	"
                    disabled={Boolean(!value)}
                    onClick={() => {
                      setValue("");
                      setLastLoadedSnippet("");
                    }}
                  >
                    Clear
                  </button>
                </div>

                <div className="buttons button-wrapper buttons-bottom">
                  <button
                    className="button has-background-info-light	"
                    disabled={Boolean(!value)}
                    onClick={() => {
                      const updatedData = {
                        text: value,
                        date: lastLoadedSnippet.date,
                        lang: state.currentLanguage,
                        title: lastLoadedSnippet.title,
                      };
                      if (lastLoadedSnippet) {
                        dispatch(
                          addToast(
                            {
                              message: `Updates to ${lastLoadedSnippet.title} saved`,
                              level: "success",
                            },
                            dispatch
                          )
                        );
                        dispatch(updateCode(updatedData));
                      } else {
                        toggleModal();
                      }
                    }}
                  >
                    {lastLoadedSnippet ? "Save" : "Save as"}
                  </button>
                  <button
                    className="button has-background-info-light	"
                    disabled={Boolean(!value)}
                    onClick={() => {
                      copyToClipboard(
                        codeHTML.current.ref,
                        state.lineNumbers,
                        table.current,
                        state.lineNumberStart,
                        state.fontSize
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
                            setLastLoadedSnippet(savedCode);
                            dispatch(changeLanguage(savedCode.lang));
                          }}
                        >
                          {savedCode.title}
                        </span>
                        <span
                          className="tag is-delete"
                          onClick={() => {
                            dispatch(deleteCode(savedCode.date));
                            if (lastLoadedSnippet.date === savedCode.date) {
                              setLastLoadedSnippet("");
                            }
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
        <div style={{ textAlign: "center", marginTop: "40px", color: "white" }}>
          <a
            href="https://github.com/too-old-to-code/syntax-highlighter"
            style={{ color: "white" }}
          >
            Github repo
          </a>
        </div>
      </div>
    </StoreContext.Provider>
  );
}

export default App;
