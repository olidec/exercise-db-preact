import { useState } from "preact/hooks";
import { askServer } from "../utils/connector";
import { cat, loadCat } from "../signals/categories.js";
import { signal } from "@preact/signals";
import { useEffect } from "preact/hooks";

export default function ExForm() {
    const [ex, setEx] = useState({
        summary: '',
        content:'',
        solution:''
    })
    
    useEffect(() => {
        loadCat();
      }, []);



    
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
        const { name, value } = e.target;
        setEx((prevEx) => ({
            ...prevEx,
            [name]: value
        }));
    };

    return (
        <>
        <form className="pure-form pure-form-aligned" onSubmit={(e) => addNewEx(e)}>
            <legend>Füge deine eigene Aufgabe hinzu</legend>
            <fieldset>
            <div className="pure-control-group">
                <label htmlFor="content">Exercise Text: </label>
                    <textarea rows="5" cols="100" name="content" id="content" value={ex.content} onChange={updateExHandler} placeholder="Schreibe deine Aufgabe im LaTeX Format"/>
            </div>
            <div className="pure-control-group">
            <label htmlFor="solution">Solution: </label>
                <textarea rows="5" cols="100" name="solution" id="solution" value={ex.solution} onChange={updateExHandler} placeholder="Schreibe deine Lösung im LaTeX Format"/>
            </div>
            <div className="pure-controls">
                <button type="submit" className="pure-button pure-button-primary">Add new exercise</button>
            </div>
            </fieldset>
        </form>
        </>
    )


}