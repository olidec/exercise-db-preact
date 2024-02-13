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
  const [data, setData] = useState({});

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
      <Menu />

      <div>
        <button className="pure-button" onClick={() => getTest()}>
          Get Test
        </button>
        <button className="pure-button" onClick={() => getRoot()}>
          Get Root
        </button>
        <button className="pure-button" onClick={() => getSecret()}>
          Get Secret
        </button>
        <button className="pure-button" onClick={() => getWrongPassword()}>
          Get Secret (wrong password)
        </button>
      </div>
      <div id="equation"></div>
      <Data data={data} />
      <Button />
      <div id="user-form">
        <Form />
      </div>
      <hr />
      <hr />
      <div id="ex-form">
        <Exform />
      </div>
      <FindExById />

      <FindExAll />

      <FindExByIdFromServer />

      <div>
        <Router onChange={handleRoute}>
          {/* Andere Routen */}

          <Aufgaben path="/exercise-db-preact/aufgaben" />
          <Home path="/exercise-db-preact/home" />
        </Router>
      </div>
    </>
  );
}
