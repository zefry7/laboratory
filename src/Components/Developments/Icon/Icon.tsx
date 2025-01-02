import React, { useEffect, useRef, useState } from "react";

const widthCanvas = 400;
const heightCanvas = 400;

const colors = [
    {
        color: "#d9ed92",
        style: "bg-icon-0"
    },
    {
        color: "#b5e48c",
        style: "bg-icon-1"
    },
    {
        color: "#99d98c",
        style: "bg-icon-2"
    },
    {
        color: "#76c893",
        style: "bg-icon-3"
    },
    {
        color: "#52b69a",
        style: "bg-icon-4"
    },
    {
        color: "#34a0a4",
        style: "bg-icon-5"
    },
    {
        color: "#168aad",
        style: "bg-icon-6"
    },
    {
        color: "#1a759f",
        style: "bg-icon-7"
    },
    {
        color: "#1e6091",
        style: "bg-icon-8"
    },
    {
        color: "#184e77",
        style: "bg-icon-9"
    }
];

function Icon() {
    const refCanvas = useRef<HTMLCanvasElement>(null)
    const [nickname, setNickname] = useState<string>("")
    const [selectColor, setSelectColor] = useState<Array<string>>(["#d9ed92", "#b5e48c"])

    useEffect(() => {
        if (refCanvas.current != null) {
            let ctx = refCanvas.current.getContext("2d")
            if (ctx) {
                ctx.clearRect(0, 0, widthCanvas, heightCanvas)
            }

            function generatePixelIcon(nickname) {
                const scalePixel = heightCanvas / (nickname.length * 2)

                for (let i = 0; i < nickname.length; i++) {
                    const charCode = nickname.charCodeAt(i);
                    const colorIndex = charCode % 2;
                    const color = selectColor[colorIndex];

                    if (ctx) {
                        ctx.fillStyle = color;

                        for (let j = 0; j < nickname.length; ++j) {
                            ctx.fillRect((scalePixel) * j, i * (scalePixel), scalePixel, scalePixel);
                            ctx.fillRect(i * (scalePixel), (scalePixel) * j, scalePixel, scalePixel);

                            ctx.fillRect(heightCanvas - (scalePixel) * (j + 1), heightCanvas - (i + 1) * (scalePixel), scalePixel, scalePixel);
                            ctx.fillRect(heightCanvas - (i + 1) * (scalePixel), heightCanvas - (scalePixel) * j, scalePixel, scalePixel);

                            ctx.fillRect(heightCanvas - (scalePixel) * (j), i * (scalePixel), scalePixel, scalePixel);
                            ctx.fillRect(heightCanvas - (i + 1) * (scalePixel), (scalePixel) * j, scalePixel, scalePixel);

                            ctx.fillRect((scalePixel) * j, heightCanvas - (i + 1) * (scalePixel), scalePixel, scalePixel);
                            ctx.fillRect(i * (scalePixel), heightCanvas - (scalePixel) * j, scalePixel, scalePixel);

                        }
                    }
                }
            }

            generatePixelIcon(nickname);
        }
    }, [nickname, selectColor])

    const handleChangeColor = (color) => {
        if (color != selectColor[0] && color != selectColor[1])
            setSelectColor((v) => [color, v[0]])
    }

    return <section className={"flex flex-col items-center h-screen justify-center"}>
        <div className={"relative"}>
            <canvas ref={refCanvas} width={widthCanvas} height={heightCanvas} className="border-black-1 border-[10px] rounded-[20px] mb-[15px]" />
            <input type="text" maxLength={20} value={nickname} placeholder="Максимальная длина 20 символов" onChange={(e) => setNickname(e.target.value)} className={"w-full px-[5px] border-black-1 border-[2px] text-[20px] rounded-[10px] font-defaultFont"} />

            <div className={"absolute w-[300px] top-0 right-[-340px] p-[15px] border-[2px] border-black-1 rounded-[12px]"}>
                <p className={"font-defaultFont mb-[5px]"}>Способ отрисовки</p>
                <select name="" id="" className={"border-[2px] mb-[10px]"}>
                    <option value="snowflake">Cнежинка</option>
                </select>
                <p className={"font-defaultFont mb-[5px]"}>Выбор цвета</p>
                <div className="flex flex-wrap gap-[15px]">
                    {colors.map((v, i) => {
                        return <div key={i} onClick={() => handleChangeColor(v.color)} className={v.style + " h-[40px] w-[40px] border-[2px] border-black-1 rounded-full text-black-1 font-bold text-[20px]/[32px] text-center cursor-pointer transition-transform active:scale-90"}>
                            {v.color == selectColor[0] && "1"}
                            {v.color == selectColor[1] && "2"}
                        </div>
                    })}
                </div>
            </div>
        </div>
    </section>
}

export default Icon