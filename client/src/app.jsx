import { useEffect, useState } from "preact/hooks"
import "./app.css"
import { askServer } from "./utils/connector"
import Data from "./components/Data"
import Button from "./components/Button"
import Form from "./components/Form"
import Exform from "./components/Exform"
import FindExAll from "./components/FindExAll"
import FindExById from "./components/FindExById"
import FindExByIdFromServer from "./components/FindExByIdFromServer"

export function App() {
  const [data, setData] = useState({})
  

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

  
  

  return (
    <>
      <h1>Hello World!</h1>
      <div>
        <button className="pure-button" onClick={() => getTest()}>Get Test</button>
        <button className="pure-button" onClick={() => getRoot()}>Get Root</button>
        <button className="pure-button" onClick={() => getSecret()}>Get Secret</button>
        <button className="pure-button" onClick={() => getWrongPassword()}>
          Get Secret (wrong password)
        </button>
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
      <FindExById />

      <FindExAll />

      <FindExByIdFromServer />

    </>
  )
}
