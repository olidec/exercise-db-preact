import React, { useEffect } from "react";
// Import the LaTeXJSComponent from the local latex.js package
import { LaTeXJSComponent } from "/node_modules/latex.js/dist/latex.mjs";

const LatexComponent = ({ latexContent }) => {
  useEffect(() => {
    // Check if the 'latex-js' custom element is already defined
    if (!customElements.get("latex-js")) {
      // Define the 'latex-js' custom element using LaTeXJSComponent
      customElements.define("latex-js", LaTeXJSComponent);
    }
  }, []); // This effect runs only once when the component is mounted

  return (
    <div>
      <latex-js>{latexContent}</latex-js>
    </div>
  );
};

export default LatexComponent;
