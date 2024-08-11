/** @format */

import React, { useCallback, useState } from "react";
import Header from "./Header/Header.tsx";
import Tictactoe from "../Tictac/Tictactoe.tsx";
import Intro from "../Intro/Intro.tsx";
import Two from "../Two/Two.tsx";

function Layout() {
	const [section, setSection] = useState("intro");

	const handleSelectSection = useCallback((e: MouseEvent, nameSection) => {
		e.stopPropagation();
		setSection(nameSection);
	}, []);

	const viewSection = () => {
		switch (section) {
			case "intro":
				return <Intro />;
			case "tic-tac-toe":
				return <Tictactoe />;
			case "two": 
				return <Two />;
			default:
				return <Intro />;
		}
	};

	return (
		<>
			<Header handleSelectSection={handleSelectSection} />
			<main>{viewSection()}</main>
		</>
	);
}

export default Layout;
