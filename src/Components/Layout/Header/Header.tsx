/** @format */

import React, { useRef, useState } from "react";

const links = [
	{
		text: "Крестики-нолики",
		id: "tic-tac-toe",
	},
	{
		text: "2048",
		id: "two",
	},
];

function Header({ handleSelectSection }) {
	const refHeader = useRef<HTMLHeadingElement>(null);

	const handleClickMenu = (e) => {
		e.stopPropagation();
		if (refHeader.current) {
			refHeader.current.classList.toggle("header_visible");
		}
	};

	return (
		<header
			className="header"
			ref={refHeader}>
			<div className="header__content">
				<p
					className="header__logo"
					onClick={(e) => {
						handleSelectSection(e, "menu");
						handleClickMenu(e);
					}}>
					Lab
				</p>
				<hr className="header__line" />
				<nav className="header__list">
					{links?.map((link, key) => (
						<button
							key={key}
							className="header__section-button"
							onClick={(e) => {
								handleSelectSection(e, link.id);
								handleClickMenu(e);
							}}>
							{link.text}
						</button>
					))}
				</nav>
				<button
					className="header__menu-button"
					aria-label="Открыть меню"
					onClick={handleClickMenu}></button>
			</div>
		</header>
	);
}

export default Header;
