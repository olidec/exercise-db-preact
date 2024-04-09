import { h } from "preact";
import { signal } from "@preact/signals";
import { Link } from "preact-router/match";
const Card = ({ key, id, summary, content }) => {
  return (
    <>
      <div className="karte">
        <h2>ID: {id}</h2>
        <h3>Summary</h3>

        <hr />
        <div className="summary">{summary}</div>

        <hr />
        <Link href={`/exercise-db-preact/${id}`}>
          <h3>Content</h3>
        </Link>

        <hr />
        <div className="content">{content}</div>
        <hr />
      </div>
    </>
  );
};

export default Card;
