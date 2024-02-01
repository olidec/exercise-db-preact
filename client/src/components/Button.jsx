import { useState } from "preact/hooks";
import { askServer } from "../utils/connector";

export default function Button() {
    const [users, setUsers] = useState([{name: "user1", id: 0}]) 

    const getAllUsers = async () => {
        const res = await askServer("/api/users","GET")
        setUsers(res)
    }

    return (
        <>
            <button className="pure-button" onClick={() => getAllUsers()}>Get all Users</button>
            <ol>
                {users.map((user) => {
                    return <li key={user.id}>{user.name}</li>
                }
                )}
            </ol>
        </>
    )
}