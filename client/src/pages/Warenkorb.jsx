import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import Menu from "../components/Menu.jsx";
import { cartCount, cartItems } from "../signals/warenkorb";
import CardDel from "../components/CardDel";
import CardList from "../components/CardList";
const Warenkorb = () => {
  useEffect(() => {
    MathJax.typeset();
  }, [cartItems.value]);

  return (
    <>
      <h1>Warenkorb</h1>
      <div className="kartenContainer">
        <CardList
          cards={cartItems.value.map((ex, index) => (
            <CardDel
              key={index}
              id={ex.id}
              content={ex.content}
              summary={ex.summary}
            />
          ))}
        />
      </div>
    </>
  );
};

export default Warenkorb;
