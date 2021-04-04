const SaveSnippetModal = ({
  showModal,
  title,
  setTitle,
  state,
  value,
  toggleModal,
  dispatch,
  addToast,
  saveCode,
  setLastLoadedSnippet,
  saveSnippet,
}) => {
  return (
    <div className={`modal ${showModal ? "is-active" : ""}`}>
      <div className="modal-background" />
      <div className="modal-content">
        <div className="card">
          <div className="card-content">
            <div className="content">
              What will you save your code snippet as? The snippet will be
              stored in your browser storage.
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
                  const newSnippet = {
                    text: value,
                    date: Date.now(),
                    lang: state.currentLanguage,
                    title: title,
                  };
                  if (title) {
                    dispatch(saveCode(newSnippet));
                    setTitle("");
                    saveSnippet(state);
                    dispatch(
                      addToast(
                        {
                          message: `Created ${title}`,
                          level: "success",
                        },
                        dispatch
                      )
                    );
                    setLastLoadedSnippet(newSnippet);
                    toggleModal();
                  }
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
  );
};

export { SaveSnippetModal };
