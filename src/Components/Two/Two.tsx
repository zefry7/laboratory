import React, { useEffect, useState } from "react";
import Tile from "./Tile.tsx";

let k = -1
let coord = [
    {
        x: 0,
        y: 0
    },
    {
        x: 0,
        y: 0
    },
    {
        x: 0,
        y: 0
    },
    {
        x: 0,
        y: 0
    },
    {
        x: 0,
        y: 0
    },
    {
        x: 0,
        y: 0
    },
    {
        x: 0,
        y: 0
    },
    {
        x: 0,
        y: 0
    },
    {
        x: 0,
        y: 0
    },
    {
        x: 0,
        y: 0
    },
    {
        x: 0,
        y: 0
    },
    {
        x: 0,
        y: 0
    },
    {
        x: 0,
        y: 0
    },
    {
        x: 0,
        y: 0
    },
    {
        x: 0,
        y: 0
    },
    {
        x: 0,
        y: 0
    },
]

function Two() {
    const [grid, setGrid] = useState(coord)

    const handleAddTile = () => {
        let arr = new Array(17).fill(0)
        for(let i = 0; i < 16; ++i) {
            if(grid[i].x != 0) {
                let a = grid[i].x + (grid[i].y - 1) * 4
                arr[a] = a
            }
        }
        let sel = arr.reduce((acc, v, i) => v == 0 && i != 0 ? [...acc, i] : acc , [])
        let c = Math.floor(Math.random() * sel.length) 
        let index = sel[c]

        let y = Math.ceil(index/ 4)
        let x = 0
        
        if(index % 4 == 0) {
            x = 4
        } else {
           x = index % 4
        }

        console.log(index, x, y, sel);
        
        ++k
        setGrid(grid.map((v, i) => {
            if(i == k) {
                return {x, y}
            } else {
                return v
            }
        }))
    }

    // useEffect(() => {
    //     console.log(grid);
    // }, [grid])


    return <section className="two">
        <div className="two__wrapper">
            <div className="two__content">
                <div className="two__field">
                    <div className="two__cell"></div>
                    <div className="two__cell"></div>
                    <div className="two__cell"></div>
                    <div className="two__cell"></div>
                    <div className="two__cell"></div>
                    <div className="two__cell"></div>
                    <div className="two__cell"></div>
                    <div className="two__cell"></div>
                    <div className="two__cell"></div>
                    <div className="two__cell"></div>
                    <div className="two__cell"></div>
                    <div className="two__cell"></div>
                    <div className="two__cell"></div>
                    <div className="two__cell"></div>
                    <div className="two__cell"></div>
                    <div className="two__cell"></div>
                </div>
                {grid.filter(tile => tile.x != 0 && tile.y != 0).map((tile, key) => (
                    <Tile pos={tile} key={key} />
                ))}
                <button onClick={handleAddTile}>Add</button>
            </div>
        </div>
    </section>
}

export default Two