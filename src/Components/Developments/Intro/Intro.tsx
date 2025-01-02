/** @format */

import React from "react";

function Intro({ refHeader }) {
	const handleOpenMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		if (refHeader.current) {
			refHeader.current.classList.toggle("header-visible");
		}
	};

	return (
		<section className={"h-screen flex items-center justify-center"}>
			<div className={"flex w-max flex-col items-center"}>
				<h1 className={"mb-[20px] font-defaultFont text-[36px] uppercase"}>Лаборатория frontend-разработчика</h1>
				<h2 className={"mb-[30px] font-defaultFont text-[28px]"}>
					Автор: <a href="https://github.com/zefry7" className={"text-blue-700 hover:text-blue-700 hover:underline"}>zefry7</a>
				</h2>
				<button
					className={"style-button w-[300px]"}
					onClick={(e) => handleOpenMenu(e)}
				>
					Открыть меню
				</button>
			</div>
		</section>
	);
}

export default Intro;
