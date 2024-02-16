import { h } from "preact";

import Menu from "../components/Menu.jsx";

import { useState } from "preact/hooks";
import Card from "../components/Card.jsx";
import CardList from "../components/CardList.jsx";
const Warenkorb = () => {
  const [cartItems, setcartItems] = useState([]);
  const [exerciseList, setExerciseList] = useState([]);
  return (
    <>
      <Menu></Menu>
      <div>
        <h2>Warenkorb</h2>

        <CardList
          cards={exerciseList.map((ex, index) => (
            <Card
              key={index}
              id={ex.id}
              content={ex.content}
              summary={ex.summary}
            />
          ))}
        />
      </div>
      {/* Andere Routen */}
    </>
  );
};
export default Warenkorb;
