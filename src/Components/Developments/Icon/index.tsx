import React, { useEffect, useRef, useState } from "react";

const widthCanvas = 400;
const heightCanvas = 400;

const colors = [
    '#7FFFD4', '#FAEEDD'
];

function Icon() {
    const refCanvas = useRef<HTMLCanvasElement>(null)
    const [nickname, setNickname] = useState<string>("")

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
                    const colorIndex = charCode % colors.length;
                    const color = colors[colorIndex];

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
    }, [nickname])



    return <section className={"flex flex-col items-center h-screen justify-center"}>
        <div className={"relative"}>
            <canvas ref={refCanvas} width={widthCanvas} height={heightCanvas} className="border-black-1 border-[10px] rounded-[20px] mb-[15px]" />
            <input type="text" maxLength={20} value={nickname} placeholder="Максимальная длина 20 символов" onChange={(e) => setNickname(e.target.value)} className={"w-full px-[5px] border-black-1 border-[2px] text-[20px] rounded-[10px] font-defaultFont"} />

            <div className={"absolute w-[300px] h-[160px] top-0 right-[-340px] p-[15px] border-[2px] border-black-1 rounded-[12px]"}>
                <p className={"font-defaultFont mb-[5px]"}>Способ отрисовки</p>
                <select name="" id="" className={"border-[2px] mb-[10px]"}>
                    <option value="snowflake">Cнежинка</option>
                </select>
                <p className={"font-defaultFont mb-[5px]"}>Выбор цвета</p>
            </div>
        </div>
    </section>
}

export default Icon