import React, { useEffect, useRef, useState } from "react";

const listDefaultColor = [
    "#000000",
    "#FFFFFF",
    "#FF0000",
    "#FFFF00",
    "#00FF00",
    "#FF00FF",
    "#00FFFF",
    "#0000FF"
]

const widthCanvas = 600
const heightCanvas = 600

function createGrid(ctx) {
    for (let i = 0; i <= widthCanvas; i += 20) {
        ctx.beginPath()
        ctx.moveTo(0, i)
        ctx.lineTo(widthCanvas, i)
        ctx.closePath();
        ctx.strokeStyle = "#DCDCDC"
        ctx.lineWidth = 2
        ctx.stroke();
    }
    for (let i = 0; i <= heightCanvas; i += 20) {
        ctx.beginPath()
        ctx.moveTo(i, 0)
        ctx.lineTo(i, heightCanvas)
        ctx.closePath();
        ctx.strokeStyle = "#DCDCDC"
        ctx.lineWidth = 2
        ctx.stroke();
    }
}

function formatNumber(number) {
    if (number < 10) {
        return "0" + number
    }
    return "" + number
}


function Pixel() {
    const refCanvas = useRef<HTMLCanvasElement>(null)
    const refDecectedX = useRef<number>(0)
    const refDecectedY = useRef<number>(0)
    const refColor = useRef<string>("#000000")
    const [selectColor, setSelectColor] = useState<string>("#000000")
    const refDriwing = useRef<boolean>(false)
    const [coord, setCoord] = useState([0, 0])

    useEffect(() => {
        if (refCanvas.current != null) {
            let ctx = refCanvas.current.getContext("2d")

            if (ctx) {
                // createGrid(ctx)
                ctx.fillStyle = "white";
                ctx.fillRect(0, 0, widthCanvas, heightCanvas);
            }

            function getCursorPosition(canvas, event) {
                const rect = canvas.getBoundingClientRect()
                const x = Math.floor(Math.abs(event.clientX - rect.left))
                const y = Math.floor(Math.abs(event.clientY - rect.top))
                let coordX = Math.floor(x / 20) * 20
                let coordY = Math.floor(y / 20) * 20
                return [coordX, coordY]
            }

            function drawPixel(coordMouse) {
                let [coordX, coordY] = coordMouse

                if (ctx != null) {
                    ctx.beginPath()
                    ctx.moveTo(coordX, coordY)
                    ctx.lineTo(coordX + 20, coordY)
                    ctx.lineTo(coordX + 20, coordY + 20)
                    ctx.lineTo(coordX, coordY + 20)
                    ctx.fillStyle = refColor.current
                    ctx.lineWidth = 2
                    ctx.fill()
                    ctx.closePath();
                }

                detectedPixel(coordMouse)
            }

            function detectedPixel(coordMouse) {
                let [coordX, coordY] = coordMouse

                if (ctx != null) {
                    var imgData = ctx.getImageData(refDecectedX.current + 10, refDecectedY.current + 10, 1, 1);
                    console.log(refDecectedX.current, refDecectedY.current, `rgb(${imgData.data[0].toString()}, ${imgData.data[1].toString()}, ${imgData.data[2].toString()})`);

                    ctx.beginPath()
                    ctx.moveTo(refDecectedX.current + 1, refDecectedY.current + 1)
                    ctx.lineTo(refDecectedX.current + 19, refDecectedY.current + 1)
                    ctx.lineTo(refDecectedX.current + 19, refDecectedY.current + 19)
                    ctx.lineTo(refDecectedX.current + 1, refDecectedY.current + 19)
                    ctx.closePath();
                    ctx.strokeStyle = `rgb(${imgData.data[0].toString()}, ${imgData.data[1].toString()}, ${imgData.data[2].toString()})`
                    ctx.lineWidth = 2
                    ctx.stroke();

                    ctx.beginPath()
                    ctx.moveTo(coordX + 1, coordY + 1)
                    ctx.lineTo(coordX + 19, coordY + 1)
                    ctx.lineTo(coordX + 19, coordY + 19)
                    ctx.lineTo(coordX + 1, coordY + 19)
                    ctx.closePath();
                    ctx.strokeStyle = "#12121255"
                    ctx.lineWidth = 2
                    ctx.stroke();

                    refDecectedX.current = coordX
                    refDecectedY.current = coordY
                }

                setCoord([coordX / 20 + 1, coordY / 20 + 1])
            }

            refCanvas.current.addEventListener('mousedown', function (e) {
                if (e.buttons == 1) {
                    drawPixel(getCursorPosition(refCanvas.current, e))
                    refDriwing.current = true
                }
            })

            refCanvas.current.addEventListener('mouseup', function (e) {
                refDriwing.current = false
            })

            refCanvas.current.addEventListener("mouseleave", function (e) {
                refDriwing.current = false
            })

            refCanvas.current.addEventListener("mousemove", function (e) {
                detectedPixel(getCursorPosition(refCanvas.current, e))
                if (refDriwing.current) {
                    drawPixel(getCursorPosition(refCanvas.current, e))
                }
            })
        }
    }, [])


    const handleSelectColor = (e, color) => {
        e.stopPropagation()
        refColor.current = color
        setSelectColor(color)
    }

    const handleClearCanvas = () => {
        if (refCanvas.current != null) {
            let ctx = refCanvas.current.getContext("2d")
            if (ctx) {
                ctx.fillStyle = "white";
                ctx.fillRect(0, 0, widthCanvas, heightCanvas);
            }
        }
    }

    return <section className="h-screen relative">
        <div className="h-full flex justify-center items-center">
            <div className="">
                <div className="flex justify-between mb-[10px]">
                    <div className="style-button w-[220px] h-[40px] text-[20px]/[35px]" onClick={() => handleClearCanvas()}>Очистить</div>
                    <div className="h-[40px] w-[140px] text-[20px]/[35px] text-white bg-black-1 px-[20px] rounded-[10px] flex justify-between">
                        <span className="w-[45px]">{"X: " + formatNumber(coord[0])}</span>
                        <span className="w-[45px]">{"Y: " + formatNumber(coord[1])}</span>
                    </div>
                </div>
                <div className="border-black-1 border-[20px] rounded-[20px]">
                    <canvas ref={refCanvas} width={widthCanvas} height={heightCanvas} className="cursor-pointer bg-white" />
                </div>
                <div className="flex gap-[10px] bg-black-1 py-[20px] px-[30px] rounded-[20px] absolute bottom-[20px] left-[50%] translate-x-[-50%]">
                    {listDefaultColor.map((color) => {
                        let strVar = { "--bg-c1": color } as React.CSSProperties;
                        return <div className={"h-[45px] w-[45px] bg-[var(--bg-c1)] rounded-full border-[#808080] border-[2px] cursor-pointer " + (selectColor == color ? "opacity-100" : "opacity-50")} style={strVar}
                            onClick={(e) => { handleSelectColor(e, color) }}></div>
                    })}
                </div>
            </div>
        </div>
    </section>
}

export default Pixel