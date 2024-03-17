import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import Menu from "./Menu.jsx";

import { WarenkorbContext } from "../signals/warenkorb.js";
import { useContext } from "preact/hooks";
import CardListWaren from "./CardListWaren.jsx";
import { useSignal } from "@preact/signals";

const Warenkorb = ({ items }) => {
  const { cartItems, getCart, getCartCount } = useContext(WarenkorbContext);
  useEffect(() => {
    MathJax.typeset();
  }, [items]);

  return (
    <>
      <h1>Warenkorb</h1>
      <div>
        <p>{getCartCount()}</p>
        <CardListWaren list={getCart()} />
      </div>
    </>
  );
};

export default Warenkorb;
