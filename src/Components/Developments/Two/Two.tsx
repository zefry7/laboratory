import React, { useCallback, useEffect, useState } from "react";
import Tile from "./Tile.tsx";

interface GridCell {
    count: number,
    index: number,
    key: number
}

let coord = new Array(16).fill({ count: 0, index: 0, key: 0 })
let keyCount = -1

function Two() {
    const [grid, setGrid] = useState(coord)

    const handleAddTile = () => {
        let arr = new Array(16).fill(0)
        for (let i = 0; i < 16; ++i) {
            if (grid[i].count == 0) {
                arr[i] = 1
            }
        }
        let sel = arr.reduce((acc, v, i) => acc = v != 0 ? [...acc, i] : acc, [])
        let c = Math.floor(Math.random() * sel.length)
        let index = sel[c]

        console.log(index);


        keyCount++
        setGrid(grid.map((v, i) => {
            if (i == index) {
                return { count: 2, index: index, key: keyCount }
            } else {
                return v
            }
        }))
    }

    useEffect(() => {
        console.log(grid);
    }, [grid])


    const [keyDown, setKeyDown] = useState(true)

    const handleKeyDown = useCallback((e) => {
        if (keyDown) {
            setKeyDown(false)
            if (e.key == "w") {
                let arr = [...grid]

                if (arr[0] == arr[4]) {
                    arr[0] *= 2
                    arr[4] = 0
                }
                if (arr[0] == arr[8]) {
                    arr[0] *= 2
                    arr[8] = 0
                }
                if (arr[0] == arr[12]) {
                    arr[0] *= 2
                    arr[12] = 0
                }

                setGrid([...arr])
            } else if (e.key == "s") {
                setGrid(grid.map((v, i) => {
                    if (v.x != 0) {
                        return { x: v.x, y: 4, count: 2 }
                    } else {
                        return v
                    }
                }))
            } else if (e.key == "a") {
                let arr = [...grid]
                let res: GridCell[] = []

                function sumCell(mass) {
                    for (let i = 0; i < 3; ++i) {
                        for (let j = i + 1; j < 4; ++j) {
                            if(mass[i].count == 0 && mass[j].count != 0) {
                                mass[i] = mass[j]
                                mass[j] = { count: 0, index: 0, key: 0 }
                            } else if (mass[i].count == mass[j].count) {
                                mass[i] = { ...mass[i], count: mass[i].count * 2 }
                                mass[j] = { count: 0, index: 0, key: 0 }
                            } else if (mass[i].count != mass[j].count && mass[j].count != 0){
                                break
                            }
                        }
                    }

                    return mass
                }

                for (let i = 0; i < 4; ++i) {
                    let a = sumCell(arr.slice(i * 4, i * 4 + 4))
                    res = [...res, ...a]
                }

                for (let i = 0; i < res.length; ++i) {
                    res[i] = { count: res[i].count, index: i, key: res[i].key }
                }

                setGrid([...res])
            } else if (e.key == "d") {
                setGrid(grid.map((v, i) => {
                    if (v.x != 0) {
                        return { x: 4, y: v.y, count: 2 }
                    } else {
                        return v
                    }
                }))
            }
            setTimeout(() => {
                setKeyDown(true)
            }, 100)
        }
    }, [keyDown, grid])


    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown)
        return () => document.removeEventListener("keydown", handleKeyDown)
    }, [handleKeyDown])

    return <section className="h-screen">
        <div className="flex items-center h-full w-max mx-auto">
            <div className="flex flex-col items-center relative">
                <div className="grid grid-cols-4 grid-rows-4 gap-[20px] rounded-[17px] p-[20px] bg-black-1">
                    <div className="h-[120px] w-[120px] bg-white"></div>
                    <div className="h-[120px] w-[120px] bg-white"></div>
                    <div className="h-[120px] w-[120px] bg-white"></div>
                    <div className="h-[120px] w-[120px] bg-white"></div>
                    <div className="h-[120px] w-[120px] bg-white"></div>
                    <div className="h-[120px] w-[120px] bg-white"></div>
                    <div className="h-[120px] w-[120px] bg-white"></div>
                    <div className="h-[120px] w-[120px] bg-white"></div>
                    <div className="h-[120px] w-[120px] bg-white"></div>
                    <div className="h-[120px] w-[120px] bg-white"></div>
                    <div className="h-[120px] w-[120px] bg-white"></div>
                    <div className="h-[120px] w-[120px] bg-white"></div>
                    <div className="h-[120px] w-[120px] bg-white"></div>
                    <div className="h-[120px] w-[120px] bg-white"></div>
                    <div className="h-[120px] w-[120px] bg-white"></div>
                    <div className="h-[120px] w-[120px] bg-white"></div>
                </div>
                {grid.filter(v => v.count != 0).map((v) => (
                    <Tile pos={v.index} key={v.key} count={v.count} />
                ))}
                <button className="style-button mt-[20px] w-[240px]" onClick={handleAddTile}>Добавить</button>
            </div>
        </div>
    </section>
}

export default Two