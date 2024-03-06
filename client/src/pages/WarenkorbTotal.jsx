import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import Menu from "../components/Menu.jsx";
import { cartItems } from "../signals/warenkorb";
import Warenkorb from "./Warenkorb.jsx";
import { useSignal } from "@preact/signals";

const WarenkorbTotal = () => {
  return <Warenkorb items={cartItems.value}></Warenkorb>;
};

export default WarenkorbTotal;
