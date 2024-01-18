import { useState } from "preact/hooks";
import { askServer } from "../utils/connector";

export default function Form() {
    const [user,setUser] = useState({
        email: '',
        name:'',
        password:''
    })
    
    const addNewUser = async (e) => {
        e.preventDefault()
        console.log("hallo")
        const res = await askServer("/api/user","POST",user)
        console.log(res)
        if (res.err) {
            console.log(res.err)
        }
        else {
            setUser({
                email: '',
                name:'',
                password:''
            });
            console.log("user added")
        }
    }

    const updateUserHandler = (e) => {
        e.preventDefault()
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value
        }));
    }

    return (
        <>
        <form onSubmit={(e) => addNewUser(e)}>
            <label htmlFor="email">E-Mail</label>
            <input type="email" name="email" id="email" value={user.email} onChange={updateUserHandler} />
            <label htmlFor="name">Name:</label>
            <input type="text" name="name" id="name" value={user.name} onChange={updateUserHandler} />
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" id="password" value={user.password} onChange={updateUserHandler} />
            <button type="submit">Add new user</button>
        </form>
        </>
    )


}