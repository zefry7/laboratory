import React, { useCallback, useEffect, useRef, useState } from "react";

function Tile({ pos, count }) {
    const refTile = useRef<HTMLDivElement>(null)
    const [posX, setPosX] = useState(pos - 4 * Math.floor(pos / 4) + 1)
    const [posY, setPosY] = useState(Math.floor(pos / 4) + 1)

    useEffect(() => {  
        setPosX(pos - 4 * Math.floor(pos / 4) + 1)
        setPosY(Math.floor(pos / 4) + 1)
    }, [pos])

    useEffect(() => {
        
    }, [count])

    return <div className={`absolute h-[120px] w-[120px] bg-[rgb(200,200,200)] flex items-center justify-center transition-all left-[var(--posX)] top-[var(--posY)]`} style={{"--posX": (posX - 1) * 140 + 20 + "px", "--posY": (posY - 1)  * 140 + 20 + "px"} as React.CSSProperties}  ref={refTile}>
        <p className="text-[36px] font-bold">{count}</p>
    </div>
}


export default Tile