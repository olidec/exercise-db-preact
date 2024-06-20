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
}) => {
  const difficultyMapping = {
    1: "Leicht",
    2: "Mittel",
    3: "Schwer",
  };

  const schwierigkeitText = difficultyMapping[difficulty];

  return (
    <div className="karte">
      <h3>Aufgabe mit ID: {id}</h3>
      <h5>Schwierigkeit: {schwierigkeitText}</h5>

      <h3>Summary</h3>
      <hr />
      <div className="summary">{summary}</div>
      <hr />

      <h3>Content</h3>
      <hr />
      <div className="content">{content}</div>
      <hr />

      {isModal && (
        <>
          <h3>Lösung:</h3>
          <div className="solution">{solution}</div>
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
