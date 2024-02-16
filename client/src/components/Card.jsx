import { h } from "preact";

import { useState } from "preact/hooks";
import { signal } from "@preact/signals";
const Card = ({ key, id, summary, content }) => {
  //const [cartItems, setcartItems] = useState([]);
  //const [exerciseList, setExerciseList] = useState([]);
  const cartItems = signal([]);
  const addToCart = (id) => {
    cartItems.value.push(id);

    console.log(cartItems.value);
  };
  return (
    <>
      <div key={key} className="kartenContainer">
        <div className="karte">
          <h3>Summary</h3>
          <hr />
          <div className="summary">{summary}</div>
          <hr />
          <h3>Content</h3>
          <hr />
          <div className="content">{content}</div>
          <hr />
          <div className="warenkorbColumn">
            <label>Zum Warenkorb hinzufügen</label>
            <input type="checkbox" onChange={() => addToCart({ id })} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
