import { useEffect, useState } from "preact/hooks"
import "./app.css"
import { askServer } from "./utils/connector"
import Data from "./components/Data"
import Button from "./components/Button"
import Form from "./components/Form"
import Exform from "./components/Exform"
import Exfind from "./components/Exfind"
import EquationRenderer from "./components/Equationrenderer"

export function App() {
  const [data, setData] = useState({})
  const [math, setMath] = useState({})
  

  // useEffect(async () => {
  //   const res = await askServer("/", "GET")
  //   setData(res)
  // }, [])

  const getRoot = async () => {
    const res = await askServer("/", "GET")
    setData(res)
  }
  const getTest = async () => {
    const res = await askServer("/api/test", "GET")
    setData(res)
  }
  const getSecret = async () => {
    const res = await askServer("/api/secret", "POST", { pw: "password" })
    setData(res)
  }
  const getWrongPassword = async () => {
    const res = await askServer("/api/secret", "POST", { pw: "not this one" })
    setData(res)
  }

  const getKaTeX = async () => {
    const res = await askServer("/api/katex", "GET")
    setMath(res)
    document.getElementById("equation").innerHTML = res.msg
  }

  
  

  return (
    <>
      <h1>Hello World!</h1>
      <h2>Hallo Patrick</h2>
      <EquationRenderer>{String.raw`\sqrt{3} x^2 + y^2 = c^2`}</EquationRenderer>
      <div>
        <button onClick={() => getRoot()}>Get Root</button>
        <button onClick={() => getTest()}>Get Test</button>
        <button onClick={() => getSecret()}>Get Secret</button>
        <button onClick={() => getWrongPassword()}>
          Get Secret (wrong password)
        </button>
        <button onClick={() => getKaTeX()}>Get KaTeX</button>
      </div>
      <div id="equation"></div>
      <Data data={data} />
      <Button />
      <div id="user-form">
      <Form />
      </div>
      <hr />
      <div id="ex-form">
      <Exform />
      </div>
      <Exfind />

    </>
  )
}
