import { h } from "preact";

import Button from "../components/Button.jsx";
import Menu from "../components/Menu.jsx";
import Form from "../components/Form.jsx";
import { useState } from "preact/hooks";

const Home = () => {
  const [data, setData] = useState({});

  return (
    <>
      {/* Andere Routen */}
      <div id="equation"></div>

      <Button />
      <div id="user-form">
        <Form />
      </div>
    </>
  );
};
export default Home;
