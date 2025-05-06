import Canvas from "./Canvas";
import { useEffect, useState } from "react";

function Designer({ configFilePath }) {
    const [config, setConfig] = useState();
    const [canvasIndex, setCanvasIndex] = useState(0);
    const [canvasReferences, setCanvasReferences] = useState({});

    useEffect(() => {
        import(`../config/${configFilePath}`).then(data => {
            setConfig(data);
        });
        //eslint-disable-next-line
    }, [])
    if (!config) return <div></div>
    return (
        <div>
            {config.components.map((data, index) => {
                if (canvasIndex !== index) return null;
                return <Canvas id={data.id} key={data.id} config={data} searchForRef={() => {
                    console.log("searched ref",canvasReferences[data.id]);
                    return canvasReferences[data.id];
                }} setCanvasRef={
                    (ref) => {
                        console.log("setting canvas ref", ref.current);
                        setCanvasReferences((prev) => {
                            return { ...prev, [data.id]: ref.current };
                        });
                    }
                } showPreviousButton = {
                    index > 0 ? true : false
                } showNextButton = {
                    index < config.components.length - 1 ? true : false
                } setCanvasIndex={setCanvasIndex} index = {index} />
            })}
        </div>
    )
}

export default Designer;