import React, { useCallback, useEffect, useRef, useState } from "react";
import Tile from "./Tile.tsx";

interface GridCell {
    count: number,
    index: number,
    key: number
}

let coord = new Array(16).fill({ count: 0, index: 0, key: 0 })


function indexTrue(res) {
    for (let i = 0; i < res.length; ++i) {
        res[i] = { count: res[i].count, index: i, key: res[i].key }
    }

    return res
}

function checkLose(grid) {
    for (let i = 0; i < grid.length; ++i) {
        if(grid[i].count == 0)
            return false
        if (i % 4 != 3 && i < 12) {
            if (grid[i].count == grid[i + 4].count || grid[i].count == grid[i + 1].count) {
                return false
            }
        } else if (i % 4 == 3 && i < 12) {
            if (grid[i].count == grid[i + 4].count)
                return false
        } else if (i >= 12 && i % 4 != 3) {
            if (grid[i].count == grid[i + 1].count)
                return false
        }
    }
    return true
}

function Two() {
    const [grid, setGrid] = useState(coord)
    const [keyDown, setKeyDown] = useState(true)
    const [total, setTotal] = useState(0)
    const [lose, setLose] = useState(false)
    const keyCount = useRef(-1)

    const handleAddTile = () => {
        setGrid(oldGrid => {
            let arr = new Array(16).fill(0)
            for (let i = 0; i < 16; ++i) {
                if (oldGrid[i].count == 0) {
                    arr[i] = 1
                }
            }
            let sel = arr.reduce((acc, v, i) => acc = v != 0 ? [...acc, i] : acc, [])
            let c = Math.floor(Math.random() * sel.length)
            let index = sel[c]

            keyCount.current++
            return oldGrid.map((v, i) => {
                if (i == index) {
                    return { count: 2, index: index, key: keyCount.current }
                } else {
                    return v
                }
            })
        })
    }

    useEffect(() => {
        handleAddTile()
        handleAddTile()
    }, [])

    useEffect(() => {
        console.log(grid);
        let boolLose = checkLose(grid)
        if (boolLose == true) {
            setLose(true)
        }
    }, [grid])


    useEffect(() => {
        if (keyDown == true) {
            handleAddTile()
        }
    }, [keyDown])

    function sumCell(mass) {
        let sum = 0
        for (let i = 0; i < 3; ++i) {
            for (let j = i + 1; j < 4; ++j) {
                if (mass[i].count == 0 && mass[j].count != 0) {
                    mass[i] = mass[j]
                    mass[j] = { count: 0, index: 0, key: 0 }
                } else if (mass[i].count == mass[j].count && mass[i].count != 0) {
                    sum += mass[i].count * 2
                    mass[i] = { ...mass[i], count: mass[i].count * 2 }
                    mass[j] = { count: 0, index: 0, key: 0 }
                    break
                } else if (mass[i].count != mass[j].count && mass[j].count != 0) {
                    break
                }
            }
        }
        setTotal(n => n + sum)
        return mass
    }

    const handleKeyDown = useCallback((e) => {
        if (keyDown) {
            let arr = [...grid]
            let res: GridCell[] = new Array(16)
            if (e.key == "w") {
                setKeyDown(false)
                for (let i = 0; i < 4; ++i) {
                    let a = sumCell([arr[i], arr[i + 4], arr[i + 8], arr[i + 12]])
                    res[i] = a[0]
                    res[i + 4] = a[1]
                    res[i + 8] = a[2]
                    res[i + 12] = a[3]
                }
                setGrid(indexTrue(res))
            } else if (e.key == "s") {
                setKeyDown(false)
                for (let i = 0; i < 4; ++i) {
                    let a = sumCell([arr[i + 12], arr[i + 8], arr[i + 4], arr[i]])
                    res[i + 12] = a[0]
                    res[i + 8] = a[1]
                    res[i + 4] = a[2]
                    res[i] = a[3]
                }
                setGrid(indexTrue(res))
            } else if (e.key == "a") {
                setKeyDown(false)
                for (let i = 0; i < 4; ++i) {
                    let a = sumCell([arr[i * 4], arr[i * 4 + 1], arr[i * 4 + 2], arr[i * 4 + 3]])
                    res[i * 4] = a[0]
                    res[i * 4 + 1] = a[1]
                    res[i * 4 + 2] = a[2]
                    res[i * 4 + 3] = a[3]
                }
                setGrid(indexTrue(res))
            } else if (e.key == "d") {
                setKeyDown(false)
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

    const handleRestart = () => {
        setGrid(coord)
        setLose(false)
        setTotal(0)
        handleAddTile()
        handleAddTile()
        handleAddTile()
    }

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown)
        return () => document.removeEventListener("keydown", handleKeyDown)
    }, [handleKeyDown])

    return <section className="h-screen">
        <div className="flex items-center h-full w-max mx-auto">
            <div className="flex flex-col items-center relative">
                <div className="flex justify-between mb-[10px]">
                    {/* <div className="style-button w-[220px] h-[40px] text-[20px]/[35px]" onClick={() => handleClearCanvas()}>Очистить</div> */}
                    <div className=" w-[200px] text-[20px]/[35px] text-white bg-black-1 px-[20px] rounded-[10px] flex justify-between">
                        <p className="flex flex-col items-center">Счёт <span>{total}</span></p>
                        <p className="flex flex-col items-center">Рекорд <span>{total}</span></p>
                    </div>
                </div>
                <div className="grid grid-cols-4 grid-rows-4 gap-[20px] rounded-[17px] p-[20px] bg-black-1 relative">
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
                    {grid.filter(v => v.count != 0).map((v) => (
                        <Tile pos={v.index} key={v.key} count={v.count} />
                    ))}
                    {lose == true &&
                        <div className="absolute w-full h-full flex flex-col items-center justify-center backdrop-blur-[5px] bg-white/60 rounded-[17px]">
                            <h3 className="text-[42px] mb-[10px] pt-[30px]">Вы проиграли!</h3>
                            <p className="text-[28px] mb-[20px]">Счёт: <span className="font-bold">{total}</span></p>
                            <button className="style-button" onClick={() => handleRestart()}>Перезапуск</button>
                        </div>
                    }
                </div>
            </div>
        </div>
    </section>
}

export default Two