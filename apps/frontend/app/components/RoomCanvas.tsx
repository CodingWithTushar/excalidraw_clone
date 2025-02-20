"use client";
import { useEffect, useState } from "react";
import { WS_BACKEND } from "@/config";
import { Canvas } from "./Canvas";

export function RoomCanvas({ roomId }: { roomId: string }) {
  const [socket, setsocket] = useState<WebSocket | null>(null)

  useEffect(() => { 
    const ws = new WebSocket(`${WS_BACKEND}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxNTYyYWIxNi1jYTE0LTRmY2YtOThkOC0zZjZkYTA2MjIwNWMiLCJpYXQiOjE3NDAwNDkzNzJ9.rrMMpHKX-tV3ocExshtdx2Dmmzgxr9dIRNn7BcmjYkg`)

    ws.onopen = () => {
        setsocket(ws)
        ws.send(JSON.stringify({
          type: "join_room",
          roomId,
        }))
    }
  }, [])

  if (!socket) {
      return <div >
          Connecting to a Server....
      </div>

  }

  return (
    <>
    <Canvas roomId={roomId} socket={socket}/>
    </>
  );
}
