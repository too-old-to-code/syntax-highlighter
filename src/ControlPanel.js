const languages = [
  { value: "javascript", text: "JavaScript" },
  { value: "lua", text: "Lua" },
  { value: "ruby", text: "Ruby" },
  { value: "php", text: "PHP" },
  { value: "htmlembedded", text: "HTML" },
];

const themes = [
  { value: "material", text: "material" },
  { value: "3024-day", text: "3024-day" },
  { value: "base16-light", text: "base16-light" },
  { value: "duotone-light", text: "duotone-light" },
  { value: "eclipse", text: "eclipse" },
  { value: "elegant", text: "elegant" },
];

const Options = ({ options }) => {
  return options.map(({ value, text }) => (
    <option key={value} value={value}>
      {text}
    </option>
  ));
};

export const ControlPanel = ({
  setLineNumbers,
  lineNumbers,
  setFontSize,
  fontSize,
  setTheme,
  theme,
  mode,
  setMode,
}) => {
  return (
    <div className="level has-text-light">
      <div className="level-item has-text-centered">
        <div>
          <label className="checkbox mr-2">Line numbers</label>
          <input
            type="checkbox"
            checked={lineNumbers}
            onChange={({ target }) => setLineNumbers(target.checked)}
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
            <Options options={themes} />
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
            <Options options={languages} />
          </select>
        </div>
      </div>
    </div>
  );
};
