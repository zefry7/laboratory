import React from "react";

function Intro() {

    const handleOpenMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        let menuElement = document.getElementsByClassName("header")[0]
        menuElement.classList.add("header_visible")
    }

    return <section className="intro">
        <div className="intro__wrapper">
            <div className="intro__content">
                <h1 className="intro__title">Лаборатория frontend-разработчика</h1>
                <button className="intro__button" onClick={(e) => handleOpenMenu(e)}>Открыть меню</button>
            </div>
        </div>
    </section>
}

export default Intro