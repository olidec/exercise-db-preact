import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import Menu from "../components/Menu.jsx";
import { cartCount, cartItems } from "../signals/warenkorb";

const Warenkorb = () => {
  return (
    <>
      <div>
        <h2>Warenkorb</h2>
        <h2>{cartCount}</h2>
      </div>
    </>
  );
};

export default Warenkorb;
