import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import Menu from "../components/Menu.jsx";
import { cartItems } from "../signals/warenkorb";
import DelCard from "../components/DelCard.jsx";
import CardList from "../components/CardList";
import { useSignal } from "@preact/signals";

const Warenkorb = ({ items }) => {
  useEffect(() => {
    MathJax.typeset();
  }, [items]);

  return (
    <>
      <h1>Waren</h1>
      <div>
        <CardList
          cards={items.map((ex, index) => (
            <DelCard
              key={ex.id}
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
