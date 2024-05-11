import { useState } from "preact/hooks";
import { askServer } from "../utils/connector";

export default function Login() {
  const [log, setLog] = useState({
    username: "",
    password: "",
  });

  const doLogin = async (e) => {
    e.preventDefault();
    const res = await askServer("/login", "POST", log);
    console.log(res);
    if (res.err) {
      console.log(res.err);
    } else {
      setLog({
        username: "",
        password: "",
      });
    }
  };

  const updateUserHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setLog((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <>
      <form
        className="pure-form pure-form-aligned"
        onSubmit={(e) => doLogin(e)}
      >
        <legend>Login</legend>
        <fieldset>
          <div class="pure-control-group">
            <label for="username">Username </label>
            <input
              type="text"
              name="username"
              id="username"
              value={log.username}
              onChange={updateUserHandler}
              placeholder="Username"
            />
          </div>

          <div class="pure-control-group">
            <label for="password">Password </label>

            <input
              type="password"
              name="password"
              id="password"
              value={log.password}
              onChange={updateUserHandler}
              placeholder="Password"
            />
          </div>

          <div class="pure-controls">
            <button className="pure-button pure-button-primary" type="submit">
              Login
            </button>
          </div>
        </fieldset>
      </form>
    </>
  );
}
