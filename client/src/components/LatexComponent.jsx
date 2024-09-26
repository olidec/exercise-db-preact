import { useEffect } from "preact/hooks";

const LatexComponent = ({ latexContent }) => {
  useEffect(() => {
    import("https://cdn.jsdelivr.net/npm/latex.js/dist/latex.mjs")
      .then((module) => {
        const { LaTeXJSComponent } = module;
        if (!customElements.get("latex-js")) {
          customElements.define("latex-js", LaTeXJSComponent);
        }
      })
      .catch((error) =>
        console.error("Error loading LaTeXJSComponent:", error)
      );
  }, [latexContent]); // This runs only on mount

  return (
    <div>
      <latex-js>{latexContent}</latex-js>
    </div>
  );
};

export default LatexComponent;
