// import { useState } from "preact/hooks";
import { signal } from "@preact/signals";
import { askServer } from "../utils/connector";
import { cat, loadCat } from "../signals/categories.js";
import { useEffect } from "react";

export default function Form() {
    useEffect(() => {
        loadCat()
    },[])
    
    console.log(cat.value)

    const ex = signal({
        content:'',
        solution:'',
        categories:[],
    })


    // cat.value.map((c, key) => {
    //     const el = document.createElement("input")
    //     el.setAttribute("type","checkbox")
    //     el.setAttribute("key", key)
    //     el.innerHTML = c.name
    //     el.value = c.name
    //     document.getElementById("catgroupexform").appendChild(el)
    // })
    
    const addNewEx = async (e) => {
        e.preventDefault()
        const res = await askServer("/api/ex","POST",ex.value)
        // console.log(res)
        if (res.err) {
            console.log(res.err)
        }
        else {
            ex.value = {
                content:'',
                solution:'',
                categories:[],
            };
            console.log("exercise added")
        }
    }

    const updateExHandler = (e) => {
        e.preventDefault()
        const { name, value } = e.target;
        ex.value[name] = value
        // console.log(ex.value)
    }

    const toggle = (e) => {
        e.preventDefault()
        const { value } = e.target
        if (ex.value.categories.includes(value)) {
            ex.value.categories = ex.value.categories.filter((c) => c !== value)
        }
        else {
            ex.value.categories.push(value)
        }
        console.log(ex.value)
    }

    return (
        <>
        <form className="pure-form pure-form-aligned" onSubmit={(e) => addNewEx(e)}>
            <legend>Füge deine eigene Aufgabe hinzu.</legend>
            <fieldset>
            <div className="pure-control-group">
                <label htmlFor="content">Aufgabentext: </label>
                <textarea rows="5" cols="100" name="content" id="content" value={ex.value.content} onChange={updateExHandler} placeholder="Gib den Aufgabentext im LaTeX Format ein"/>
            </div>
            <div className="pure-control-group">
            <label htmlFor="solution">Lösung:</label>
                <textarea rows="5" cols="100" name="solution" id="solution" value={ex.value.solution} onChange={updateExHandler} placeholder="Gib die Lösung im LaTeX Format ein"/>
            </div>
            <div className="pure-control-group">
                <label htmlFor="categories">Kategorien:</label>
                <div id="catgroupexform">
                {cat.value.map((c, key) => {
                    return (
                        <div key={key}>
                            <label htmlFor={c.name}>{c.name}</label>
                            <input type="checkbox" id={c.name} name="categories" value={c.id} onChange={toggle}/>
                        </div>
                    )
                })}
                </div>

            </div>
        
            <div className="pure-controls">
                <button type="submit" className="pure-button pure-button-primary">Aufgabe hinzufügen</button>
            </div>
            </fieldset>
        </form>
        </>
    )


}