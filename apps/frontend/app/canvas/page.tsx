"use client"
import { useEffect, useRef } from "react"

export default function Canvas() {

    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {

        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");
            
            if (!ctx) {
                return 
            }
            let clicked = false;

            canvas.addEventListener("mousedown",  (e) => {
                clicked= true
                console.log(e.clientX)
                console.log(e.clientY)
            })
            canvas.addEventListener("mouseup",  (e) => {
                clicked = false
                console.log(e.clientX)
                console.log(e.clientY)
            })
            canvas.addEventListener("mousemove", (e) => {
                if (clicked) {
                    console.log(e.clientX)
                    console.log(e.clientY)
                }
            })
        }
    
    }, [canvasRef])
    

    return <>
    <div className="bg-white md:w-screen md:h-screen w-full h-full">
     <canvas ref={canvasRef} width={500} height={500}></canvas>
    </div>
    </>
}