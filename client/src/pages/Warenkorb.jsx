import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import Menu from "../components/Menu.jsx";
import {
  cartItems,
  cartCount,
  getCart,
  getCartCount,
} from "../signals/warenkorb";

import CardListKorb from "../components/CardListKorb.jsx";
import { useSignal } from "@preact/signals";

const Warenkorb = ({ items }) => {
  useEffect(() => {
    MathJax.typeset();
  }, [items]);

  return (
    <>
      <h1>Waren</h1>
      <div>
        <p>{getCartCount()}</p>
        <CardListKorb list={cartItems.value} />
      </div>
    </>
  );
};

export default Warenkorb;
