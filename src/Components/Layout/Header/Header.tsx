/** @format */

import React, { useState } from "react";

const links = [
	{
		text: "Крестики-нолики",
		id: "tic-tac-toe",
	},
	{
		text: "Игра 2048",
		id: "two",
	},
	{
		text: "PixelArt",
		id: "pixel",
	},
	{
		text: "Иконка по нику",
		id: "icon",
	},
];

function Header({ handleSelectSection, refHeader }) {
	const [active, setActive] = useState(false)

	const handleClickMenu = (e) => {
		e.stopPropagation();
		if (refHeader.current) {
			refHeader.current.classList.toggle("header-visible");
			setActive(true)
		}
	};

	return (
		<header
			className={"z-50 absolute top-0 left-[-300px] transition-left duration-150 h-full bg-white group"}
			ref={refHeader}
		>
			<div className="p-[40px] relative w-[300px] h-full border-r-[4px] border-r-black-1 flex flex-col">
				<div className="flex mb-[6px] group/title">
					<div className="transition-all translate-y-[5px] pr-[5px] group-hover/title:rotate-[30deg]">
						<img src="/flask.svg" alt="" />
					</div>
					<p
						className={"text-[28px] font-[200] font-defaultFont text-black-1 transition-all cursor-pointer group-hover/title:scale-95"}
						onClick={(e) => {
							handleSelectSection(e, "menu");
							handleClickMenu(e);
						}}
					>
						Лаборатория
					</p>
				</div>
				<hr className={"mb-[15px] h-[4px] bg-black-1 rounded-[2px]"} />
				<nav className="flex flex-col gap-[10px]">
					{links?.map((link, key) => (
						<button
							key={key}
							className={"font-defaultFont bg-transparent text-[24px] w-full text-left pl-[5px] transition-all active:translate-y-[3px] hover:bg-gray-200 hover:scale-95"}
							onClick={(e) => {
								handleSelectSection(e, link.id);
								handleClickMenu(e);
							}}
						>
							{link.text}
						</button>
					))}
				</nav>
				<p className={"mt-auto font-defaultFont text-[24px]"}>
					Автор: <a href="https://github.com/zefry7" className={"text-blue-700 hover:text-blue-700 hover:underline"}>zefry7</a>
				</p>
				<button
					className={"absolute h-[50px] w-[50px] right-[-50px] top-[5px] rounded-tr-[15px] border-black-1 border-[4px] rounded-br-[15px]"}
					aria-label="Открыть меню"
					onClick={handleClickMenu}
				>
					<div className={"bg-arrow bg-cover h-full w-full transition-transform -rotate-180 duration-300 group-[.header-visible]:rotate-0 hover:scale-110"}></div>
				</button>
			</div>
		</header>
	);
}

export default Header;
