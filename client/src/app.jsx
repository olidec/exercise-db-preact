import { useEffect, useState } from "preact/hooks";
import "./app.css";

import AddExercise from "./pages/AddExercise.jsx";
import FindExercise from "./pages/FindExercise.jsx";
import { Router, Route, Link } from "preact-router";
import { h } from "preact";
import User from "./pages/User.jsx";
import Warenkorb from "./components/Warenkorb.jsx";
import AufgDetails from "./components/AufgDetails.jsx";

import Menu from "./components/Menu.jsx";
export function App() {
  return (
    <>
      <Menu></Menu>

      <Router>
        <User exact path="/exercise-db-preact/" />
        <AddExercise exact path="/exercise-db-preact/add" />

        <FindExercise exact path="/exercise-db-preact/find" />

        <AufgDetails exact path="/exercise-db-preact/:id" />

        <Warenkorb exact path="/exercise-db-preact/warenkorb" />
      </Router>
    </>
  );
}
