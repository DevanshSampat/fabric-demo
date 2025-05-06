import * as fabric from "fabric"
import { useEffect, useRef, useState } from "react"
import "../styles/Canvas.css"

function Canvas({ config, searchForRef, setCanvasRef, showPreviousButton, showNextButton, setCanvasIndex, index }) {
    const canvasref = useRef(null);
    const fabricCanvasRef = useRef(null);
    const [imageWidth, setImageWidth] = useState(config.imageWidthScale * window.innerWidth);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [canvasWidth, setCanvasWidth] = useState(config.canvasWidthScale * window.innerWidth);
    const [canvasHeight, setCanvasHeight] = useState(canvasWidth * config.canvasAspectRatio);
    const [canvasMarginLeft, setCanvasMarginLeft] = useState(config.canvasMarginLeftScale * windowWidth);
    const [canvasMarginTop, setCanvasMarginTop] = useState(config.canvasMarginTopScale * windowWidth);
    const [canvasMarginRight, setCanvasMarginRight] = useState(config.canvasMarginRightScale * windowWidth);
    const [canvasMarginBottom, setCanvasMarginBottom] = useState(config.canvasMarginBottomScale * windowWidth);
    useEffect(() => {
        const handleResize = () => {
            setImageWidth(config.imageWidthScale * window.innerWidth)
            setWindowWidth(window.innerWidth);
            setCanvasWidth(config.canvasWidthScale * window.innerWidth);
            setCanvasHeight(config.canvasWidthScale * window.innerWidth * config.canvasAspectRatio);
            setCanvasMarginLeft(config.canvasMarginLeftScale * window.innerWidth);
            setCanvasMarginTop(config.canvasMarginTopScale * window.innerWidth);
            setCanvasMarginRight(config.canvasMarginRightScale * window.innerWidth);
            setCanvasMarginBottom(config.canvasMarginBottomScale * window.innerWidth);
        };
        window.addEventListener("resize", handleResize);
        if (!canvasref.current) {
            const canvas = new fabric.Canvas(fabricCanvasRef.current);
            canvasref.current = canvas;
        }
        const canvas = canvasref.current;
        if (localStorage.getItem(config.id)) {
            canvas.loadFromJSON(JSON.parse(localStorage.getItem(config.id)), () => {
                canvas.renderAll();
            });
        }
        return () => window.removeEventListener("resize", handleResize);
        //eslint-disable-next-line
    }, [])
    const [showPreview, setShowPreview] = useState(false);
    const [imageData, setImageData] = useState();

    const saveCanvas = () => {
        if (!canvasref.current) {
            const canvas = new fabric.Canvas(fabricCanvasRef.current);
            canvasref.current = canvas;
        }
        const canvas = canvasref.current;
        localStorage.setItem(config.id, JSON.stringify(canvas.toJSON()));
    }

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
                canvas.renderAll();
            }
        }
    }
    return (
        <div className="canvas-container">
            <div className="canvas-background-image-area">
                <img
                    src={config.image} width={imageWidth} alt="background"
                ></img>
                {showPreview &&
                    <div style={{ width: "70vw", height: "100vh", position: "absolute", zIndex: 50, alignItems: "center", justifyContent: "center", display: "flex" }}>
                        <div style={{ ...config.canvasHolderStyle }} />
                    </div>}

                {<div style={{ width: "70vw", height: "100vh", position: "absolute", zIndex: 50, alignItems: "center", justifyContent: "center", display: "flex" }}>
                    <div style={{ border: `${showPreview ? "1px solid transparent" : config.canvasHolderStyle.border}`, width: canvasWidth, height: canvasHeight, marginLeft: canvasMarginLeft, marginTop: canvasMarginTop, marginRight: canvasMarginRight, marginBottom: canvasMarginBottom }}>
                        <canvas
                            width={canvasWidth}
                            height={canvasHeight}
                            ref={fabricCanvasRef}
                            style={{ width: canvasWidth, height: canvasHeight }}
                        />
                    </div>
                </div>}
            </div>


            <div className="control-area">

                <h2>{config.label}</h2>
                {!showPreview && <input
                    type="file"
                    accept="image/*"
                    label="Add Image"
                    onChange={handleAddImage}
                />}

                <div style={{ margin: "20px" }}>
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

                <button onClick={() => {
                    if (canvasref.current) {
                        const canvas = canvasref.current;
                        const activeObject = canvas.getActiveObject();
                        if (activeObject) {
                            canvas.remove(activeObject);
                            canvas.renderAll();
                        }
                    }
                }}>Remove</button>
                <div style={{ margin: "20px", display: "flex" }}>
                    {showPreviousButton && <button onClick={() => {
                        saveCanvas()
                        setCanvasIndex(index - 1)
                    }
                    }>Previous</button>}
                    {showNextButton && <button onClick={() => {
                        saveCanvas()
                        setCanvasIndex(index + 1)
                    }}>Next</button>}
                </div>
            </div>
        </div>
    )
}

export default Canvas;