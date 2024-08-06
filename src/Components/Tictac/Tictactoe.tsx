import React, { useCallback, useEffect, useRef, useState } from "react";
import Cell from "./Cell.tsx";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store.ts";
import { ActionsTictac } from "../../store/reducerTictac/reducerTictac.ts";

type TimeoutType = number | null | NodeJS.Timeout

function Tictactoe() {
    const dispath = useDispatch()
    const grid = useSelector<RootState, Number[]>(state => state.tictac.grid)
    const stopMove = useSelector<RootState, boolean>(state => state.tictac.stopMove)
    const winner = useSelector<RootState, String>(state => state.tictac.winner)
    const refTimeoutBot = useRef<TimeoutType>(null)
    const emptyCell = grid.filter(v => v == 0).length || 0

    useEffect(() => {
        if (refTimeoutBot.current) clearTimeout(refTimeoutBot.current)
    }, [winner])

    useEffect(() => {
        function watcherWin(labelWin: Number, textWin: String) {
            for (let i = 0; i < grid.length; i += 3) {
                if (grid[i] == labelWin && grid[i + 1] == labelWin && grid[i + 2] == labelWin) {
                    dispath({ type: ActionsTictac.EDIT_WINNER, winner: textWin })
                    console.log(winner, grid);
                }
            }
            for (let i = 0; i < 3; ++i) {
                if (grid[i] == labelWin && grid[i + 3] == labelWin && grid[i + 6] == labelWin) {
                    dispath({ type: ActionsTictac.EDIT_WINNER, winner: textWin })
                }
            }
            if (grid[0] == labelWin && grid[4] == labelWin && grid[8] == labelWin) {
                dispath({ type: ActionsTictac.EDIT_WINNER, winner: textWin })
            }
            if (grid[2] == labelWin && grid[4] == labelWin && grid[6] == labelWin) {
                dispath({ type: ActionsTictac.EDIT_WINNER, winner: textWin })
            }
        }
        watcherWin(1, "Ваша")
        watcherWin(-1, "Бота")
    }, [grid])

    const handleStep = useCallback((index) => {
        dispath({ type: ActionsTictac.STOP_MOVE, value: true })
        dispath({ type: ActionsTictac.EDIT_GRID, index: index, move: 1 })
        refTimeoutBot.current = setTimeout(() => {
            dispath({ type: ActionsTictac.STOP_MOVE, value: false })
            const arr = grid.reduce((acc: Number[], v, i) => v == 0 && i != index ? [...acc, i] : acc, [])
            const stepBot = Math.floor(Math.random() * (arr.length - 1))
            dispath({ type: ActionsTictac.EDIT_GRID, index: arr[stepBot], move: -1 })
        }, 1000)
    }, [grid])

    const handleRestart = useCallback((e) => {
        e.stopPropagation()
        if (refTimeoutBot.current) clearTimeout(refTimeoutBot.current)
        dispath({ type: ActionsTictac.CLEAR_GRID })
        dispath({ type: ActionsTictac.EDIT_WINNER, winner: "" })
        dispath({ type: ActionsTictac.STOP_MOVE, value: false })
    }, [])

    return <section className="tictac">
        <div className="tictac__wrapper">
            <div className="tictac__content">
                {winner != "" &&
                    <h2 className="tictac__title">Победа: {winner}</h2>
                }
                <div className="tictac__field">
                    {grid.map((_, i) => (
                        <Cell key={i} grid={grid} changeGrid={handleStep} index={i} blockStep={stopMove} />
                    ))}
                </div>
                {(emptyCell == 0 || winner != "") &&
                    <button className="tictac__button-restart" onClick={(e) => handleRestart(e)}>Restart</button>
                }
            </div>
        </div>
    </section>
}

export default Tictactoe