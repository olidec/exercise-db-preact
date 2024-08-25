import { useState } from "preact/hooks";
import { askServer } from "../utils/connector";

export default function Form() {
  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
  });

  const addNewUser = async (e) => {
    e.preventDefault();
    // console.log("hallo");
    const res = await askServer("/register", "POST", user);
    console.log(res);
    if (res.err) {
      console.log(res.err);
    } else {
      setUser({
        email: "",
        username: "",
        password: "",
      });
      console.log("user added");
      // window.location.assign("/login");
    }
  };

  const updateUserHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <>
      <h1>Registrieren</h1>
      <form
        className="pure-form pure-form-aligned"
        onSubmit={(e) => addNewUser(e)}
      >
        <fieldset>
          <div class="pure-control-group">
            <label for="aligned-email">Email </label>

            <input
              type="email"
              name="email"
              id="email"
              value={user.email}
              onChange={updateUserHandler}
              placeholder="E-Mail"
            />
            <span class="pure-form-message-inline">
              This is a required field.
            </span>
          </div>

          <div class="pure-control-group">
            <label for="aligned-name">Username </label>
            <input
              type="text"
              name="username"
              id="username"
              value={user.username}
              onChange={updateUserHandler}
              placeholder="Username"
            />
          </div>

          <div class="pure-control-group">
            <label for="aligned-password">Password </label>

            <input
              type="password"
              name="password"
              id="password"
              value={user.password}
              onChange={updateUserHandler}
              placeholder="Password"
            />
          </div>

          <div class="pure-controls">
            <button className="pure-button pure-button-primary" type="submit">
              Add new user
            </button>
          </div>
        </fieldset>
      </form>
    </>
  );
}
