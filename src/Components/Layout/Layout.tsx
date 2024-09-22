/** @format */

import React, { useCallback, useRef, useState } from "react";
import Header from "./Header/Header.tsx";
import Tictactoe from "../Developments/Tictac/Tictactoe.tsx";
import Intro from "../Developments/Intro/Intro.tsx";
import Two from "../Developments/Two/Two.tsx";
import Pixel from "../Developments/Pixel/Pixel.tsx";

function Layout() {
	const [section, setSection] = useState("");
	const refHeader = useRef<HTMLHeadingElement>(null);
	
	const handleSelectSection = useCallback((e: MouseEvent, nameSection) => {
		e.stopPropagation();
		setSection(nameSection);
	}, []);

	const viewSection = () => {
		switch (section) {
			case "tic-tac-toe":
				return <Tictactoe />;
			case "two":
				return <Two />;
			case "pixel":
				return <Pixel />
			default:
				return <Intro refHeader={refHeader}/>;
		}
	};

	return (
		<>
			<Header handleSelectSection={handleSelectSection} refHeader={refHeader} />
			<main>{viewSection()}</main>
		</>
	);
}

export default Layout;
