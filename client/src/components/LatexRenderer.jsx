// import { componentDidMount } from "react";

componentDidMount = () => {
  const script = document.createElement("script");
  script.src = "https://cdn.jsdelivr.net/npm/latex.js/dist/latex.mjs";
  script.async = true;
  document.body.appendChild(script);
};

customElements.define("latex-js", LaTeXJSComponent);

export default function LatexRenderer({}) {
  return (
    <div>
      <latex-js>
        $x^2$ jyguyg \begin{enumerate}
        \item $x^2$ \item $x^3$ \end{enumerate}
      </latex-js>
    </div>
  );
}
