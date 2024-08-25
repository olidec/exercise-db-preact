import { WarenkorbContext } from "../signals/warenkorb.jsx";
import { useContext } from "preact/hooks";
import WarenCard from "./WarenCard.jsx";
import { useEffect } from "preact/hooks";
import AuthWrapper from "./AuthWrapper.jsx";

const Warenkorb = ({}) => {
  const { cartItems, getCartCount } = useContext(WarenkorbContext);

  useEffect(() => {
    MathJax.typeset();
  }, [cartItems.value]);

  const swapItems = (index1, index2) => {
    if (index2 < 0 || index2 >= cartItems.value.length) return; // Überprüfen, ob der Index gültig ist
    const updatedItems = [...cartItems.value];
    [updatedItems[index1], updatedItems[index2]] = [
      updatedItems[index2],
      updatedItems[index1],
    ];
    cartItems.value = updatedItems;
  };

  return (
    <AuthWrapper>
      <h1>Warenkorb ({getCartCount()})</h1>
      <hr />
      <div>
        {cartItems.value.map((ex, index) => (
          <WarenCard
            index={index}
            id={ex.id}
            content={ex.content}
            summary={ex.summary}
            swapItems={swapItems}
          />
        ))}
      </div>
    </AuthWrapper>
  );
};

export default Warenkorb;
