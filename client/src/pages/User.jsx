import { h } from "preact";

import Button from "../components/Button.jsx";
import Menu from "../components/Menu.jsx";
import Form from "../components/Form.jsx";
import { useState } from "preact/hooks";

const Home = () => {
  const [data, setData] = useState({});

  return (
    <>
      <div id="user-form" className="inhalt">
        <Form />
      </div>
    </>
  );
};
export default Home;
