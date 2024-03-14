import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import Menu from "./Menu.jsx";
import { cartItems, getCartCount } from "../signals/warenkorb.js";

import CardListWaren from "./CardListWaren.jsx";
import { useSignal } from "@preact/signals";

const Warenkorb = ({}) => {
  return (
    <>
      <h1>Warenkorb</h1>
      <div>
        <p>{getCartCount()}</p>
        <CardListWaren list={cartItems.value} />
        <hr />
      </div>
    </>
  );
};

export default Warenkorb;
