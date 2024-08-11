import React, { useEffect, useRef, useState } from "react";

function Tile({ pos }) {
    const refTile = useRef<HTMLDivElement>(null)
    const [posX, setPosX] = useState(pos.x)
    const [posY, setPosY] = useState(pos.y)

    useEffect(() => {
        window.addEventListener("keydown", (e) => {
            if(e.key == "w") {
                setPosY(1)
            } else if(e.key == "s") {
                setPosY(4)
            } else if(e.key == "a") {
                setPosX(1)
            } else if(e.key == "d") {
                setPosX(4)
            }
        })
    }, [])

    useEffect(() => {
        setPosX(pos.x)
        setPosY(pos.y)
    }, [pos])

    return <div className={"two__tile two__tile-position-" + posX + "-" + posY} ref={refTile}>
        <p className="two__tile-text">2</p>
    </div>
}


export default Tile