import logo from "./logo.svg"
import "./App.css"
import * as fabric from "fabric"
import { useRef } from "react"

function App() {
  const canvasref = useRef(null);
  const fabricCanvasRef = useRef(null);
  const handleAddImage = (e) => {
    const canvas = new fabric.Canvas(canvasref.current)
    let imgObj = e.target.files[0]
    let reader = new FileReader()
    reader.readAsDataURL(imgObj)
    reader.onload = (e) => {
      let imageUrl = e.target.result
      let imageElement = document.createElement("img")
      imageElement.src = imageUrl
      imageElement.onload = function () {
        let image = new fabric.Image(imageElement)
        image.set({
          left: 0,
          top: 0,
          scaleY: 0.1,
          scaleX: 0.1,
        })
        canvas.add(image)
        canvas.centerObject(image)
        canvas.setActiveObject(image)
      }
    }
  }
  return (
    <div className="container">
      <input
        type="file"
        accept="image/*"
        label="Add Image"
        style={{
          zIndex: 25,
          position: "absolute",
          top: "25%",
          left: "25%",
        }}
        onChange={handleAddImage}
      />
      
      <canvas
        ref={canvasref}
        width="300"
        height="300"
        style={{
          position: "absolute",
          top: "0%",
          left: "-17%",
        }}
      />
    </div>
  )
}

export default App