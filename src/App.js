import logo from "./logo.svg"
import "./App.css"
import * as fabric from "fabric"
import { useRef } from "react"
import tshirtImage from "./images/tshirt-template.jpg"

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

      <img
        src={tshirtImage}
      ></img>

      <input
        type="file"
        accept="image/*"
        label="Add Image"
        style={{
          position: "absolute",
          zIndex: 25,
          top: "350px",
          left: "200px",
        }}
        onChange={handleAddImage}
      />

      <div style={{
        position: "absolute",
        zIndex: 30,
        top: "400px",
        left: "195px",
      }}>
        <canvas
          ref={canvasref}
          width="300px"
          height="300px"
          style={{
            border: "1px solid white",
          }}
        />
      </div>
    </div>
  )
}

export default App