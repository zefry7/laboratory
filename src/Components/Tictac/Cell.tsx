import React, { useCallback } from "react";

function Cell({ grid, changeGrid, index, blockStep }) {

    const handleClickO = useCallback((e) => {
        e.stopPropagation()
        if (!blockStep) {
            changeGrid(index)
        }
    }, [blockStep, changeGrid])

    return <div className="tictac__cell" onClick={(e) => handleClickO(e)}>
        {grid[index] != 0 &&
            <>
                {grid[index] == 1
                    ? <div className="tictac__cell-o"></div>
                    : <div className="tictac__cell-x">
                        <span></span>
                        <span></span>
                    </div>
                }
            </>
        }
    </div>
}

export default Cell