import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import Menu from "./Menu.jsx";

import { WarenkorbContext } from "../signals/warenkorb.jsx";
import { useContext } from "preact/hooks";
import CardListWaren from "./CardListWaren.jsx";

const Warenkorb = ({}) => {
  const { cartItems, getCart, getCartCount } = useContext(WarenkorbContext);

  return (
    <>
      <div className="inhalt">
      <h1>Warenkorb ({getCartCount()})</h1>
      <hr />
      <div>
        <CardListWaren list={cartItems.value} />
      </div>
      </div>
    </>
  );
};

export default Warenkorb;
