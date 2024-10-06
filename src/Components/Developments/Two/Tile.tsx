import React, { useCallback, useEffect, useRef, useState } from "react";

function Tile({ pos, count = 0 }) {
    const refTile = useRef<HTMLDivElement>(null)
    const [posX, setPosX] = useState(pos - 4 * Math.floor(pos / 4) + 1)
    const [posY, setPosY] = useState(Math.floor(pos / 4) + 1)
    const [colorBg, setColorBg] = useState("rgb(100, 100, 100)")
    useEffect(() => {  
        setPosX(pos - 4 * Math.floor(pos / 4) + 1)
        setPosY(Math.floor(pos / 4) + 1)
    }, [pos])

    useEffect(() => {
        let str = count.toString(2)
        let n = (str.length - 1) * 10 + 100
        if(n > 200) {
            n = 200
        }
        setColorBg(`rgb(${n},${n},${n})`)
    }, [count])

    return <div className={`absolute h-[120px] w-[120px] bg-[var(--bg-color)] flex items-center justify-center transition-all left-[var(--posX)] top-[var(--posY)]`} style={{"--posX": (posX - 1) * 140 + 20 + "px", "--posY": (posY - 1)  * 140 + 20 + "px", "--bg-color": colorBg} as React.CSSProperties}  ref={refTile}>
        <p className="text-[42px] font-bold">{count}</p>
    </div>
}


export default Tile