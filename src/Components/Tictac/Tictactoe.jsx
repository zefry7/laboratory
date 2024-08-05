import React, { useEffect, useState } from "react";

function Tictactoe() {
    const [grid, setGrid] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0])
    const [win, setWin] = useState(false)
    const [blockStep, setBlockStep] = useState(false)

    useEffect(() => {
        console.log(grid);
        if (grid[0] == 1 && grid[1] == 1 && grid[2] == 1) {
            setWin(true)
        }
    }, [grid])

    const handleStep = (index) => {
        setBlockStep(true)
        setGrid(
            grid.map((v, i) => {
                if (i == index) {
                    return 1
                } else {
                    return v
                }
            })
        )
        setTimeout(() => {
            setBlockStep(false)
            const arr = grid.reduce((acc, v, i) => v == 0 ? acc = [...acc, i] : acc, [])
            const stepBot = Math.floor(Math.random() * (arr.length - 1))
            setGrid((arr) =>
                arr.map((v, i) => {
                    if (i == arr[stepBot]) {
                        return -1
                    } else {
                        return v
                    }
                })
            )
        }, 3000)
    }

    return <section className="tictac">
        <div className="tictac__wrapper">
            <div className="tictac__content">
                {win &&
                    <h2 className="tictac__title">Победа</h2>
                }
                <div className="tictac__field">
                    {grid?.map((_, i) => (
                        <Cell grid={grid} changeGrid={handleStep} index={i} blockStep={blockStep}/>
                    ))}
                </div>
            </div>
        </div>
    </section>
}

function Cell({ grid, changeGrid, index, blockStep }) {

    const handleClickO = (e) => {
        e.stopPropagation()
        if(!blockStep) {
            changeGrid(index)
        }
    }

    return <div className="tictac__cell" onClick={(e) => handleClickO(e)}>
        {grid[index] != 0 &&
            <>
                {grid[index] == 1
                    ?   <div className="tictac__cell-o"></div>
                    :   <div className="tictac__cell-x">
                            <span></span>
                            <span></span>
                        </div>
                }
            </>
        }
    </div>
}

export default Tictactoe