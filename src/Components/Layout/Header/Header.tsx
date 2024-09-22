/** @format */

import React from "react";

const links = [
	{
		text: "Крестики-нолики",
		id: "tic-tac-toe",
	},
	{
		text: "2048",
		id: "two",
	},
	{
		text: "Pixel",
		id: "pixel",
	},
];

function Header({ handleSelectSection, refHeader }) {

	const handleClickMenu = (e) => {
		e.stopPropagation();
		if (refHeader.current) {
			refHeader.current.classList.toggle("header_visible");
		}
	};

	return (
		<header
			className={"z-50 absolute top-0 left-[-300px] transition-left duration-150 h-full"}
			ref={refHeader}
		>
			<div className="p-[40px] relative w-[300px] h-full border-r-[2px] border-r-black-1">
				<p
					className={"mb-[10px] text-[28px] font-[200] font-defaultFont text-black-1 transition-all hover:text-gray-1 active:translate-y-[3px] cursor-pointer"}
					onClick={(e) => {
						handleSelectSection(e, "menu");
						handleClickMenu(e);
					}}
				>
					Lab
				</p>
				<hr className={"mb-[20px] h-[2px] bg-black-1"} />
				<nav className="flex flex-col gap-[10px]">
					{links?.map((link, key) => (
						<button
							key={key}
							className="font-defaultFont bg-transparent text-[20px] text-left w-max transition-all hover:text-gray-1 active:translate-y-[3px]"
							onClick={(e) => {
								handleSelectSection(e, link.id);
								handleClickMenu(e);
							}}
						>
							{link.text}
						</button>
					))}
				</nav>
				<button
					className="absolute h-[50px] w-[50px] right-[-50px] top-[5px] bg-black-1 rounded-tr-[15px] rounded-br-[15px]"
					aria-label="Открыть меню"
					onClick={handleClickMenu}
				></button>
			</div>
		</header>
	);
}

export default Header;
