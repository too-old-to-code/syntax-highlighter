export const PageTitle = ({ text }) => {
  return (
    <section className="section">
      <div className="block">
        <h1 className="is-size-3 has-text-centered has-text-light">{text}</h1>
        <div className="columns">
          <div className="column is-two-thirds is-offset-2">
            <p className="has-text-light">
              Powered by{" "}
              <a
                href="https://codemirror.net/"
                className="has-background-light p-1"
              >
                CodeMirror
              </a>{" "}
              this site is able highlight your code snippets as you type them
              with no need for server requests. Make sure you use the 'Copy'
              button and then you can paste into Word.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
