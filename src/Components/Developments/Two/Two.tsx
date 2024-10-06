import React, { useCallback, useEffect, useState } from "react";
import Tile from "./Tile.tsx";

interface GridCell {
    count: number,
    index: number,
    key: number
}

let coord = new Array(16).fill({ count: 0, index: 0, key: 0 })
let keyCount = -1

function sumCell(mass) {
    for (let i = 0; i < 3; ++i) {
        for (let j = i + 1; j < 4; ++j) {
            if (mass[i].count == 0 && mass[j].count != 0) {
                mass[i] = mass[j]
                mass[j] = { count: 0, index: 0, key: 0 }
            } else if (mass[i].count == mass[j].count) {
                mass[i] = { ...mass[i], count: mass[i].count * 2 }
                mass[j] = { count: 0, index: 0, key: 0 }
            } else if (mass[i].count != mass[j].count && mass[j].count != 0) {
                break
            }
        }
    }

    return mass
}

function indexTrue(res) {
    for (let i = 0; i < res.length; ++i) {
        res[i] = { count: res[i].count, index: i, key: res[i].key }
    }

    return res
}

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
        // console.log(grid);
    }, [grid])


    const [keyDown, setKeyDown] = useState(true)

    const handleKeyDown = useCallback((e) => {
        if (keyDown) {
            setKeyDown(false)
            let arr = [...grid]
            let res: GridCell[] = new Array(16)
            if (e.key == "w") {
                for (let i = 0; i < 4; ++i) {
                    let a = sumCell([arr[i], arr[i + 4], arr[i + 8], arr[i + 12]])
                    res[i] = a[0]
                    res[i + 4] = a[1]
                    res[i + 8] = a[2]
                    res[i + 12] = a[3]
                }
                setGrid(indexTrue(res))
            } else if (e.key == "s") {
                for (let i = 0; i < 4; ++i) {
                    let a = sumCell([arr[i + 12], arr[i + 8], arr[i + 4], arr[i]])
                    res[i + 12] = a[0]
                    res[i + 8] = a[1]
                    res[i + 4] = a[2]
                    res[i] = a[3]
                }
                setGrid(indexTrue(res))
            } else if (e.key == "a") {
                for (let i = 0; i < 4; ++i) {
                    let a = sumCell([arr[i * 4], arr[i * 4 + 1], arr[i * 4 + 2], arr[i * 4 + 3]])
                    res[i * 4] = a[0]
                    res[i * 4 + 1] = a[1]
                    res[i * 4 + 2] = a[2]
                    res[i * 4 + 3] = a[3]
                }
                setGrid(indexTrue(res))
            } else if (e.key == "d") {
                for (let i = 3; i >= 0; --i) {
                    let a = sumCell([arr[i * 4 + 3], arr[i * 4 + 2], arr[i * 4 + 1], arr[i * 4]])
                    res[i * 4 + 3] = a[0]
                    res[i * 4 + 2] = a[1]
                    res[i * 4 + 1] = a[2]
                    res[i * 4] = a[3]
                }
                setGrid(indexTrue(res))
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