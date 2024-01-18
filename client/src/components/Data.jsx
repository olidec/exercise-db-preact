import { useEffect, useState } from "preact/hooks"

export default function Data({data}) {
    const [msg,setMsg] = useState("Hello There")
 
    // useEffect(() => {
    //     setTimeout(() => {
    //         setMsg((prev) => prev + "Hello World!")
    //     }, 1000)
    // }, [])

    return (
    <>
        <div className="output">{data.msg}</div>
        <div className="output">Message: {msg}</div>
    </>
    )
}
