import { useState, useEffect, useContext } from "preact/hooks";
import SearchCard from "./SearchCard.jsx";
import { SearchContext } from "../signals/exercise.jsx";

const SearchKorb = ({}) => {
  const { cartSearch, searchText, categor } = useContext(SearchContext);
  const [selectedDifficulties, setSelectedDifficulties] = useState([]); // Zustand für die ausgewählten Schwierigkeitsgrade

  console.log(cartSearch.value);
  useEffect(() => {
    MathJax.typeset();
  }, [cartSearch.value]);

  const normalizedList = Array.isArray(cartSearch.value)
    ? cartSearch.value
    : [cartSearch.value];

  // Aufgaben basierend auf den ausgewählten Schwierigkeitsgraden filtern
  const filteredList = normalizedList.filter(
    (ex) =>
      selectedDifficulties.length === 0 ||
      selectedDifficulties.includes(ex.difficulty)
  );

  const handleDifficultyChange = (difficulty) => {
    setSelectedDifficulties((prev) =>
      prev.includes(difficulty)
        ? prev.filter((d) => d !== difficulty)
        : [...prev, difficulty]
    );
  };

  return (
    <div>
      <h1>Suchresultate ({filteredList.length})</h1>

      <h3>
        {searchText.value === ""
          ? categor.value[0] + "  -  " + categor.value[1]
          : "Suchbegriff: " + searchText.value}
      </h3>

      <div className="checkbox-container">
        <span>Schwierigkeitsgrad:</span>
        <div className="checkbox-wrapper">
          <input
            type="checkbox"
            id="all"
            checked={selectedDifficulties.length === 0}
            onChange={() => setSelectedDifficulties([])}
          />
          <label htmlFor="all">Alle</label>
        </div>
        <div className="checkbox-wrapper">
          <input
            type="checkbox"
            id="leicht"
            checked={selectedDifficulties.includes(1)}
            onChange={() => handleDifficultyChange(1)}
          />
          <label htmlFor="leicht">Leicht</label>
        </div>
        <div className="checkbox-wrapper">
          <input
            type="checkbox"
            id="mittel"
            checked={selectedDifficulties.includes(2)}
            onChange={() => handleDifficultyChange(2)}
          />
          <label htmlFor="mittel">Mittel</label>
        </div>
        <div className="checkbox-wrapper">
          <input
            type="checkbox"
            id="schwer"
            checked={selectedDifficulties.includes(3)}
            onChange={() => handleDifficultyChange(3)}
          />
          <label htmlFor="schwer">Schwer</label>
        </div>
      </div>

      {filteredList &&
        filteredList.map((ex, index) => (
          <SearchCard
            key={ex.id}
            id={ex.id}
            summary={ex.summary}
            content={ex.content}
            categoryId={ex.categoryId}
            difficulty={ex.difficulty}
          />
        ))}
    </div>
  );
};

export default SearchKorb;
