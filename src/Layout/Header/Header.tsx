import React, { useRef } from "react";

function Header() {
    const refHeader = useRef<HTMLHeadingElement>(null)

    const handleClickMenu = (e) => {
        e.stopPropagation()
        if (refHeader.current) {
            refHeader.current.classList.toggle("header_visible")
        }
    }

    return <header className="header" ref={refHeader}>
        <div className="header__content">
            <p className="header__logo">
                Lab
            </p>
            <button className="header__menu-button" aria-label="Открыть меню" onClick={handleClickMenu}></button>
        </div>
    </header>
}

export default Header