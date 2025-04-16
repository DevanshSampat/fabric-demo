import "./App.css"
import Designer from "./components/Designer"

function App() {
  return (<div>
    <Designer configFilePath={`tshirts/black.json`} />
  </div>)
}

export default App