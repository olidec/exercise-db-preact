import { WarenkorbContext } from "../signals/warenkorb.jsx";
import { useContext } from "preact/hooks";
import WarenCard from "./WarenCard.jsx";
import { useEffect } from "preact/hooks";

const Warenkorb = ({}) => {
  const { cartItems, getCartCount } = useContext(WarenkorbContext);

  useEffect(() => {
    MathJax.typeset();
  }, [cartItems.value]);

  return (
    <>
      <div className="inhalt">
        <h1>Warenkorb ({getCartCount()})</h1>
        <hr />
        <div>
          {cartItems.value.map((ex, index) => (
            <WarenCard
              key={ex.id}
              id={ex.id}
              content={ex.content}
              summary={ex.summary}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Warenkorb;
