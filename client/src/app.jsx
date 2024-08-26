import { useState } from "preact/hooks";
import { Router } from "preact-router";

import AddExercise from "./pages/AddExercise.jsx";
import FindExercise from "./pages/FindExercise.jsx";
import Warenkorb from "./components/Warenkorb.jsx";
import Menu from "./components/Menu.jsx";
import EditExercise from "./components/EditExercise.jsx";
import Home from "./pages/Home.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";

export function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);

  const loggedIn = localStorage.getItem("user") !== null;

  const handleRouteChange = (e) => {
    setCurrentPath(e.url);
  };

  return (
    <>
      {/* <div>
        <Router onChange={handleRouteChange}>
        </Router>
        </div> */}
      {loggedIn && (
        <div className="menu">
          <Menu />
        </div>
      )}
      {/* {currentPath !== "/" && <Menu />} */}
      <div className="inhalt">
        <Router onChange={handleRouteChange}>
          <Home path="/" />
          <LoginPage path="/login" />
          <RegisterPage path="/register" />
          <AddExercise path="/add" />
          <FindExercise path="/find" />
          <Warenkorb path="/warenkorb" />
          <EditExercise path="/edit/:id" />
        </Router>
      </div>
    </>
  );
}
