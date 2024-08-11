/** @format */

import React, { useCallback, useEffect, useRef, useState } from "react";
import Cell from "./Cell.tsx";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store.ts";
import { ActionsTictac } from "../../store/reducerTictac/reducerTictac.ts";

type TimeoutType = number | null | NodeJS.Timeout;

function Tictactoe() {
	const dispath = useDispatch();
	const grid = useSelector<RootState, Number[]>((state) => state.tictac.grid);
	const stopMove = useSelector<RootState, boolean>((state) => state.tictac.stopMove);
	const winner = useSelector<RootState, String>((state) => state.tictac.winner);
	const round = useSelector<RootState, Number>((state) => state.tictac.round);
	const stepMe = useSelector<RootState, Number>((state) => state.tictac.stepMe);
	const stepBot = useSelector<RootState, Number>((state) => state.tictac.stepBot);
	const refTimeoutBot = useRef<TimeoutType>(null);
	const refElementField = useRef<HTMLDivElement>(null);
	const refElementContent = useRef<HTMLDivElement>(null);
	const emptyCell = grid.filter((v) => v == 0).length || 0;

	useEffect(() => {
		if (refTimeoutBot.current) clearTimeout(refTimeoutBot.current);
		if (refElementField.current) {
			if (winner == "Победа") {
				refElementField.current.classList.add("tictac__field_win");
			} else if (winner == "Поражение") {
				refElementField.current.classList.add("tictac__field_lose");
			}
		}
	}, [winner]);

	useEffect(() => {
		function watcherWin(labelWin: Number, textWin: String) {
			let countCell = grid.filter((v) => v == labelWin).length;
			if (countCell == 3) {
				for (let i = 0; i < grid.length; i += 3) {
					if (grid[i] == labelWin && grid[i + 1] == labelWin && grid[i + 2] == labelWin) {
						dispath({
							type: ActionsTictac.EDIT_WINNER,
							winner: textWin,
						});
						console.log(winner, grid);
					}
				}
				for (let i = 0; i < 3; ++i) {
					if (grid[i] == labelWin && grid[i + 3] == labelWin && grid[i + 6] == labelWin) {
						dispath({
							type: ActionsTictac.EDIT_WINNER,
							winner: textWin,
						});
					}
				}
				if (grid[0] == labelWin && grid[4] == labelWin && grid[8] == labelWin) {
					dispath({
						type: ActionsTictac.EDIT_WINNER,
						winner: textWin,
					});
				}
				if (grid[2] == labelWin && grid[4] == labelWin && grid[6] == labelWin) {
					dispath({
						type: ActionsTictac.EDIT_WINNER,
						winner: textWin,
					});
				}
			}
		}

		watcherWin(1, "Победа");
		watcherWin(-1, "Поражение");
	}, [grid]);

	const handleStep = useCallback(
		(index) => {
			if (grid[index] == 0 && winner == "") {
				dispath({
					type: ActionsTictac.ADD_STEP_ME,
					value: stepMe,
				});
				dispath({
					type: ActionsTictac.STOP_MOVE,
					value: true,
				});
				dispath({
					type: ActionsTictac.EDIT_GRID,
					index: index,
					move: 1,
				});

				refTimeoutBot.current = setTimeout(() => {
					dispath({
						type: ActionsTictac.STOP_MOVE,
						value: false,
					});
					const arr = grid.reduce((acc: Number[], v, i) => (v == 0 && i != index ? [...acc, i] : acc), []);
					const indexBot = Math.floor(Math.random() * (arr.length - 1));
					dispath({
						type: ActionsTictac.ADD_STEP_BOT,
						value: stepBot,
					});
					dispath({
						type: ActionsTictac.EDIT_GRID,
						index: arr[indexBot],
						move: -1,
					});
					dispath({
						type: ActionsTictac.ADD_ROUND,
						value: round,
					});
				}, 1000);
			}
		},
		[grid, winner],
	);

	const handleRestart = useCallback((e) => {
		e.stopPropagation();
		if (refElementField.current) {
			refElementField.current.classList.add("tictac__field_rotate");
		}
		if (refElementContent.current) {
			refElementContent.current.classList.add("tictac__content_restart");
		}
		if (refTimeoutBot.current) clearTimeout(refTimeoutBot.current);
		setTimeout(() => {
			if (refElementField.current) {
				refElementField.current.classList.remove("tictac__field_win");
				refElementField.current.classList.remove("tictac__field_lose");
			}
			dispath({
				type: ActionsTictac.CLEAR_GRID,
			});
			dispath({
				type: ActionsTictac.ADD_ROUND,
				value: 0,
			});
			dispath({
				type: ActionsTictac.EDIT_WINNER,
				winner: "",
			});
			dispath({
				type: ActionsTictac.STOP_MOVE,
				value: false,
			});
		}, 150);
		setTimeout(() => {
			if (refElementField.current) {
				refElementField.current.classList.remove("tictac__field_rotate");
			}
			if (refElementContent.current) {
				refElementContent.current.classList.remove("tictac__content_restart");
			}
		}, 300);
	}, []);

	return (
		<section className="tictac">
			<div className="tictac__wrapper">
				<div
					className="tictac__content"
					ref={refElementContent}
				>
					<div
						className="tictac__field"
						ref={refElementField}
					>
						<Cell
							key={0}
							grid={grid}
							changeGrid={handleStep}
							index={0}
							blockStep={stopMove}
							countRound={round}
							stepMe={stepMe}
							stepBot={stepBot}
						/>
						<Cell
							key={1}
							grid={grid}
							changeGrid={handleStep}
							index={1}
							blockStep={stopMove}
							countRound={round}
							stepMe={stepMe}
							stepBot={stepBot}
						/>
						<Cell
							key={2}
							grid={grid}
							changeGrid={handleStep}
							index={2}
							blockStep={stopMove}
							countRound={round}
							stepMe={stepMe}
							stepBot={stepBot}
						/>
						<Cell
							key={3}
							grid={grid}
							changeGrid={handleStep}
							index={3}
							blockStep={stopMove}
							countRound={round}
							stepMe={stepMe}
							stepBot={stepBot}
						/>
						<Cell
							key={4}
							grid={grid}
							changeGrid={handleStep}
							index={4}
							blockStep={stopMove}
							countRound={round}
							stepMe={stepMe}
							stepBot={stepBot}
						/>
						<Cell
							key={5}
							grid={grid}
							changeGrid={handleStep}
							index={5}
							blockStep={stopMove}
							countRound={round}
							stepMe={stepMe}
							stepBot={stepBot}
						/>
						<Cell
							key={6}
							grid={grid}
							changeGrid={handleStep}
							index={6}
							blockStep={stopMove}
							countRound={round}
							stepMe={stepMe}
							stepBot={stepBot}
						/>
						<Cell
							key={7}
							grid={grid}
							changeGrid={handleStep}
							index={7}
							blockStep={stopMove}
							countRound={round}
							stepMe={stepMe}
							stepBot={stepBot}
						/>
						<Cell
							key={8}
							grid={grid}
							changeGrid={handleStep}
							index={8}
							blockStep={stopMove}
							countRound={round}
							stepMe={stepMe}
							stepBot={stepBot}
						/>
					</div>
					{(emptyCell == 0 || winner != "") && (
						<button
							className="tictac__button-restart"
							onClick={(e) => handleRestart(e)}
						>
							Restart
						</button>
					)}
				</div>
			</div>
		</section>
	);
}

export default Tictactoe;
