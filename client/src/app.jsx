import "./app.css";
import AddExercise from "./pages/AddExercise.jsx";
import FindExercise from "./pages/FindExercise.jsx";
import { Router } from "preact-router";
import User from "./pages/User.jsx";
import Warenkorb from "./components/Warenkorb.jsx";
import SearchKorb from "./components/SearchKorb.jsx";
import Menu from "./components/Menu.jsx";
import Login from "./components/Login.jsx";
import EditExercise from "./components/EditExercise.jsx";
import Home from "./pages/Home.jsx";
import AufgDetails from "./components/AufgDetails.jsx";
import Modal from "./components/Modal.jsx";
import { useState } from "preact/hooks";

export function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);

  const handleRouteChange = (e) => {
    setCurrentPath(e.url);
  };

  const openModal = (id) => {
    setSelectedExercise(id);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedExercise(null);
  };

  return (
    <>
      <div id="app">
        <Router onChange={handleRouteChange}>
          <Home path="/exercise-db-preact" />
        </Router>
      </div>
      {currentPath !== "/exercise-db-preact/" && <Menu />}
      <div className="inhalt">
        <Router onChange={handleRouteChange}>
          <Login path="/exercise-db-preact/login" />
          <AddExercise path="/exercise-db-preact/add" />
          <FindExercise path="/exercise-db-preact/find" />
          <Warenkorb path="/exercise-db-preact/warenkorb" />
          <SearchKorb path="/exercise-db-preact/search" openModal={openModal} />
          <EditExercise path="/exercise-db-preact/edit/:id" />
        </Router>
      </div>
      <Modal isOpen={modalOpen} onClose={closeModal}>
        {selectedExercise && <AufgDetails id={selectedExercise} />}
      </Modal>
    </>
  );
}
