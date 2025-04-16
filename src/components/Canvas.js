import * as fabric from "fabric"
import { useRef, useState } from "react"

function Canvas({ config }) {
    const canvasref = useRef(null);
    const fabricCanvasRef = useRef(null);
    const [showPreview, setShowPreview] = useState(false);
    const [imageData, setImageData] = useState();
    const handleAddImage = (e) => {
        if (!canvasref.current) {
            const canvas = new fabric.Canvas(fabricCanvasRef.current);
            canvasref.current = canvas;
        }
        const canvas = canvasref.current
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
                src={config.image}
            ></img>

            {!showPreview && <input
                type="file"
                accept="image/*"
                label="Add Image"
                style={config.inputStyle}
                onChange={handleAddImage}
            />}

            {showPreview && <div style={{ ...config.canvasHolderStyle, zIndex: 50, border: "none" }}></div>}

            {<div style={!showPreview ? config.canvasHolderStyle : { ...config.canvasHolderStyle, border: "1px solid transparent" }}>
                <canvas
                    width={config.canvasHolderStyle.width}
                    height={config.canvasHolderStyle.height}
                    ref={fabricCanvasRef}
                    style={config.canvasStyle}
                />
            </div>}

            <h2>{config.label}</h2>

            <button onClick={() => {
                if (!showPreview) {
                    const canvas = canvasref.current;
                    if (canvas) {
                        canvas.discardActiveObject();
                        canvas.renderAll();
                    }
                    setImageData(canvasref.current.toDataURL("image/png"))
                }
                setShowPreview(!showPreview)
            }}>preview</button>
        </div>
    )
}

export default Canvas;