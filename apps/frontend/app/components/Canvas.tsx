"use client";
import { useEffect, useRef } from "react";
import InitDraw from "../draw";

export function Canvas({
  roomId,
  socket,
}: {
  roomId: string;
  socket: WebSocket;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      InitDraw(canvasRef.current, roomId, socket);
    }
  }, [canvasRef]);

  return (
    <>
      <div className="md:w-screen md:h-screen w-full h-full">
        <canvas ref={canvasRef} width={2000} height={1000}></canvas>
      </div>
    </>
  );
}
