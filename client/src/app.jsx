import { useEffect, useState } from "preact/hooks";
import "./app.css";
import { askServer } from "./utils/connector.js";
import Data from "./components/Data.jsx";
import Button from "./components/Button.jsx";
import Form from "./components/Form.jsx";
import Exform from "./components/Exform.jsx";
import FindExAll from "./components/FindExAll.jsx";
import FindExById from "./components/FindExById.jsx";
import FindExByIdFromServer from "./components/FindExByIdFromServer.jsx";
import Menu from "./components/Menu.jsx";
import AddExercise from "./pages/AddExercise.jsx";
import FindExercise from "./pages/FindExercise.jsx";
import { Router, route } from "preact-router";
import { h } from "preact";
import User from "./pages/User.jsx";
import WarenkorbTotal from "./pages/WarenkorbTotal.jsx";
import DelCard from "./components/DelCard";
import CardList from "./components/CardList";
import { cartItems } from "./signals/warenkorb";
export function App() {
  // useEffect(async () => {
  //   const res = await askServer("/", "GET")
  //   setData(res)
  // }, [])

  return (
    <>
      <Router>
        <User path="/exercise-db-preact/" />
        <AddExercise path="/exercise-db-preact/add" />
        <FindExercise path="/exercise-db-preact/find"></FindExercise>
        <WarenkorbTotal path="/exercise-db-preact/warenkorb"></WarenkorbTotal>
      </Router>
    </>
  );
}
