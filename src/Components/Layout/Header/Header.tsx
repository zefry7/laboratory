import React, { useRef, useState } from "react";

function Header({ handleSelectSection }) {

    const refHeader = useRef<HTMLHeadingElement>(null)

    const handleClickMenu = (e) => {
        e.stopPropagation()
        if (refHeader.current) {
            refHeader.current.classList.toggle("header_visible")
        }
    }

    return <header className="header" ref={refHeader}>
        <div className="header__content">
            <p className="header__logo" onClick={(e) => {handleSelectSection(e, "menu"); handleClickMenu(e)}}>
                Lab
            </p>
            <hr className="header__line" />
            <nav>
                <button className="header__section-button" onClick={(e) => {handleSelectSection(e, "tic-tac-toe"); handleClickMenu(e)}}>Крестики-нолики</button>
            </nav>
            <button className="header__menu-button" aria-label="Открыть меню" onClick={handleClickMenu}></button>
        </div>
    </header>
}

export default Header