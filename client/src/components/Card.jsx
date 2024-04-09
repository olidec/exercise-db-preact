import { h } from "preact";
import { signal } from "@preact/signals";
import { Link } from "preact-router/match";
const Card = ({ id, summary, content, currentPath }) => {
  const detailPath = `/exercise-db-preact/${id}`;

  return (
    <div className="karte">
      <h2>ID: {id}</h2>
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
    </div>
  );
};

export default Card;
