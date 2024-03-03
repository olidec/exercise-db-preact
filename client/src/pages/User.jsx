import { h } from "preact";
import Data from "../components/Data.jsx";
import Button from "../components/Button.jsx";
import Menu from "../components/Menu.jsx";
import Form from "../components/Form.jsx";
import { useState } from "preact/hooks";

const Home = () => {
  const [data, setData] = useState({});

  return (
    <>
      <div id="equation"></div>
      <Data data={data} />
      <Button />
      <div id="user-form">
        <Form />
      </div>
    </>
  );
};
export default Home;
