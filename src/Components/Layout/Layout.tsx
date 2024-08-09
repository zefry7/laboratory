import React, { useCallback, useState } from "react";
import Header from "./Header/Header.tsx";
import Tictactoe from "../Tictac/Tictactoe.tsx";
import Intro from "../Intro/Intro.tsx";

function Layout() {
    const [section, setSection] = useState("intro")

    const handleSelectSection = useCallback((e: MouseEvent, nameSection) => {
        e.stopPropagation()
        setSection(nameSection)
    }, [])

    const viewSection = () => {
        switch(section) {
            case "intro":
                return <Intro />
            case "tic-tac-toe":
                return <Tictactoe />
            default:
                return <Intro />
        }
    }

    return <>
        <Header handleSelectSection={handleSelectSection}/>
        {viewSection()}
    </>
}

export default Layout