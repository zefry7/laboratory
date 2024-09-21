/** @format */

import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActionsTictac } from "../../../store/reducerTictac/reducerTictac.ts";
import { RootState } from "../../../store/store.ts";

function Cell({ grid, changeGrid, index, blockStep, countRound, stepMe, stepBot }) {
	const refCell = useRef<HTMLDivElement>(null);
	const refWrapperCell = useRef<HTMLDivElement>(null);
	const [active, setActive] = useState(4);
	const dispath = useDispatch();
	let classCell = "";

	if (grid[index] != 0) {
		if (grid[index] == 1) {
			classCell = "tictac__cell-o";
		} else {
			classCell = "tictac__cell-x";
		}
	}

	const handleClickO = (e) => {
		e.stopPropagation();
		if (!blockStep) {
			changeGrid(index);
		}
	};

	useEffect(() => {
		if (refCell.current) {
			refCell.current.style.opacity = (0.33 * active).toString();
		}
	}, [active]);

	useEffect(() => {
		if (grid[index] == 1) {
			setActive((n) => n - 1);
			if (refWrapperCell.current) {
				refWrapperCell.current.classList.add("tictac__cell-wrapper_active");
			}
			if (active <= 1) {
				setActive(4);
				dispath({
					type: ActionsTictac.EDIT_GRID,
					index: index,
					move: 0,
				});
			}
		}
	}, [stepMe]);

	useEffect(() => {
		if (grid[index] == -1) {
			setActive((n) => n - 1);
			if (refWrapperCell.current) {
				refWrapperCell.current.classList.add("tictac__cell-wrapper_active");
			}
			if (active <= 1) {
				setActive(4);
				dispath({
					type: ActionsTictac.EDIT_GRID,
					index: index,
					move: 0,
				});
			}
		}
	}, [stepBot]);

	useEffect(() => {
		if (countRound == 1) {
			setActive(4);
			if (refWrapperCell.current) {
				refWrapperCell.current.classList.remove("tictac__cell-wrapper_active");
			}
		}
	}, [countRound]);

	return (
		<div
			className="w-[120px] h-[120px] bg-white p-[10px] cursor-pointer"
			onClick={(e) => handleClickO(e)}
		>
			<div
				className="w-full h-full opacity-0 transition-opacity"
				ref={refWrapperCell}
			>
				<div
					className={classCell}
					ref={refCell}
				>
					{grid[index] == -1 && (
						<>
							<span></span>
							<span></span>
						</>
					)}
				</div>
			</div>
		</div>
	);
}

export default memo(Cell);
