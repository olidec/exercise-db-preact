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
        <form className="pure-form pure-form-aligned" onSubmit={(e) => addNewEx(e)}>
            <legend>Add your own Exercise</legend>
            <fieldset>
                <div className="pure-control-group">
                    <label htmlFor="summary">Summary: </label>
                        <textarea rows={2} cols={100} type="text" name="summary" id="summary" value={ex.summary} onChange={updateExHandler} placeholder="Write a short summary of you exercise"/>
                </div>
            <div className="pure-control-group">
                <label htmlFor="content">Exercise Text: </label>
                    <textarea rows="5" cols="100" name="content" id="content" value={ex.content} onChange={updateExHandler} placeholder="Enter the exercise text in the LaTeX format"/>
            </div>
            <div className="pure-control-group">
            <label htmlFor="solution">Solution: </label>
                <textarea rows="5" cols="100" name="solution" id="solution" value={ex.solution} onChange={updateExHandler} placeholder="Enter the exercise solution in the LaTeX format"/>
            </div>
            <div className="pure-controls">
                <button type="submit" className="pure-button pure-button-primary">Add new exercise</button>
            </div>
            </fieldset>
        </form>
        </>
    )


}