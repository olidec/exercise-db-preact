import { useEffect, useContext } from "preact/hooks";
import { SearchContext } from "../signals/exercise.jsx";
import LatexComponent from "./LatexComponent.jsx";

const Card = ({
  id,
  summary,
  content,
  solution,
  difficulty,
  authorId,
  categories,
  subcategories,
  isModal,
  handleDifficultyChange,
  handleLanguageChange,
}) => {
  const difficultyMapping = {
    1: "Leicht",
    2: "Mittel",
    3: "Schwer",
  };
  const { cartSearch, searchText, categor } = useContext(SearchContext);
  const schwierigkeitText = difficultyMapping[difficulty];

  // useEffect(() => {
  //   if (window.MathJax) {
  //     const contentElement = document.getElementById(`content-${id}`);
  //     const summaryElement = document.getElementById(`summary-${id}`);
  //     const solutionElement = document.getElementById(`solution-${id}`);

  //     if (contentElement) {
  //       contentElement.innerHTML = ""; // Clear previous content
  //       contentElement.appendChild(document.createTextNode(content)); // Add new content
  //       window.MathJax.typesetPromise([contentElement]);
  //     }

  //     if (summaryElement) {
  //       summaryElement.innerHTML = ""; // Clear previous content
  //       summaryElement.appendChild(document.createTextNode(summary)); // Add new content
  //       window.MathJax.typesetPromise([summaryElement]);
  //     }

  //     if (solutionElement) {
  //       // solutionElement.innerHTML = ""; // Clear previous content
  //       // solutionElement.appendChild(document.createTextNode(solution)); // Add new content
  //       // window.MathJax.typesetPromise([solutionElement]);
  //     }
  //   }
  // }, [
  //   cartSearch.value,
  //   content,
  //   summary,
  //   solution,
  //   difficulty,
  //   authorId,
  //   categories,
  //   handleLanguageChange,
  //   handleDifficultyChange,
  // ]);

  return (
    <div className="karte">
      <h2>Aufgabe {id}</h2>

      <div id={`content-${id}`} className="content">
        <LatexComponent latexContent={content} />
      </div>

      {isModal && (
        <>
          <hr />
          <h5>Lösung</h5>
          <div id={`solution-${id}`} className="solution">
            <LatexComponent latexContent={solution} />
          </div>
          <h5>Kategorie: {categories}</h5>
          <h5>Subkategorie: {subcategories}</h5>
          <h5>Autor: {authorId}</h5>
          <h5>Schwierigkeitsgrad: {schwierigkeitText}</h5>
        </>
      )}
    </div>
  );
};

export default Card;
