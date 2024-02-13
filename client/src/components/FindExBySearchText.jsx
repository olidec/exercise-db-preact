import { askServer } from "../utils/connector";
import { signal } from "@preact/signals";

export default function FindExBySearchText() {
    const searchText = signal("")
    const exerciseList = signal([])

    const onChange = (e) => {
        e.preventDefault()
        const { value } = e.target
        searchText.value = value
        // unccoment line below to update view immediately on change
        // getEx(e)
    }

    const getEx = async (e) => {
        e.preventDefault()
        const route = `/api/ex?search=${searchText.value}`
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
        exsearchlist.innerHTML = ""
        exerciseList.value.map((ex,key) => {
            const el = document.createElement("tr")
            el.setAttribute("key",key)
            el.innerHTML = `<td>${ex.id}</td><td>${ex.content}</td><td>${ex.solution}</td>`
            exsearchlist.appendChild(el)
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
                <label htmlFor="exid-3">Search Exercises for contents</label>
            <input id="exid-3" value={searchText} onChange={onChange}/>
            <button className="pure-button">Find Exercises containing</button>
            </form>
            <div>
                <table id="exfromtext" className="pure-table pure-table-bordered">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Content</th>
                            <th>Solution</th>
                        </tr>
                    </thead>
                    <tbody id="exsearchlist">                        
                    </tbody>
                </table>
            </div>
        </>
    )
}