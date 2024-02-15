import { askServer } from "../utils/connector";
import { signal } from "@preact/signals";
import { cat, loadCat } from "../signals/categories.js"
import { useEffect } from "react";

export default function FindExBySearchText() {
    const searchCategory = signal("")
    const exerciseList = signal([])

    useEffect(() => {
        loadCat()
    },[])

    console.log(cat.value)
    cat.value.map((c) => {
        const el = document.createElement("option")
        el.innerHTML = c.name
        el.value = c.name
        document.getElementById("exid-4").appendChild(el)
    })

    const onChange = (e) => {
        e.preventDefault()
        const { value } = e.target
        searchCategory.value = value
    }

    const getEx = async (e) => {
        e.preventDefault()
        const route = `/api/ex?cat=${searchCategory.value}`
        // console.log(route)
        const res = await askServer(route,"GET")
        // console.log(res)
        if (res.errors || res.length === 0) {
            alert("No exercises match the search term.")
            return
        }
        else {
            exerciseList.value = res
        }
        // console.log(exerciseList.value)
        excatlist.innerHTML = ""
        exerciseList.value.map((ex,key) => {
            const el = document.createElement("tr")
            el.setAttribute("key",key)
            el.innerHTML = `<td>${ex.id}</td><td>${ex.content}</td><td>${ex.solution}</td>`
            excatlist.appendChild(el)
            MathJax.typeset([el])
        })
        
        // console.log(res.content)
        // res.map((ex) => {
        //     const el = document.createElement("tr")
        //     el.innerHTML = `<td>${ex.id}</td><td>${ex.content}</td><td>${ex.solution}</td>`
        //     textsearchtable.appendChild(el)
        //     MathJax.typeset([el])
        // })
        

        // myexidnew.innerHTML = res.id
        // myexcontnew.innerHTML = res.content
        // myexsolnew.innerHTML = res.solution
        
    }

    return (
        <>
            <form onSubmit={(e) => getEx(e)}>
            <label htmlFor="exid-4">Search Exercises for contents</label>
            <select id="exid-4" onChange={onChange}>
                <option value=""> -- Kategorie auswählen -- </option>
            </select>
            <button className="pure-button">Find Exercises containing</button>
            </form>
            <div>
                <table id="exfromcat" className="pure-table pure-table-bordered">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Content</th>
                            <th>Solution</th>
                        </tr>
                    </thead>
                    <tbody id="excatlist">                        
                    </tbody>
                </table>
            </div>
        </>
    )
}