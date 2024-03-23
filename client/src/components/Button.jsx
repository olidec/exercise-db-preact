import { useState } from "preact/hooks";
import { askServer } from "../utils/connector";

export default function Button() {
  const [users, setUsers] = useState([]);

  const getAllUsers = async () => {
    const users = localStorage.getItem("users");
    if (users) {
      setUsers(JSON.parse(users));
      return;
    }
    else {
      const res = await askServer("/api/users", "GET");
      setUsers(res);
      localStorage.setItem("users", JSON.stringify(res));
    }
  };

  return (
    <>
      <button className="pure-button" onClick={() => getAllUsers()}>
        Get all Users
      </button>
      <ol>
        {users.map((user) => {
          return <li key={user.id}>{user.name}</li>;
        })}
      </ol>
    </>
  );
}
