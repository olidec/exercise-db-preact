import { useEffect, useContext } from "preact/hooks";
import { SearchContext } from "../signals/exercise.jsx";

const Card = ({
  id,
  summary,
  content,
  solution,
  difficulty,
  author,
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

  useEffect(() => {
    if (window.MathJax) {
      const contentElement = document.getElementById(`content-${id}`);
      const summaryElement = document.getElementById(`summary-${id}`);
      const solutionElement = document.getElementById(`solution-${id}`);

      if (contentElement) {
        contentElement.innerHTML = ""; // Clear previous content
        contentElement.appendChild(document.createTextNode(content)); // Add new content
        window.MathJax.typesetPromise([contentElement]);
      }

      if (summaryElement) {
        summaryElement.innerHTML = ""; // Clear previous content
        summaryElement.appendChild(document.createTextNode(summary)); // Add new content
        window.MathJax.typesetPromise([summaryElement]);
      }

      if (solutionElement) {
        solutionElement.innerHTML = ""; // Clear previous content
        solutionElement.appendChild(document.createTextNode(solution)); // Add new content
        window.MathJax.typesetPromise([solutionElement]);
      }
    }
  }, [
    cartSearch.value,
    content,
    summary,
    solution,
    difficulty,
    categories,
    handleLanguageChange,
    handleDifficultyChange,
  ]);

  return (
    <div className="karte">
      <h3>Aufgabe mit ID: {id}</h3>
      <h5>Schwierigkeit: {schwierigkeitText}</h5>

      <h3>Summary</h3>
      <hr />
      <div id={`summary-${id}`} className="summary">
        {summary}
      </div>
      <hr />

      <h3>Content</h3>
      <hr />
      <div id={`content-${id}`} className="content">
        {content}
      </div>
      <hr />

      {isModal && (
        <>
          <h3>Lösung:</h3>
          <div id={`solution-${id}`} className="solution">
            {solution}
          </div>
          <hr />
          <h5>Kategorie: {categories}</h5>
          <h5>Subkategorie: {subcategories}</h5>
          <h5>Schwierigkeit: {schwierigkeitText}</h5>
          <h5>Autor: {author}</h5>
        </>
      )}
    </div>
  );
};

export default Card;
