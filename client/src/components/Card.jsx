import { h } from "preact";
import { signal } from "@preact/signals";
import { Link } from "preact-router/match";
import { useState } from "react";
const Card = ({
  id,
  summary,
  content,
  solution,
  difficulty,
  author,
  categories,
  currentPath,
}) => {
  const detailPath = `/exercise-db-preact/${id}`;

  const difficultyMapping = {
    1: "Leicht",
    2: "Mittel",
    3: "Schwer",
  };

  const schwierigkeitText = difficultyMapping[difficulty];
  return (
    <div className="karte">
      {currentPath === detailPath ? "" : <h2>ID: {id}</h2>}

      <h3>Summary</h3>
      <hr />
      <div className="summary">{summary}</div>
      <hr />
      {/* Prüfen, ob der Benutzer sich bereits auf der Detailseite befindet */}
      {currentPath === detailPath ? (
        <h3>Content</h3>
      ) : (
        <Link href={detailPath}>
          <h3>Content</h3>
        </Link>
      )}
      <hr />
      <div className="content">{content}</div>
      <hr />

      {currentPath === detailPath ? (
        <>
          <h3>Lösung:</h3>
          <div className="solution">{solution}</div>
          <hr />
          <h5>Kategorien: {categories}</h5>
          <h5>Schwierigkeit: {schwierigkeitText}</h5>
          <h5>Autor: {author}</h5>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default Card;
