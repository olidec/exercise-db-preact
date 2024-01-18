import { useState } from "preact/hooks";
import { askServer } from "../utils/connector";

export default function Form() {
    const [ex, setEx] = useState({
        summary: '',
        content:'',
        solution:''
    })
    
    const addNewEx = async (e) => {
        e.preventDefault()
        const res = await askServer("/api/ex","POST",ex)
        console.log(res)
        if (res.err) {
            console.log(res.err)
        }
        else {
            setEx({
                summary: '',
                content:'',
                solution:''
            });
            console.log("exercise added")
        }
    }

    const updateExHandler = (e) => {
        e.preventDefault()
        const { name, value } = e.target;
        setEx((prevEx) => ({
            ...prevEx,
            [name]: value
        }));
    }

    return (
        <>
        <form onSubmit={(e) => addNewEx(e)}>
            <label htmlFor="summary">Summary</label>
            <input type="text" name="summary" id="summary" value={ex.summary} onChange={updateExHandler} />
            
            <label htmlFor="content">Content:</label>
            <textarea rows="5" cols="20" name="content" id="content" value={ex.content} onChange={updateExHandler} />
            <label htmlFor="solution">Solution:</label>
            <textarea rows="5" cols="20" name="solution" id="solution" value={ex.solution} onChange={updateExHandler} />
            <button type="submit">Add new exercise</button>
        </form>
        </>
    )


}