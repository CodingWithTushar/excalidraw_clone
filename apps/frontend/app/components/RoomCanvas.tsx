"use client";
import { useEffect, useState } from "react";
import { WS_BACKEND } from "@/config";
import { Canvas } from "./Canvas";

export function RoomCanvas({ roomId }: { roomId: string }) {
  const [socket, setsocket] = useState<WebSocket | null>(null)

  useEffect(() => {
    const ws = new WebSocket(`${WS_BACKEND}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5ZDc4MDU4Zi0wMTRiLTQxYjAtYjU2MS0wNTY1ZjY0MWUzMDUiLCJpYXQiOjE3Mzk1MjkzNDN9.N_5KttKBR5gr3uP38IVTT3ilmSjLMYfQVFA4WnPZsvo`)

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
