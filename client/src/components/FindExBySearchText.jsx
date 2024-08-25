import { useState, useContext } from "preact/hooks";
import { SearchContext } from "../signals/exercise.jsx";
import { FindExContext } from "./FindExSubCat.jsx";
import { askServer } from "../utils/connector";

export default function FindExBySearchText() {
  const { setCartSearch, showNotification, searchText } =
    useContext(SearchContext);
  const [inputValue, setInputValue] = useState("");
  const { resetSelection } = useContext(FindExContext);
  const onChange = (e) => {
    setInputValue(e.target.value);
  };

  const getEx = async (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") {
      showNotification("No exercise matches the search term.", "red");
      searchText.value = "-";
      setCartSearch([]);
      resetSelection(); // Reset selected category and subcategory
      return;
    }

    searchText.value = inputValue; // Update searchText with inputValue
    const route = `/api/ex?search=${inputValue}`;
    const res = await askServer(route, "GET");
    const extext = res.response;

    if (res.status !== 200 || extext.length === 0) {
      showNotification("No exercise matches the search term.", "red");
      setCartSearch([]);
    } else {
      setCartSearch(extext);
    }

    resetSelection(); // Reset selected category and subcategory
    setInputValue(""); // Clear the input field
  };

  return (
    <>
      <h2>Textsuche</h2>
      <form className="pure-form pure-form-aligned" onSubmit={getEx}>
        <div className="pure-control-group">
          <input id="exid-3" value={inputValue} onChange={onChange} />
          <button className="pure-button" type="submit">
            Find Exercises containing
          </button>
        </div>
      </form>
    </>
  );
}
