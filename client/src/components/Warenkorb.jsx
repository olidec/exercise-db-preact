import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import Menu from "./Menu.jsx";

import { WarenkorbContext } from "../signals/warenkorb.jsx";
import { useContext } from "preact/hooks";
import CardListWaren from "./CardListWaren.jsx";
import { askServer } from "../utils/connector";

const Warenkorb = () => {
  const { cartItems, getCartCount, arrayIDs } = useContext(WarenkorbContext);

  const getDownload = async () => {
    try {
      const route = "/api/download";
      const method = "POST";
      const body = { exerciseIds: arrayIDs }; // Daten, die gesendet werden sollen

      const res = await askServer(route, method, body);

      console.log(res);
    } catch (error) {
      console.error("Fehler beim Herunterladen der Übungen:", error);
    }
  };

  return (
    <>
      <h1>Warenkorb ({getCartCount()})</h1>
      <button className="pure-button" onClick={getDownload}>
        Warenkorb downloaden
      </button>
      <hr />
      <div>
        <CardListWaren list={cartItems.value} />
      </div>
    </>
  );
};

export default Warenkorb;
