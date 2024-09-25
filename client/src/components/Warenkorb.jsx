import { WarenkorbContext } from "../signals/warenkorb.jsx";
import { useContext } from "preact/hooks";
import WarenCard from "./WarenCard.jsx";
import { useEffect } from "preact/hooks";
import AuthWrapper from "./AuthWrapper.jsx";
import { askServer } from "../utils/connector.js";
import LatexRenderer from "./LatexRenderer.jsx";

const Warenkorb = ({}) => {
  const { cartItems, getCartCount } = useContext(WarenkorbContext);

  const download = async () => {
    const res = await askServer("/api/download", "POST", {
      exerciseIds: cartItems.value.map((ex) => ex.id),
    });
    const texContent = res.response;
    console.log(texContent);
    // const texContent = `
    //     \\documentclass{article}
    //     \\begin{document}
    //     Hello, World!
    //     \\end{document}
    //   `;

    // Create a Blob from the content
    const blob = new Blob([texContent], { type: "text/plain" });

    // Create a link element
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "document.tex"; // Set the file name

    // Trigger the download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  // const download = async () => {
  //   const data = await askServer("/api/download", "GET");
  //   console.log(data);
  // };

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
      <button onClick={() => download()}>
        Ausgewählte Aufgaben im LaTeX Format herunterladen
      </button>
      <hr />
      <LatexRenderer />
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
