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
import Warenkorb from "./pages/warenkorb.jsx";
export function App() {
  // useEffect(async () => {
  //   const res = await askServer("/", "GET")
  //   setData(res)
  // }, [])
  const handleRoute = (e) => {
    // Beispiel für zusätzliche Logik bei Routenänderungen
    console.log("Route changed to", e.url);
  };
  const getRoot = async () => {
    const res = await askServer("/", "GET");
    setData(res);
  };
  const getTest = async () => {
    const res = await askServer("/api/test", "GET");
    setData(res);
  };
  const getSecret = async () => {
    const res = await askServer("/api/secret", "POST", { pw: "password" });
    setData(res);
  };
  const getWrongPassword = async () => {
    const res = await askServer("/api/secret", "POST", { pw: "not this one" });
    setData(res);
  };

  return (
    <>
      <Router>
        <User path="/exercise-db-preact/" />
        <AddExercise path="/exercise-db-preact/add" />
        <FindExercise path="/exercise-db-preact/find" />
        <Warenkorb path="/exercise-db-preact/warenkorb" />
      </Router>
    </>
  );
}
