"use client";
import { useEffect, useRef, useState } from "react";
import { IconsButtons } from "./IconsButtons";
import {
  CircleStackIcon,
  PencilSquareIcon,
  RectangleGroupIcon,
} from "@heroicons/react/24/outline";
import { LinkSlashIcon } from "@heroicons/react/16/solid";
import { Game } from "../draw/Game";

export type Tool = "circle" | "rect" | "pencil";

export function Canvas({
  roomId,
  socket,
}: {
  roomId: string;
  socket: WebSocket;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [SelectedTool, setSelectedTool] = useState<Tool>("circle");
  const [game, setGame] = useState<Game>();

  useEffect(() => {
    game?.setTool(SelectedTool)
  }, [SelectedTool]);
  useEffect(() => {
    if (canvasRef.current) {
      const g = new Game(canvasRef.current, roomId, socket);
      setGame(g);

      return () => {  
        g.destroy()
      }
    }

  }, [canvasRef]);

  return (
    <>
      <div className="overflow-hidden h-screen">
        <canvas
          ref={canvasRef}
          width={window.innerWidth}
          height={window.innerHeight}
        ></canvas>
        <TopBar setSelectedTool={setSelectedTool} SelectedTool={SelectedTool} />
      </div>
    </>
  );
}
function TopBar({
  SelectedTool,
  setSelectedTool,
}: {
  SelectedTool: Tool;
  setSelectedTool: (s: Tool) => void;
}) {
  return (
    <div className="flex items-center gap-4 fixed top-5 left-1/2 transform -translate-x-1/2 bg-gray-300 p-2 rounded-lg">
      <IconsButtons
        activated={SelectedTool === "pencil"}
        icons={<PencilSquareIcon className="w-6 h-6" />}
        onClick={() => {
          setSelectedTool("pencil");
        }}
      />
      <IconsButtons
        activated={SelectedTool === "rect"}
        icons={<RectangleGroupIcon className="w-6 h-6" />}
        onClick={() => {
          setSelectedTool("rect");
        }}
      />
      <IconsButtons
        activated={SelectedTool === "circle"}
        icons={<CircleStackIcon className="w-6 h-6" />}
        onClick={() => {
          setSelectedTool("circle");
        }}
      />
      <LinkSlashIcon />
    </div>
  );
}
