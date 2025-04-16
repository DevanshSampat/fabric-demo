import Canvas from "./Canvas";
import { useEffect, useState } from "react";

function Designer({ configFilePath }) {
    const [config, setConfig] = useState();
    useEffect(() => {
        import(`../config/${configFilePath}`).then(data => {
            setConfig(data);
        });
        //eslint-disable-next-line
    }, [])
    if (!config) return <div></div>
    return (
        <div style={{ display: "flex" }}>
            {config.components.map(data => {
                return <Canvas id={data.id} key={data.id} config={data} />
            })}
        </div>
    )
}

export default Designer;