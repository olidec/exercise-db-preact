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
import Aufgaben from "./pages/aufgaben.jsx";
import { Router, route } from "preact-router";
import { h } from "preact";
import Home from "./pages/home.jsx";
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
        <Menu path="/exercise-db-preact" />
      </Router>
      <Router>
        <Home path="/exercise-db-preact/home" />
      </Router>
      <Router>
        <Aufgaben path="/exercise-db-preact/aufgaben" />
      </Router>
      ;
    </>
  );
}
