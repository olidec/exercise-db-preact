import { useState } from "preact/hooks";
import { askServer } from "../utils/connector";
import { useContext } from "preact/hooks";
import { SearchContext } from "../signals/exercise.jsx";

export default function Form() {
  const { showNotification } = useContext(SearchContext);

  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
  });

  const addNewUser = async (e) => {
    e.preventDefault();
    const res = await askServer("/register", "POST", user);
    if (res.response.err && res.response.err.code === "P2002") {
      showNotification("ERROR: User already exists", "red");
    } else {
      setUser({
        email: "",
        username: "",
        password: "",
      });
      showNotification(
        "User added successfully\nRedirecting to Login Page",
        "green"
      );
      setTimeout(() => {
        window.location.assign("/login");
      }, 3500);
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
            {/* <span class="pure-form-message-inline">
              This is a required field.
            </span> */}
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
