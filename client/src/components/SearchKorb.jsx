import { useState, useEffect, useContext } from "preact/hooks";
import SearchCard from "./SearchCard.jsx";
import { SearchContext } from "../signals/exercise.jsx";

const SearchKorb = ({ openModal }) => {
  const { cartSearch, searchText, categor } = useContext(SearchContext);
  const [selectedDifficulties, setSelectedDifficulties] = useState([]); // Zustand für die ausgewählten Schwierigkeitsgrade
  const [selectedLanguage, setSelectedLanguage] = useState("Egal"); // Zustand für die ausgewählte Sprache

  const normalizedList = Array.isArray(cartSearch.value)
    ? cartSearch.value
    : [cartSearch.value];

  // Aufgaben basierend auf den ausgewählten Schwierigkeitsgraden und Sprache filtern
  const filteredList = normalizedList.filter(
    (ex) =>
      (selectedDifficulties.length === 0 ||
        selectedDifficulties.includes(ex.difficulty)) &&
      (selectedLanguage === "Egal" || ex.language === selectedLanguage)
  );

  const handleDifficultyChange = (difficulty) => {
    setSelectedDifficulties((prev) =>
      prev.includes(difficulty)
        ? prev.filter((d) => d !== difficulty)
        : [...prev, difficulty]
    );
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  return (
    <div className="search-container">
      <h2>Suchresultate ({filteredList.length})</h2>

      <h3>
        {searchText.value === ""
          ? categor.value[1] === ""
            ? categor.value[0]
            : categor.value[0] + " - " + categor.value[1]
          : searchText.value === null
            ? "Suchbegriff: "
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
          <label
            htmlFor="all"
            className={selectedDifficulties.length === 0 ? "selected" : ""}
          >
            Alle
          </label>
        </div>
        <div className="checkbox-wrapper">
          <input
            type="checkbox"
            id="leicht"
            checked={selectedDifficulties.includes(1)}
            onChange={() => handleDifficultyChange(1)}
          />
          <label
            htmlFor="leicht"
            className={selectedDifficulties.includes(1) ? "selected" : ""}
          >
            Leicht
          </label>
        </div>
        <div className="checkbox-wrapper">
          <input
            type="checkbox"
            id="mittel"
            checked={selectedDifficulties.includes(2)}
            onChange={() => handleDifficultyChange(2)}
          />
          <label
            htmlFor="mittel"
            className={selectedDifficulties.includes(2) ? "selected" : ""}
          >
            Mittel
          </label>
        </div>
        <div className="checkbox-wrapper">
          <input
            type="checkbox"
            id="schwer"
            checked={selectedDifficulties.includes(3)}
            onChange={() => handleDifficultyChange(3)}
          />
          <label
            htmlFor="schwer"
            className={selectedDifficulties.includes(3) ? "selected" : ""}
          >
            Schwer
          </label>
        </div>
      </div>

      <div className="checkbox-container">
        <span>Sprache:</span>
        <div className="checkbox-wrapper">
          <input
            type="radio"
            id="egal"
            name="language"
            checked={selectedLanguage === "Egal"}
            onChange={() => handleLanguageChange("Egal")}
          />
          <label
            htmlFor="egal"
            className={selectedLanguage === "Egal" ? "selected" : ""}
          >
            Egal
          </label>
        </div>
        <div className="checkbox-wrapper">
          <input
            type="radio"
            id="deutsch"
            name="language"
            checked={selectedLanguage === "Deutsch"}
            onChange={() => handleLanguageChange("Deutsch")}
          />
          <label
            htmlFor="deutsch"
            className={selectedLanguage === "Deutsch" ? "selected" : ""}
          >
            Deutsch
          </label>
        </div>
        <div className="checkbox-wrapper">
          <input
            type="radio"
            id="englisch"
            name="language"
            checked={selectedLanguage === "English"}
            onChange={() => handleLanguageChange("English")}
          />
          <label
            htmlFor="englisch"
            className={selectedLanguage === "English" ? "selected" : ""}
          >
            English
          </label>
        </div>
      </div>

      <div className="results-container">
        {filteredList.length === 0 ? (
          <p>Keine Ergebnisse gefunden</p>
        ) : (
          filteredList.map((ex) => (
            <SearchCard
              key={ex.id}
              id={ex.id}
              summary={ex.summary}
              content={ex.content}
              categoryId={ex.categoryId}
              difficulty={ex.difficulty}
              solution={ex.solution}
              authorId={ex.authorId}
              subcategories={ex.subcategories}
              openModal={openModal}
              handleDifficultyChange={handleDifficultyChange}
              handleLanguageChange={handleLanguageChange}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default SearchKorb;
