import { StoreContext } from "./contexts/store";
import { useContext } from "react";
import { languageOptions } from "./options/languages";
import { themeOptions } from "./options/themes";
import {
  changeTheme,
  changeLanguage,
  changeFontSize,
  toggleLineNumbers,
  changeLineNumberStart,
  addToast,
} from "./contexts/store";

const Options = ({ options }) => {
  return options.map(({ value, text }) => (
    <option key={value} value={value}>
      {text}
    </option>
  ));
};

export const ControlPanel = ({ dispatch }) => {
  const store = useContext(StoreContext);

  return (
    <div className="level has-text-light">
      <div className="level-item has-text-centered">
        <div>
          <label className="checkbox mr-2">Line numbers</label>
          <input
            type="checkbox"
            checked={store.lineNumbers}
            onChange={async () => {
              dispatch(toggleLineNumbers());
              if (!store.lineNumbers) {
                dispatch(
                  addToast(
                    {
                      message:
                        "The line numbers are not visible on this page but will be present when you paste into Word",
                      date: Date.now(),
                    },
                    dispatch
                  )
                );
              }
            }}
          />
        </div>
      </div>

      <div className="level-item has-text-centered">
        <label className="mr-2">Line number start</label>
        <input
          className="input"
          disabled={!store.lineNumbers}
          type="number"
          value={store.lineNumberStart}
          style={{ maxWidth: "70px" }}
          onChange={({ target }) =>
            dispatch(changeLineNumberStart(target.value))
          }
        />
      </div>

      <div className="level-item has-text-centered">
        <label className="mr-2">Font size</label>
        <input
          className="input"
          type="number"
          value={store.fontSize}
          style={{ maxWidth: "70px" }}
          onChange={({ target }) => dispatch(changeFontSize(target.value))}
        />
      </div>

      <div className="level-item has-text-centered">
        <label className="mr-2">Theme</label>
        <div className="select">
          <select
            value={store.currentTheme}
            onChange={({ target }) => dispatch(changeTheme(target.value))}
          >
            <Options options={themeOptions} />
          </select>
        </div>
      </div>

      <div className="level-item has-text-centered">
        <label className="mr-2">Language</label>
        <div className="select">
          <select
            value={store.currentLanguage}
            onChange={({ target }) => dispatch(changeLanguage(target.value))}
          >
            <Options options={languageOptions} />
          </select>
        </div>
      </div>
    </div>
  );
};
